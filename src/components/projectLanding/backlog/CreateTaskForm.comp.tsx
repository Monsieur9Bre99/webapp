import styled from 'styled-components';
import { GridCell } from '../../../style/global.styledComp';
import { SelectCheckbox } from '../../../prefab/input/CheckboxSelect.prefab';
import { breakpoints, color } from '../../../style/variable.style';
import { projectDataStore } from '../../../store/projectDataStore';
import { useEffect, useState } from 'react';
import SubtaskList from './SubtaskList.comp';
import { BaseInput } from '../../../prefab/input/BaseInput.prefab';
import { AddInput } from '../../../prefab/input/AddInput.prefab';
import { Textarea } from '../../../prefab/input/TexrArea.prefab';
import { Select } from '../../../prefab/input/Select.prefab';
import { FileInput } from '../../../prefab/input/FileInput.prefab';
import Button from '../../../prefab/Button.prefab';
import { useForm } from 'react-hook-form';
import {
	CreateTaskSchema,
	type iCreateTask,
} from '../../../schema_validation_yup/createTask.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { createTask } from '../../../service/api/task.api';
import type {
	iCreateTaskData,
	iCreateTaskResult,
} from '../../../service/api_interface/taskApi.interface';
import { toastStore } from '../../../store/toastStore';

interface Props {
	refetchTaskList: () => void;
}

const CreateTaskForm = ({ refetchTaskList }: Props) => {
	const { taskCategories, projectMembers } = projectDataStore();
	const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imageError, setImageError] = useState<string | null>(null);
	const [memberError, setMemberError] = useState<string | null>(null);
	const [allMembers, setAllMembers] = useState<
		{ value: string; label: string; checked: boolean }[]
	>([]);
	const [newSubtask, setNewSubtask] = useState<string>('');
	const [subtasks, setSubtasks] = useState<
		{ subtask: string; onUpdate: boolean }[]
	>([]);

	useEffect(() => {
		if (projectMembers) {
			const members: { value: string; label: string; checked: boolean }[] =
				[];

			projectMembers.admin.forEach((member) => {
				members.push({
					value: member.id,
					label: `${member.firstname} ${member.lastname}, ${member.username}`,
					checked: false,
				});
			});
			projectMembers.collab.forEach((member) => {
				members.push({
					value: member.id,
					label: `${member.firstname} ${member.lastname}, ${member.username}`,
					checked: false,
				});
			});
			projectMembers.notConfirmed.forEach((member) => {
				if (member.role === 'GUEST') return;
				members.push({
					value: member.id,
					label: `${member.firstname} ${member.lastname}, ${member.username}`,
					checked: false,
				});
			});
			setAllMembers(members);
		}
	}, [projectMembers]);

	const checkedMembers = (id: string) => {
		setAllMembers(
			allMembers.map((member) => {
				if (member.value === id) {
					return { ...member, checked: !member.checked };
				}
				return member;
			}),
		);
	};

	const addSubtask = (newSubtask: string) => {
		if (newSubtask === '') {
			return;
		}
		if (subtasks.find((subtask) => subtask.subtask === newSubtask)) {
			return;
		}
		setSubtasks([...subtasks, { subtask: newSubtask, onUpdate: false }]);
		setNewSubtask('');
	};

	const selectedFiles = (files: FileList | null) => {
		setImageError(null);

		if (!files || files.length === 0) {
			setPreviewImageUrl(null);
			return;
		}

		const file = files[0];

		if (!file.type.startsWith('image/')) {
			setImageError('* Type de fichier non supporté');
			setPreviewImageUrl(null);
			setImageFile(null);
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			setImageError('* Fichier trop volumineux (5MO max)');
			setPreviewImageUrl(null);
			setImageFile(null);
			return;
		}

		const url = URL.createObjectURL(file);
		setPreviewImageUrl((old) => {
			if (old) {
				URL.revokeObjectURL(old);
			}
			return url;
		});
		setImageFile(file);
	};

	const methods = useForm<iCreateTask>({
		resolver: yupResolver(CreateTaskSchema),
	});

	const onSubmit = async (data: iCreateTask): Promise<void> => {
		const memberAssigned = allMembers
			.filter((member) => member.checked)
			.map((m) => m.value);
		if (memberAssigned.length === 0) {
			setMemberError('* Au moins un membre doit être assigné');
			return;
		}

		const newTask = {
			title: data.title,
			description: data.description,
			priority: data.priority,
			delay: '0',
			task_category_id: data.task_category_id,
			image: imageFile ? imageFile : undefined,
			subtasks:
				subtasks && subtasks.length > 0
					? subtasks.map((subtask) => subtask.subtask)
					: ['tâche terminée'],
			users: memberAssigned,
		};

		createTaskQuery.mutate(newTask);
	};

	const createTaskQuery = useMutation<
		iCreateTaskResult,
		Error,
		iCreateTaskData
	>({
		mutationKey: ['create_task'],
		mutationFn: (data) => createTask(data),
		onSuccess: () => {
			methods.reset();
			setPreviewImageUrl((old) => {
				if (old) URL.revokeObjectURL(old);
				return null;
			});
			setImageFile(null);
			setMemberError(null);
			setImageError(null);
			setSubtasks([]);
			setAllMembers(
				allMembers.map((member) => ({ ...member, checked: false })),
			);
			refetchTaskList();
		},
		onError: (error) => {
			toastStore
				.getState()
				.setToast({
					type: 'error',
					message: `Erreur lors de la création de la tâche : ${error.message}`,
				});
		},
	});

	return (
		<Form onSubmit={methods.handleSubmit(onSubmit)}>
			<GridCell
				$colstart='1'
				$rowstart='1'>
				<BaseInput
					{...methods.register('title')}
					type='text'
					label='* Titre de la tâche :'
					id='title'
					placeholder='Ajouter un titre a la tâche'
					error={methods.formState.errors.title?.message}
				/>
			</GridCell>

			<GridCell
				$colstart='2'
				$rowstart='1'>
				<Select
					{...methods.register('priority')}
					label='* Priorité :'
					id='priority'
					options={[
						{ value: 'LOW', label: 'Basse' },
						{ value: 'MEDIUM', label: 'Moyenne' },
						{ value: 'HIGH', label: 'Haute' },
					]}
					error={methods.formState.errors.priority?.message}
				/>
			</GridCell>
			<GridCell
				$colstart='3'
				$rowstart='1'>
				<Select
					{...methods.register('task_category_id')}
					label='* Catégorie :'
					id='category'
					options={
						taskCategories && taskCategories.length > 0
							? taskCategories.map((category) => ({
									value: category.id,
									label: category.title,
								}))
							: [
									{
										value: '',
										label: 'Aucune catégorie créer pour ce projet',
									},
								]
					}
					error={methods.formState.errors.task_category_id?.message}
				/>
			</GridCell>

			<GridCell
				$align='start '
				$colstart='1'
				$rowstart='3'>
				<SelectCheckbox
					setCheckbox={checkedMembers}
					DataCheckbox={allMembers}
					title={'* Assignation :'}
					error={memberError ? memberError : undefined}
				/>
			</GridCell>

			<GridCell
				$colstart='2'
				$rowstart='2'
				$rowspan='2'>
				<AddInput
					onChange={setNewSubtask}
					onClick={() => addSubtask(newSubtask)}
					value={newSubtask}
					id='addTask'
					label='Objectifs de la tâche :'
					placeholder='Ajouter un objectif'
				/>
				<PreviewContainer>
					<SubtaskList
						subtasks={subtasks}
						setSubtasks={setSubtasks}
					/>
				</PreviewContainer>
			</GridCell>

			<GridCell
				$colstart='3'
				$rowstart='2'
				$rowspan='2'>
				<FileInput
					error={imageError ? imageError : undefined}
					id='image'
					label='Ajouter une image : '
					placeholder='Choisir une image'
					acceptedFormat='image/*'
					multiple={false}
					onChange={selectedFiles}
				/>
				<PreviewContainer
					$display='flex'
					$justify='center'
					$align='center'>
					{previewImageUrl ? (
						<img
							style={{
								width: '100%',
								maxHeight: '200px',
								objectFit: 'contain',
							}}
							src={previewImageUrl}
							alt="Prévisualisation de l'image"
						/>
					) : null}
				</PreviewContainer>
			</GridCell>

			<GridCell
				$align='start'
				$colstart='1'
				$collspan='1'
				$rowstart='2'
				$rowspan='1'>
				<Textarea
					{...methods.register('description')}
					id='description'
					label='Description de la tâche :'
					placeholder='Ajouter une description de la tâche'
					error={methods.formState.errors.description?.message}
				/>
			</GridCell>
			<GridCell
				$colstart='2'
				$collspan='1'
				$rowstart='4'
				$rowspan='1'
				$align='center'>
				<Button
					type='submit'
					classname='fill'
					text='Ajouter la tâche'
				/>
			</GridCell>
		</Form>
	);
};

export default CreateTaskForm;

const Form = styled.form`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto;
	gap: 3rem 2rem;

	@media (max-width: ${breakpoints.md}) {
		display: flex;
		flex-direction: column;
	}
`;

const PreviewContainer = styled.div<{
	$display?: string;
	$justify?: string;
	$align?: string;
}>`
	display: ${({ $display }) => $display};
	justify-content: ${({ $justify }) => $justify};
	align-items: ${({ $align }) => $align};

	margin-top: 1rem;
	padding: 1.5rem;
	border: 0.2rem solid ${color.primary};
	border-radius: 0.5rem;
	height: 100%;
	width: 100%;
`;
