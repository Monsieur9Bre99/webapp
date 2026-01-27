import styled from 'styled-components';
import {
	breakpoints,
	color,
	typography,
} from '../../../../style/variable.style';
import { Plus, X } from 'lucide-react';
import { modalStore } from '../../../../store/modalStore';
import { adjustColorBrightness } from '../../../../utils/colorFunc';
import SearchBar from '../../../../prefab/SearchBar.prefab';
import { useState, useMemo } from 'react';
import { SubTitle } from '../../../../style/global.styledComp';
import Button from '../../../../prefab/Button.prefab';
import { Select } from '../../../../prefab/input/Select.prefab';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../../../service/api/user.api';
import type { iGetAllUsersResult } from '../../../../service/api_interface/userApi.interface';
import { addMemberToProject } from '../../../../service/api/member.api';
import type {
	iAddMemberToProjectData,
	iAddMemberToProjectResult,
} from '../../../../service/api_interface/memberApi.interface';
import { toastStore } from '../../../../store/toastStore';

interface Props {
	refetchMembers: () => void;
}

const AddMember = ({ refetchMembers }: Props) => {
	const { isOpen } = modalStore();
	const [searchUsername, setSearchUsername] = useState<string>('');
	const [invited, setInvited] = useState<
		{
			id: string;
			username: string;
			role: 'ADMIN' | 'COLLAB' | 'GUEST';
		}[]
	>([]);
	const { closeModal } = modalStore();

	const { data: availableUsers } = useQuery<iGetAllUsersResult[], Error>({
		queryKey: ['availableUsers'],
		queryFn: () => getAllUsers(),
		enabled: isOpen,
	});

	const filteredUsers = useMemo(() => {
		if (!availableUsers) return [];

		const invitedIds = invited.map((user) => user.id);
		const availableUsersWithoutInvited = availableUsers.filter(
			(user) => !invitedIds.includes(user.id),
		);

		if (!availableUsersWithoutInvited || !searchUsername)
			return availableUsersWithoutInvited;

		return availableUsersWithoutInvited.filter((user) =>
			user.username.toLowerCase().includes(searchUsername.toLowerCase()),
		);
	}, [availableUsers, searchUsername, invited]);

	const addInvitation = (user_id: string, username: string) => {
		if (!invited.find((user) => user.id === user_id)) {
			setInvited((prev) => [
				...prev,
				{ id: user_id, username, role: 'GUEST' },
			]);
		}
	};

	const removeInvitation = (user_id: string) => {
		setInvited((prev) => prev.filter((user) => user.id !== user_id));
	};

	const handleChange = (
		user_id: string,
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		setInvited((prev) =>
			prev.map((user) =>
				user.id === user_id
					? {
							...user,
							role: e.target.value as 'ADMIN' | 'COLLAB' | 'GUEST',
					  }
					: user,
			),
		);
	};

	const handleSubmit = () => {
		const users: {
			user_id: string;
			role: 'ADMIN' | 'COLLAB' | 'GUEST';
		}[] = invited.map((user) => ({
			user_id: user.id,
			role: user.role,
		}));

		addMemberQuery.mutate({ users: users });
	};

	const addMemberQuery = useMutation<
		iAddMemberToProjectResult,
		Error,
		iAddMemberToProjectData
	>({
		mutationKey: ['addMember'],
		mutationFn: (data) => addMemberToProject(data),
		onSuccess: () => {
			closeModal();
			setInvited([]);
			refetchMembers();
		},
		onError: () => {
			toastStore.getState().setToast({
				message: "Une erreur est survenue lors de l'ajout du membre",
				type: 'error',
			});
		},
	});

	return (
		<Container>
			<Header>
				<CloseBtn
					type='button'
					onClick={() => closeModal()}>
					<X />
				</CloseBtn>
				<SubTitle>Ajouter des membres</SubTitle>
				<SearchBar
					setSearch={setSearchUsername}
					placeholder="Rechercher par nom d'utilisateur"
				/>
			</Header>
			<UserListContainer>
				<UserList>
					{filteredUsers.map((user) => (
						<NotInvitedListItem>
							<Text key={user.id}>{user.username}</Text>
							<IconBtn
								onClick={() => addInvitation(user.id, user.username)}
								$color={color.success}
								type='button'>
								<Plus />
							</IconBtn>
						</NotInvitedListItem>
					))}
				</UserList>
			</UserListContainer>
			<UserListContainer>
				<UserList>
					{invited.map((user) => (
						<InvitedListItem>
							<Text>{user.username}</Text>
							<Select
								id={`role-${user.id}`}
								label='Rôle'
								labelHidden
								onChange={(e) => handleChange(user.id, e)}
								options={[
									{ value: 'GUEST', label: 'GUEST' },
									{ value: 'COLLAB', label: 'COLLAB' },
									{ value: 'ADMIN', label: 'ADMIN' },
								]}
							/>
							<IconBtn
								onClick={() => removeInvitation(user.id)}
								$color={color.error}
								type='button'>
								<X />
							</IconBtn>
						</InvitedListItem>
					))}
				</UserList>
			</UserListContainer>
			<BtnContainer>
				<Button
					onClick={() => closeModal()}
					classname='outline'
					type='button'
					text='Annuler'
					colors={{
						$textColor: color.error,
						$borderColor: color.error,
						$backgroundColor: color.error,
					}}
				/>
				<Button
					onClick={() => handleSubmit()}
					type='button'
					text='Inviter'
					disabled={invited.length === 0}
				/>
			</BtnContainer>
		</Container>
	);
};

export default AddMember;

const Container = styled.div`
	position: relative;
	background-color: ${color.light};
	border-left: 0.2rem solid ${color.primary};
	height: 100%;
	width: 25%;
	display: flex;
	flex-direction: column;

	@media (max-width: ${breakpoints.lg}) {
		width: 50%;
	}

	@media (max-width: ${breakpoints.md}) {
		width: 100%;
	}
`;

const CloseBtn = styled.button`
	cursor: pointer;
	position: absolute;
	top: 1rem;
	right: 1rem;
	color: ${color.primary};

	&:hover {
		color: ${adjustColorBrightness(color.primary, -0.2)};
	}

	svg {
		width: 2.5rem;
		height: 2.5rem;

		@media (max-width: ${breakpoints.lg}) {
			width: 3rem;
			height: 3rem;
		}

		@media (max-width: ${breakpoints.md}) {
			width: 2rem;
			height: 2rem;
		}
	}
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	border-bottom: 0.3rem solid ${color.primary};
	height: 15%;
	@media (max-width: ${breakpoints.lg}) {
		height: 10%;
	}
	@media (max-width: ${breakpoints.md}) {
		height: 15%;
	}
`;

const UserListContainer = styled.div`
	padding: 0.5rem 0.5rem;
	border-bottom: 0.3rem solid ${color.primary};
	height: 39%;

	@media (max-width: ${breakpoints.lg}) {
		height: 42%;
	}
	@media (max-width: ${breakpoints.md}) {
		height: 38%;
	}
`;

const BtnContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	height: 7%;

	@media (max-width: ${breakpoints.lg}) {
		height: 6%;
	}

	@media (max-width: ${breakpoints.md}) {
		height: 9%;
	}
`;

const UserList = styled.ul`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: scroll;

	/* Standard moderne (Firefox + Chrome 121+) */
	scrollbar-width: thin;
	scrollbar-color: ${color.third} transparent;

	/* Webkit (Chrome/Safari/Edge) */
	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: ${color.third};
	}
`;

const ListItem = styled.li`
	list-style: none;
	align-items: center;

	&:hover {
		background-color: ${adjustColorBrightness(color.light, -0.1)};
	}
`;

const InvitedListItem = styled(ListItem)`
	padding: 0 1rem;
	display: grid;
	grid-template-columns: 30% 1fr auto;
	gap: 2rem;
`;

const NotInvitedListItem = styled(ListItem)`
	padding: 0.7rem 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const IconBtn = styled.button<{ $color: string }>`
	cursor: pointer;
	color: ${({ $color }) => $color};
`;

const Text = styled.p`
	color: ${color.dark};
	font-family: ${typography.fontSecondary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.normal};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.s};
	}
`;
