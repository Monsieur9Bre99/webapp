import {
	Card,
	LoginCardForm,
	LoginCardTitle,
} from '../../style/card.styledComp';
import Button from '../../prefab/Button.prefab';
import { color } from '../../style/variable.style';
import { modalStore } from '../../store/modalStore';
import {
	CreateProjectSchema,
	type iCreateProject,
} from '../../schema_validation_yup/createProject.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createProject } from '../../service/api/project.api';
import type {
	iCreateProjectData,
	iCreateProjectResult,
} from '../../service/api_interface/projectApi.interface';
import { toastStore } from '../../store/toastStore';
import { GridCell } from '../../style/global.styledComp';
import { BaseInput } from '../../prefab/input/BaseInput.prefab';
import { Textarea } from '../../prefab/input/TexrArea.prefab';
import { DateInput } from '../../prefab/input/DateInput.prefab';

interface Props {
	refetchProjectsList: () => void;
}

const CreateProjectForm = ({ refetchProjectsList }: Props) => {
	const methods = useForm<iCreateProject>({
		resolver: yupResolver(CreateProjectSchema),
	});

	const onSubmit = async (data: iCreateProject): Promise<void> => {
		const newProject = {
			title: data.title,
			description: data.description || undefined,
			date_start: data.date_start,
			date_end: data.date_end,
		};

		createProjectQuery.mutate(newProject);
	};

	const createProjectQuery = useMutation<
		iCreateProjectResult,
		Error,
		iCreateProjectData
	>({
		mutationKey: ['create_project'],
		mutationFn: (data) => createProject(data),
		onSuccess: () => {
			refetchProjectsList();
			modalStore.getState().closeModal();
		},
		onError: () => {
			toastStore.getState().setToast({
				message: 'Une erreur est survenue lors de la creation du projet',
				type: 'error',
			});
			modalStore.getState().closeModal();
		},
	});

	return (
		<Card>
			<LoginCardTitle>Créer un nouveau projet</LoginCardTitle>
			<LoginCardForm onSubmit={methods.handleSubmit(onSubmit)}>
				<GridCell
					$colstart='1'
					$collspan='2'>
					<BaseInput
						{...methods.register('title')}
						id='project_name'
						label='* Nom du projet :'
						placeholder='Entrez le nom du projet'
						error={methods.formState.errors.title?.message}
					/>
				</GridCell>
				<GridCell
					$colstart='1'
					$collspan='2'>
					<Textarea
						{...methods.register('description')}
						id='project_description'
						label='Description du projet :'
						placeholder='Entrez la description du projet'
					/>
				</GridCell>
				<GridCell
					$colstart='1'
					$collspan='1'>
					<DateInput
						{...methods.register('date_start')}
						id={'date_start'}
						label={'* Date de debut :'}
						error={methods.formState.errors.date_start?.message}
					/>
				</GridCell>
				<GridCell
					$colstart='2'
					$collspan='1'>
					<DateInput
						{...methods.register('date_end')}
						id={'date_end'}
						label={'* Date de fin :'}
						error={methods.formState.errors.date_end?.message}
					/>
				</GridCell>
				<GridCell
					$align='start'
					$colstart='1'>
					<Button
						onClick={(e) => modalStore.getState().closeModal(e)}
						classname='outline'
						type='reset'
						text='Annuler'
						colors={{
							$textColor: color.error,
							$backgroundColor: color.error,
							$borderColor: color.error,
						}}
					/>
				</GridCell>
				<GridCell
					$align='end'
					$colstart='2'>
					<Button
						type='submit'
						text='Créer'
						colors={{
							$textColor: color.light,
							$backgroundColor: color.primary,
							$borderColor: color.primary,
						}}
					/>
				</GridCell>
			</LoginCardForm>
		</Card>
	);
};

export default CreateProjectForm;
