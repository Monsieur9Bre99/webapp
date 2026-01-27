import styled from 'styled-components';
import { AddInput } from '../../../../prefab/input/AddInput.prefab';
import { GridContainer } from '../../../../style/global.styledComp';
import { color, typography } from '../../../../style/variable.style';
import Badge from '../../../../prefab/Badge.prefab';
import { useEffect, useState } from 'react';
import { projectDataStore } from '../../../../store/projectDataStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	createCategory,
	deleteCategory,
	getAllCategories,
} from '../../../../service/api/task_category.api';
import type {
	iCreateCategoryData,
	iCreateCategoryResult,
	iDeleteCategoryData,
	iDeleteCategoryResult,
	iGetAllCategoriesResult,
} from '../../../../service/api_interface/task_categoryApi.interface';
import { toastStore } from '../../../../store/toastStore';
import { popupStore } from '../../../../store/popupStore';

interface Props {
	isOnUpdate: boolean;
}

const TaskCategoryContainer = ({ isOnUpdate }: Props) => {
	const [newTask, setNewTask] = useState<string>('');
	const { taskCategories } = projectDataStore();

	const { data: getAllCategoriesQuery, refetch } = useQuery<
		iGetAllCategoriesResult[],
		Error
	>({
		queryKey: ['getAllCategories'],
		queryFn: () => getAllCategories(),
		enabled: false,
	});

	const addCategoryQuery = useMutation<
		iCreateCategoryResult,
		Error,
		iCreateCategoryData
	>({
		mutationKey: ['addCategory'],
		mutationFn: (data) => createCategory(data),
		onSuccess: () => {
			setNewTask('');
			toastStore
				.getState()
				.setToast({ message: 'Categorie crée', type: 'success' });
			refetch();
		},
		onError: () => {
			toastStore.getState().setToast({
				message: 'Impossible de creer la categorie',
				type: 'error',
			});
		},
	});

	const deleteCategoryQuery = useMutation<
		iDeleteCategoryResult,
		Error,
		iDeleteCategoryData
	>({
		mutationKey: ['deleteCategory'],
		mutationFn: (data) => deleteCategory(data),
		onSuccess: () => {
			toastStore
				.getState()
				.setToast({ message: 'Categorie supprimee', type: 'success' });
			refetch();
		},
		onError: () => {
			toastStore.getState().setToast({
				message: 'Impossible de supprimer la categorie',
				type: 'error',
			});
		},
	});

	useEffect(() => {
		if (!getAllCategoriesQuery) {
			return;
		}
		projectDataStore.getState().setTaskCategories(getAllCategoriesQuery);
	}, [getAllCategoriesQuery]);

	return (
		<GridContainer
			$gap='2rem'
			$columns={isOnUpdate ? '49% 49%' : '100%'}>
			{isOnUpdate ? (
				<AddInput
					onChange={setNewTask}
					onClick={() =>
						newTask !== '' &&
						addCategoryQuery.mutate({ category: { title: newTask } })
					}
					value={newTask}
					id='add-category'
					label='Ajouter une categorie :'
					placeholder='ajouter une categorie de tâche'
				/>
			) : (
				<H3>Liste des categories :</H3>
			)}
			<CategorieContainer>
				{!taskCategories || taskCategories?.length === 0 ? (
					<Badge text={'aucune categorie existante'} />
				) : (
					taskCategories.map((category) => (
						<Badge
							key={category.id}
							$canDelete={isOnUpdate}
							$onClick={() =>
								popupStore.getState().setPopup({
									message:
										'Si vous supprimez une categorie, toutes les taches liées a celle-ci seront supprimees, êtes vous sur de vouloir continuer ?',
									action: deleteCategoryQuery.mutate.bind(null, {
										id: category.id,
									}),
								})
							}
							text={category.title}
						/>
					))
				)}
			</CategorieContainer>
		</GridContainer>
	);
};

export default TaskCategoryContainer;

const CategorieContainer = styled.div`
	padding: 0.5rem;
	border: 0.1rem solid ${color.primary};
	border-radius: 0.5rem;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1rem;
	justify-content: flex-start;
	align-items: flex-start;
`;

const H3 = styled.h3`
	color: ${color.primary};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.m};
	font-weight: ${typography.weight.normal};
`;
