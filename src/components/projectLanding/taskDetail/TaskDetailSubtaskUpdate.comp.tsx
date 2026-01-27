import { useEffect, useRef, useState } from 'react';
import Separator from '../../../prefab/Separator.prefab';
import type { iGetTaskByIdResult } from '../../../service/api_interface/taskApi.interface';
import { color } from '../../../style/variable.style';
import { hexWithAlpha } from '../../../utils/colorFunc';
import {
	DetailSecondaryBtn,
	DetailLine,
	DetailText,
	DetailTextContainer,
	DetailTitle,
	DetailInput,
} from './DisplayTaskDetail.comp';
import { Check, Pen, Plus, X } from 'lucide-react';
import { toastStore } from '../../../store/toastStore';
import { useMutation } from '@tanstack/react-query';
import type {
	iCreateSubtaskData,
	iCreateSubtaskResult,
	iDeleteSubtaskData,
	iDeleteSubtaskResult,
	iUpdateSubtaskData,
	iUpdateSubtaskResult,
} from '../../../service/api_interface/subtaskApi.interface';
import {
	createSubtask,
	deleteSubtask,
	updateSubtask,
} from '../../../service/api/subtask.api';
import { popupStore } from '../../../store/popupStore';

interface Props {
	setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
	task: iGetTaskByIdResult;
}

interface Subtask {
	id: string;
	description: string;
	isOnUpdate: boolean;
}

const TaskDetailSubtaskUpdate = ({ setIsUpdated, task }: Props) => {
	const firstRender = useRef(true);
	const [create, setCreate] = useState(false);
	const [subtasks, setSubtasks] = useState<Subtask[]>([]);
	const [newSubtask, setNewSubtask] = useState('');

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			if (!task.subtasks) return;

			setSubtasks(
				task.subtasks?.map((subtask) => ({
					id: subtask.id,
					description: subtask.description,
					isOnUpdate: false,
				})),
			);
			return;
		}
	}, []);

	const changeState = (id: string, isOnUpdate: boolean) => {
		setNewSubtask('');
		setCreate(false);

		setSubtasks((prev) =>
			prev.map(
				(s: { id: string; description: string; isOnUpdate: boolean }) => {
					if (s.id === id) {
						return { ...s, isOnUpdate: isOnUpdate };
					} else if (s.isOnUpdate === true) {
						return { ...s, isOnUpdate: false };
					}
					return s;
				},
			),
		);
	};

	const createState = (state: boolean) => {
		setNewSubtask('');

		if (!state) {
			setCreate(false);
			return;
		}

		setSubtasks((prev) => prev.map((s) => ({ ...s, isOnUpdate: false })));
		setCreate(true);
		return;
	};

	const confirmNewSubtask = (id?: string) => {
		if (newSubtask.trim() === '') return;

		if (subtasks.find((s) => s.description === newSubtask)) {
			toastStore
				.getState()
				.setToast({ message: 'Cet objectif existe déjà.', type: 'error' });

			if (id) {
				setSubtasks((prev) =>
					prev.map((s) => {
						if (s.id === id) {
							return { ...s, isOnUpdate: false };
						}
						return s;
					}),
				);
			} else {
				setCreate(false);
			}

			setNewSubtask('');
			return;
		}

		if (id) {
			updateSubtaskQuery.mutate({
				task_id: task.id,
				subtask_id: id,
				description: newSubtask,
			});
			setSubtasks((prev) =>
				prev.map((s) => {
					if (s.id === id) {
						return { ...s, description: newSubtask, isOnUpdate: false };
					}
					return s;
				}),
			);
		} else {
			createSubtaskQuery.mutate({
				task_id: task.id,
				description: newSubtask,
			});
			setCreate(false);
		}

		setNewSubtask('');
	};

	const deleteSubtaskQuery = useMutation<
		iDeleteSubtaskResult,
		Error,
		iDeleteSubtaskData
	>({
		mutationKey: ['deleteSubtask'],
		mutationFn: (data) => deleteSubtask(data),
		onSuccess: (res) => {
			setIsUpdated(true);
			setSubtasks((prev) => prev.filter((s) => s.id !== res.subtask));
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message: "Imossible de supprimer l'objectif",
					type: 'error',
				});
		},
	});

	const createSubtaskQuery = useMutation<
		iCreateSubtaskResult,
		Error,
		iCreateSubtaskData
	>({
		mutationKey: ['createSubtask'],
		mutationFn: (data) => createSubtask(data),
		onSuccess: (res) => {
			setIsUpdated(true);
			const newSub = {
				id: res.subtask.id,
				description: res.subtask.description,
				isOnUpdate: false,
			};
			setSubtasks((prev) => [...prev, newSub]);
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message:
						"Une erreur est survenue lor de la creation de l'objectif",
					type: 'error',
				});
		},
	});

	const updateSubtaskQuery = useMutation<
		iUpdateSubtaskResult,
		Error,
		iUpdateSubtaskData
	>({
		mutationKey: ['updateSubtask'],
		mutationFn: (data) => updateSubtask(data),
		onSuccess: () => {
			setIsUpdated(true);
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message:
						"Une erreur est survenue lor de la mise a jour de l'objectif",
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
				<DetailTitle>Objectif(s) de la tâche :</DetailTitle>
				{subtasks && subtasks.length > 0 ? (
					subtasks.map((subtask: Subtask) => (
						<DetailTextContainer key={subtask.id}>
							{!subtask.isOnUpdate ? (
								<>
									<DetailText>{subtask.description}</DetailText>
									<DetailSecondaryBtn
										type='button'
										onClick={() => changeState(subtask.id, true)}>
										<Pen
											style={{ width: '1.8rem', height: '1.8rem' }}
										/>
									</DetailSecondaryBtn>
								</>
							) : (
								<>
									<DetailInput
										onChange={(e) => setNewSubtask(e.target.value)}
										type='text'
										id={subtask.id}
										placeholder={subtask.description}
									/>
									<DetailSecondaryBtn
										onClick={() => confirmNewSubtask(subtask.id)}
										type='button'
										$color={color.success}>
										<Check />
									</DetailSecondaryBtn>
								</>
							)}
							<DetailSecondaryBtn
								type='button'
								onClick={
									subtask.isOnUpdate
										? () => changeState(subtask.id, false)
										: () => {
												popupStore
													.getState()
													.setPopup({
														message:
															'Êtes-vous sûr de vouloir supprimer cet objectif ?',
														action: () =>
															deleteSubtaskQuery.mutate({
																task_id: task.id,
																subtask_id: subtask.id,
															}),
													});
											}
								}
								$color={color.error}>
								<X />
							</DetailSecondaryBtn>
						</DetailTextContainer>
					))
				) : (
					<DetailTextContainer>Aucun objectif</DetailTextContainer>
				)}
				<DetailTextContainer>
					{create ? (
						<>
							<DetailInput
								onChange={(e) => setNewSubtask(e.target.value)}
								type='text'
								id='new_subtask'
								placeholder={'Ajouter un nouvel objectif'}
							/>
							<DetailSecondaryBtn
								onClick={() => confirmNewSubtask()}
								type='button'
								$color={color.success}>
								<Check />
							</DetailSecondaryBtn>
							<DetailSecondaryBtn
								type='button'
								onClick={() => createState(false)}
								$color={color.error}>
								<X />
							</DetailSecondaryBtn>
						</>
					) : (
						<>
							<DetailSecondaryBtn
								type='button'
								$color={color.primary}
								onClick={() => createState(true)}>
								<Plus />
							</DetailSecondaryBtn>
						</>
					)}
				</DetailTextContainer>
			</DetailLine>
		</>
	);
};

export default TaskDetailSubtaskUpdate;
