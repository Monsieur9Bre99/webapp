import { X } from 'lucide-react';
import { type iMemberInfoFormated } from '../../../../store/projectDataStore';
import {
	ParamCardText,
	ParamCardContent,
	ParamCardRow,
	ParamCardDeleteBtn,
	ParamCardSubContent,
} from '../../../../style/paramCard.styledComp';
import Button from '../../../../prefab/Button.prefab';
import { color } from '../../../../style/variable.style';
import { Select } from '../../../../prefab/input/Select.prefab';
import { useMutation } from '@tanstack/react-query';
import {
	deleteProjectMember,
	updateMemberRole,
} from '../../../../service/api/member.api';
import type {
	iDeleteProjectMemberData,
	iDeleteProjectMemberResult,
	iUpdateMemberRoleData,
	iUpdateMemberRoleResult,
} from '../../../../service/api_interface/memberApi.interface';
import { toastStore } from '../../../../store/toastStore';
import { popupStore } from '../../../../store/popupStore';
import { useState } from 'react';
import { modalStore } from '../../../../store/modalStore';

interface Props {
	allMembers: iMemberInfoFormated[];
	setIsOnUpdate: (isOnUpdate: boolean) => void;
	refetchMembers: () => void;
}
const MemberUpdate = ({ allMembers, setIsOnUpdate, refetchMembers }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [updateRole, setUpdateRole] = useState<
		{ user_id: string; role: 'OWNER' | 'ADMIN' | 'COLLAB' | 'GUEST' }[]
	>([]);

	const deleteMemberQuery = useMutation<
		iDeleteProjectMemberResult,
		Error,
		iDeleteProjectMemberData
	>({
		mutationKey: ['deleteMember'],
		mutationFn: (data) => deleteProjectMember(data),
		onSuccess: () => {
			toastStore.getState().setToast({
				message: 'Membre supprimé',
				type: 'success',
			});
			refetchMembers();
		},
		onError: () => {
			toastStore.getState().setToast({
				message: 'Une erreur est survenue lors de la suppression du membre',
				type: 'error',
			});
		},
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setIsOpen(true);
		e.preventDefault();

		if (updateRole.length === 0) {
			if (isOpen) {
				setIsOnUpdate(false);
				setIsOpen(false);
			}
			return;
		}

		updateRoleQuery.mutate({ users: updateRole });
		setIsOpen(false);
	};

	const updateRoleQuery = useMutation<
		iUpdateMemberRoleResult,
		Error,
		iUpdateMemberRoleData
	>({
		mutationKey: ['updateMemberRole'],
		mutationFn: (data) => updateMemberRole(data),
		onSuccess: () => {
			refetchMembers();
			toastStore
				.getState()
				.setToast({ message: 'Role mis à jour', type: 'success' });
			setIsOnUpdate(false);
		},
		onError: () => {
			toastStore.getState().setToast({
				message: 'Une erreur est survenue lors de la mise à jour du role',
				type: 'error',
			});
		},
	});

	const handleChange = (
		memberId: string,
		role: 'OWNER' | 'ADMIN' | 'COLLAB' | 'GUEST',
	) => {
		setUpdateRole((prev) => {
			const exists = prev.find((r) => r.user_id === memberId);
			if (exists) {
				return prev.map((r) =>
					r.user_id === memberId ? { ...r, role } : r,
				);
			}
			return [...prev, { user_id: memberId, role }];
		});
	};

	const getCurrentRole = (memberId: string, memeberRole: string) =>
		updateRole.find((r) => r.user_id === memberId)?.role || memeberRole;

	return (
		<form
			id='member-update-form'
			onSubmit={(e) => onSubmit(e)}>
			<ParamCardContent>
				{allMembers &&
					allMembers.map((member) => {
						const role = getCurrentRole(
							member.id as string,
							member.role as string,
						);
						return (
							<ParamCardRow
								key={member.id}
								$columns='20% 35% 15% 15% 12% 3%'>
								<ParamCardText>
									{member?.firstname} {member?.lastname}
								</ParamCardText>
								<ParamCardText>{member?.email}</ParamCardText>
								<ParamCardText>{member?.username}</ParamCardText>
								{member?.role !== 'OWNER' ? (
									<Select
										id={`role-${member.id}`}
										value={role}
										label='Role'
										labelHidden
										onChange={(
											e: React.ChangeEvent<HTMLSelectElement>,
										) =>
											handleChange(member.id, e.target.value as any)
										}
										options={[
											{ value: 'ADMIN', label: 'ADMIN' },
											{ value: 'COLLAB', label: 'COLLAB' },
											{ value: 'GUEST', label: 'GUEST' },
										]}
									/>
								) : (
									<ParamCardText>{member?.role}</ParamCardText>
								)}
								<ParamCardText>
									{member?.is_confirmed ? 'Confirmé' : 'En attente'}
								</ParamCardText>
								<ParamCardDeleteBtn
									type='button'
									disabled={member?.role === 'OWNER'}
									onClick={() => {
										popupStore.getState().setPopup({
											message:
												'Êtes-vous sûr de vouloir supprimer ce membre ?',
											action: () =>
												deleteMemberQuery.mutate({
													user_id: member.id,
												}),
										});
									}}>
									<X />
								</ParamCardDeleteBtn>
							</ParamCardRow>
						);
					})}
				<ParamCardSubContent $margin='1.5rem auto 0'>
					<Button
						classname='outline'
						colors={{ $textColor: color.primary }}
						onClick={() => modalStore.getState().openModal()}
						type='button'
						text='Ajouter'
					/>
				</ParamCardSubContent>
			</ParamCardContent>
		</form>
	);
};

export default MemberUpdate;
