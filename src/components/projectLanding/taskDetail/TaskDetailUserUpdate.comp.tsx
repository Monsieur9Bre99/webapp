import { useEffect, useState } from 'react';
import Separator from '../../../prefab/Separator.prefab';
import type { iGetTaskByIdResult } from '../../../service/api_interface/taskApi.interface';
import { color } from '../../../style/variable.style';
import { hexWithAlpha } from '../../../utils/colorFunc';
import {
	DetailCheckBox,
	DetailLine,
	DetailTitle,
} from './DisplayTaskDetail.comp';
import { projectDataStore } from '../../../store/projectDataStore';
import { useMutation } from '@tanstack/react-query';
import type {
	iAssignTaskToUserData,
	iAssignTaskToUserResult,
	iRemoveUserTaskData,
	iRemoveUserTaskResult,
} from '../../../service/api_interface/user_taskApi.interface';
import {
	assignTaskToUser,
	removeUserTask,
} from '../../../service/api/user_task.api';
import { toastStore } from '../../../store/toastStore';

interface Props {
	task: iGetTaskByIdResult;
	setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskDetailUserUpdate = ({ task, setIsUpdated }: Props) => {
	const { projectMembers } = projectDataStore();
	const [allMembers, setAllMembers] = useState<
		{ value: string; label: string; checked: boolean }[]
	>([]);

	const checkAssignation = (id: string): boolean => {
		if (!task || !task.user_assigned) return false;
		const assigned = task.user_assigned.map((a) => a.user.id);

		if (assigned.includes(id)) return true;
		return false;
	};

	useEffect(() => {
		if (!task) return;

		if (projectMembers) {
			const members: { value: string; label: string; checked: boolean }[] =
				[];

			projectMembers.admin.forEach((member) => {
				members.push({
					value: member.id,
					label: `${member.firstname} ${member.lastname}, ${member.username}`,
					checked: checkAssignation(member.id),
				});
			});
			projectMembers.collab.forEach((member) => {
				members.push({
					value: member.id,
					label: `${member.firstname} ${member.lastname}, ${member.username}`,
					checked: checkAssignation(member.id),
				});
			});
			projectMembers.notConfirmed.forEach((member) => {
				if (member.role === 'GUEST') return;
				members.push({
					value: member.id,
					label: `${member.firstname} ${member.lastname}, ${member.username}`,
					checked: checkAssignation(member.id),
				});
			});
			setAllMembers(members);
		}
	}, [projectMembers]);

	const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
		e.stopPropagation();

		if (e.target.checked) {
			assignTaskToUserQuery.mutate({ task_id: task.id, user_id: id });
		} else {
			removeUserTaskQuery.mutate({ task_id: task.id, user_id: id });
		}

		setAllMembers(
			allMembers.map((member) => {
				if (member.value === id) {
					return { ...member, checked: e.target.checked };
				}
				return member;
			}),
		);
	};

	const assignTaskToUserQuery = useMutation<
		iAssignTaskToUserResult,
		Error,
		iAssignTaskToUserData
	>({
		mutationKey: ['assignTaskToUser'],
		mutationFn: (data) => assignTaskToUser(data),
		onSuccess: () => {
			setIsUpdated(true);
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message: "Une erreur est survenue lors de l'assignation",
					type: 'error',
				});
		},
	});

	const removeUserTaskQuery = useMutation<
		iRemoveUserTaskResult,
		Error,
		iRemoveUserTaskData
	>({
		mutationKey: ['removeUserTask'],
		mutationFn: (data) => removeUserTask(data),
		onSuccess: () => {
			setIsUpdated(true);
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message: 'Une erreur est survenue lors de la désassignation',
					type: 'error',
				});
		},
	});

	return (
		<>
			<Separator
				width='85%'
				color={[
					hexWithAlpha(color.primary, 0.0),
					hexWithAlpha(color.primary, 1.0),
					hexWithAlpha(color.primary, 0.0),
				]}
			/>

			<DetailLine>
				<DetailTitle>Membre(s) assigné(s) :</DetailTitle>
				{allMembers.map((member) => (
					<DetailCheckBox key={member.value}>
						<label htmlFor={member.value}>{member.label}</label>
						<input
							onChange={(e) => {
								handleCheck(e, member.value);
							}}
							defaultChecked={member.checked}
							type='checkbox'
							name='member'
							id={member.value}
						/>
					</DetailCheckBox>
				))}
			</DetailLine>
		</>
	);
};

export default TaskDetailUserUpdate;
