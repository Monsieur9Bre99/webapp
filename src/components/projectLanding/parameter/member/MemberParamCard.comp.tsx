import { useEffect, useState } from 'react';
import {
	projectDataStore,
	type iMemberInfoFormated,
} from '../../../../store/projectDataStore';
import ParamCard from '../ParamCard.comp';
import MemberInfo from './MemberParamCard.Info.comp';
import MemberUpdate from './MemberParamCard.update.comp';
import { getProjectMembers } from '../../../../service/api/member.api';
import type { iGetProjectMembersResult } from '../../../../service/api_interface/memberApi.interface';
import { useQuery } from '@tanstack/react-query';
import Modal from '../../../../prefab/Modal.prefab';
import AddMember from './AddMember.comp';

const MemberParamCard = () => {
	const { projectMembers } = projectDataStore();
	const [allMembers, setAllMembers] = useState<iMemberInfoFormated[]>([]);

	const { data: getMemberQuery, refetch: refetchMembers } = useQuery<
		iGetProjectMembersResult,
		Error
	>({
		queryKey: ['getProjectMembers'],
		queryFn: () => getProjectMembers(),
		enabled: false,
	});

	useEffect(() => {
		if (getMemberQuery) {
			const formatedMembers = getMemberQuery.members.map((member) => ({
				role: member.role,
				is_confirmed: member.is_confirmed,
				user: {
					id: member.id,
					firstname: member.firstname,
					lastname: member.lastname,
					email: member.email,
					username: member.username,
				},
			}));

			projectDataStore.getState().setProjectMembers(formatedMembers);
			setAllMembers([]);
		}
	}, [getMemberQuery]);

	useEffect(() => {
		if (!projectMembers) return;
		setAllMembers(
			allMembers
				.concat(projectMembers.admin)
				.concat(projectMembers.collab)
				.concat(projectMembers.guest)
				.concat(projectMembers.notConfirmed),
		);
	}, [projectMembers]);

	return (
		<ParamCard
			$form='member-update-form'
			title='Membres du projet'>
			{({ isOnUpdate, setIsOnUpdate }) => (
				<>
					{!isOnUpdate ? (
						<MemberInfo allMembers={allMembers} />
					) : (
						<MemberUpdate
							refetchMembers={refetchMembers}
							allMembers={allMembers}
							setIsOnUpdate={setIsOnUpdate}
						/>
					)}
					<Modal $alignement='end'>
						<AddMember refetchMembers={refetchMembers} />
					</Modal>
				</>
			)}
		</ParamCard>
	);
};

export default MemberParamCard;
