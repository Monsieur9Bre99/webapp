import dateFormat from 'dateformat';
import { DateInput } from '../../../../prefab/input/DateInput.prefab';
import { LoginCardForm } from '../../../../style/card.styledComp';
import { GridCell } from '../../../../style/global.styledComp';
import { projectDataStore } from '../../../../store/projectDataStore';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	UpdateProjectSchema,
	type iUpdateProject,
} from '../../../../schema_validation_yup/updateProject.schema';
import { useMutation } from '@tanstack/react-query';
import { updateProject } from '../../../../service/api/project.api';
import type {
	iUpdateProjectData,
	iUpdateProjectResult,
} from '../../../../service/api_interface/projectApi.interface';
import { toastStore } from '../../../../store/toastStore';
import { useState } from 'react';
import { Textarea } from '../../../../prefab/input/TexrArea.prefab';
import { BaseInput } from '../../../../prefab/input/BaseInput.prefab';

interface Props {
	setIsOnUpdate: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

const ProjectUpdate = ({ setIsOnUpdate }: Props) => {
	const { projectInfo } = projectDataStore();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const methods = useForm<iUpdateProject>({
		resolver: yupResolver(UpdateProjectSchema) as any,
		defaultValues: {
			title: projectInfo?.title ?? undefined,
			description: projectInfo?.description! ?? undefined,
			date_start: projectInfo?.date_start ?? undefined,
			date_end: projectInfo?.date_end ?? undefined,
		} satisfies Partial<iUpdateProject>,
	});

	const onSubmit = async (data: iUpdateProject): Promise<void> => {
		setIsOpen(true);
		const sameStart =
			dateFormat(data.date_start, 'dd/mm/yyyy')
			=== dateFormat(projectInfo?.date_start, 'dd/mm/yyyy');
		const sameEnd =
			dateFormat(data.date_end, 'dd/mm/yyyy')
			=== dateFormat(projectInfo?.date_end, 'dd/mm/yyyy');
		const sameTitle = data.title === projectInfo?.title;
		const sameDescription = data.description === projectInfo?.description;

		if (sameStart && sameEnd && sameTitle && sameDescription) {
			if (isOpen) {
				if (setIsOnUpdate) {
					setIsOnUpdate(false);
				}
				setIsOpen(false);
			}
			return;
		}

		updateProjectQuery.mutate(data);
		setIsOpen(false);
	};

	const updateProjectQuery = useMutation<
		iUpdateProjectResult,
		Error,
		iUpdateProjectData
	>({
		mutationKey: ['update_project'],
		mutationFn: (data) => updateProject(data),
		onSuccess: (res) => {
			projectDataStore.getState().setProjectInfo(res);
			if (setIsOnUpdate) {
				setIsOnUpdate(false);
			}
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message:
						'Une erreur est survenue lors de la mise a jour du projet',
					type: 'error',
				});
		},
	});

	return (
		<FormProvider {...methods}>
			<LoginCardForm
				id='project-update-form'
				onSubmit={methods.handleSubmit(onSubmit)}
				$gap='2rem'
				$pad='1rem'
				$column='repeat(4, 1fr)'>
				<GridCell
					$align='start'
					$colstart='1'
					$collspan='2'>
					<BaseInput
						{...methods.register('title')}
						id='title'
						label='Nom du projet :'
						type='text'
						placeholder={projectInfo?.title}
					/>
				</GridCell>
				<GridCell
					$align='start'
					$colstart='3'
					$collspan='1'>
					<DateInput
						{...methods.register('date_start')}
						value={dateFormat(projectInfo?.date_start, 'yyyy-mm-dd')}
						id='date_start'
						label='Date de début :'
						type='date'
						error={methods.formState.errors.date_start?.message}
					/>
				</GridCell>
				<GridCell
					$align='start'
					$colstart='4'
					$collspan='1'>
					<DateInput
						{...methods.register('date_end')}
						id='date_end'
						value={dateFormat(projectInfo?.date_end, 'yyyy-mm-dd')}
						label='Date de fin :'
						type='date'
						error={methods.formState.errors.date_end?.message}
					/>
				</GridCell>
				<GridCell
					$colstart='1'
					$collspan='4'>
					<Textarea
						{...methods.register('description')}
						id='description'
						label='Description :'
						placeholder={
							projectInfo?.description
							|| 'Aucune description pour le moment.'
						}
					/>
				</GridCell>
			</LoginCardForm>
		</FormProvider>
	);
};

export default ProjectUpdate;
