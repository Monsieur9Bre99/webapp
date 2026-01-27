import { useMutation, useQuery } from '@tanstack/react-query';
import Separator from '../../../prefab/Separator.prefab';
import { color } from '../../../style/variable.style';
import { hexWithAlpha } from '../../../utils/colorFunc';
import {
	DetailCheckBox,
	DetailLine,
	DetailTitle,
} from './DisplayTaskDetail.comp';
import type {
	iFinishSubtaskData,
	iFinishSubtaskresult,
	iGetSubtaskData,
} from '../../../service/api_interface/subtaskApi.interface';
import { finishSubtask, getSubtask } from '../../../service/api/subtask.api';
import { toastStore } from '../../../store/toastStore';
import { useRef } from 'react';

interface Props {
	task_id: string | undefined;
	canBeModified: boolean;
}

const SubtaskList = ({ task_id, canBeModified }: Props) => {
	const firstRender = useRef(true);
	const onCheck = (task_id: string, subtask_id: string, is_done: boolean) => {
		if (!subtask_id || !task_id) return;

		finishSubtaskQuery.mutate({
			task_id: task_id,
			subtask_id: subtask_id,
			is_done: is_done,
		} as iFinishSubtaskData);
	};

	const finishSubtaskQuery = useMutation<
		iFinishSubtaskresult,
		Error,
		iFinishSubtaskData
	>({
		mutationKey: ['finishSubtask'],
		mutationFn: (data) => finishSubtask(data),
		onSuccess: () => {
			refetchSubtask();
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({ message: "Une erreur c'est produite ", type: 'error' });
		},
	});

	const { data: getSubtaskQuery, refetch: refetchSubtask } = useQuery({
		queryKey: ['Subtasks'],
		queryFn: () => getSubtask({ task_id } as iGetSubtaskData),
		enabled: false,
	});

	if (firstRender.current) {
		firstRender.current = false;
		refetchSubtask();
	}

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
				<DetailTitle>Objectif(s) de la tâche :</DetailTitle>
				{getSubtaskQuery
					&& getSubtaskQuery.subtasks.length > 0
					&& getSubtaskQuery.subtasks.map((sub) => (
						<DetailCheckBox
							className={canBeModified ? 'hiden' : ''}
							key={sub.id}>
							<label
								className={sub.is_done ? 'done' : ''}
								htmlFor={sub.id}>
								{sub.description}
							</label>
							<input
								disabled={canBeModified}
								onChange={(e) =>
									onCheck(task_id as string, sub.id, e.target.checked)
								}
								checked={sub.is_done}
								id={sub.id}
								type='checkbox'
							/>
						</DetailCheckBox>
					))}
			</DetailLine>
		</>
	);
};

export default SubtaskList;
