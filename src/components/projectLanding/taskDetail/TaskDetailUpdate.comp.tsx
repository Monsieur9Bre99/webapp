import { useMutation } from '@tanstack/react-query';
import Separator from '../../../prefab/Separator.prefab';
import type {
	iGetTaskByIdResult,
	iUpdateTaskData,
	iUpdateTaskResult,
} from '../../../service/api_interface/taskApi.interface';
import { projectDataStore } from '../../../store/projectDataStore';
import { color } from '../../../style/variable.style';
import { clalculateTimeFromTimestamp } from '../../../utils/calculFunc';
import { hexWithAlpha } from '../../../utils/colorFunc';
import { traducteStatus } from '../../../utils/textFunc';
import {
	DetailContent,
	DetailInput,
	DetailLine,
	DetailSelect,
	DetailText,
	DetailTextArea,
	DetailTitle,
} from './DisplayTaskDetail.comp';
import { updateTask } from '../../../service/api/task.api';
import { toastStore } from '../../../store/toastStore';
import { useState } from 'react';
import TaskDetailImageUpdate from './TaskDetailImageUpdate.comp';
import TaskDetailSubtaskUpdate from './TaskDetailSubtaskUpdate.comp';
import TaskDetailUserUpdate from './TaskDetailUserUpdate.comp';

interface Props {
	refetchTask: () => void;
	setOnUpdate: React.Dispatch<React.SetStateAction<boolean>>;
	task: iGetTaskByIdResult;
}
const TaskDetailUpdate = ({ refetchTask, setOnUpdate, task }: Props) => {
	const [isUpdated, setIsUpdated] = useState(false);
	const { taskCategories } = projectDataStore();
	const [updates, setUpdates] = useState<Partial<iUpdateTaskData['updates']>>(
		{},
	);

	const handleChange = (value: any, id: keyof iUpdateTaskData['updates']) => {
		setUpdates((prev) => {
			if (value === '') {
				const next = { ...prev };
				delete next[id];
				return next;
			}
			return { ...prev, [id]: value };
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (Object.keys(updates).length === 0) {
			if (isUpdated) {
				refetchTask();
				setIsUpdated(false);
				setOnUpdate(false);
				return;
			}

			setOnUpdate(false);
			return;
		}

		const payload: iUpdateTaskData = { task_id: task.id, updates };

		updateTaskQuery.mutate(payload);
	};

	const updateTaskQuery = useMutation<
		iUpdateTaskResult,
		Error,
		iUpdateTaskData
	>({
		mutationKey: ['updateTask'],
		mutationFn: (data) => updateTask(data),
		onSuccess: () => {
			refetchTask();
			setOnUpdate(false);
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message:
						'Une erreur est survenue lors de la mise a jour de la tache',
					type: 'error',
				});
		},
	});

	return (
		<DetailContent>
			<form
				onSubmit={handleSubmit}
				id='update_task'
				action=''>
				<DetailLine>
					<DetailTitle htmlFor='title'>Titre :</DetailTitle>
					<DetailInput
						id='title'
						placeholder={task.title}
						onChange={(e) => handleChange(e.target.value, 'title')}
					/>
				</DetailLine>
				<DetailLine>
					<DetailTitle htmlFor='description'>Description :</DetailTitle>
					<DetailTextArea
						id='description'
						placeholder={task.description || 'Aucune description'}
						onChange={(e) => handleChange(e.target.value, 'description')}
					/>
				</DetailLine>

				<Separator
					width='85%'
					color={[
						hexWithAlpha(color.primary, 0.0),
						hexWithAlpha(color.primary, 1.0),
						hexWithAlpha(color.primary, 0.0),
					]}
				/>

				<DetailLine>
					<DetailTitle htmlFor='category'>Categorie :</DetailTitle>
					<DetailSelect
						id='category'
						defaultValue={task.task_category?.id}
						onChange={(e) =>
							handleChange(e.target.value, 'task_category_id')
						}>
						{taskCategories?.map((category) => (
							<option
								key={category.id}
								value={category.id}>
								{category.title}
							</option>
						))}
					</DetailSelect>
				</DetailLine>
				<DetailLine>
					<DetailTitle htmlFor='priority'>Priorité :</DetailTitle>
					<DetailSelect
						id='priority'
						defaultValue={task.priority}
						onChange={(e) => handleChange(e.target.value, 'priority')}>
						<option value='LOW'>Basse</option>
						<option value='MEDIUM'>Moyenne</option>
						<option value='HIGH'>Haute</option>
					</DetailSelect>
				</DetailLine>
				<DetailLine>
					<DetailTitle>Etat :</DetailTitle>
					<DetailText>{traducteStatus(task.statuts)}</DetailText>
				</DetailLine>
			</form>

			<Separator
				width='85%'
				color={[
					hexWithAlpha(color.primary, 0.0),
					hexWithAlpha(color.primary, 1.0),
					hexWithAlpha(color.primary, 0.0),
				]}
			/>

			<DetailLine>
				<DetailTitle>Delai :</DetailTitle>
				<DetailText>
					{clalculateTimeFromTimestamp(task.delay) || 'Aucun delai'}
				</DetailText>
			</DetailLine>

			<TaskDetailUserUpdate
				setIsUpdated={setIsUpdated}
				task={task}
			/>

			<TaskDetailSubtaskUpdate
				setIsUpdated={setIsUpdated}
				task={task}
			/>

			<TaskDetailImageUpdate
				setUpdates={setUpdates}
				task={task}
				refetchTask={refetchTask}
			/>
		</DetailContent>
	);
};

export default TaskDetailUpdate;
