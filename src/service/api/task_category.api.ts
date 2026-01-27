import type { AxiosError } from 'axios';
import { createApiClient } from '../../hooks/useApi';
import type { iBaseApiResponse } from '../api_interface/_baseApiResponse.interface';
import type {
	iCreateCategoryData,
	iCreateCategoryResponse,
	iCreateCategoryResult,
	iDeleteCategoryData,
	iDeleteCategoryResponse,
	iDeleteCategoryResult,
	iGetAllCategoriesResponse,
	iGetAllCategoriesResult,

} from '../api_interface/task_categoryApi.interface';

const api = createApiClient();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE CATEGORY V
/**
 * Crée une nouvelle catégorie
 * @param {iCreateCategoryData} data - les informations de la catégorie à créer
 * @returns {Promise<iCreateCategoryResult>} - le résultat de la création de la catégorie
 * @throws {Error} - si l'appel a échoué
 */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createCategory = async (
	data: iCreateCategoryData,
): Promise<iCreateCategoryResult> => {
	try {
		const response = await api.post<iCreateCategoryResponse>(
			'task-category/add',
			data,
		);
		return response.data.result.category;
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET ALL CATEGORIES V
/**
 * Recupere toutes les cat gories de l'application en dehors du projet actuel
 * @returns {Promise<iGetAllCategoriesResult[]>} - la liste des cat gories
 * @throws {Error} - si l'appel a e chou e
 */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getAllCategories = async (): Promise<
	iGetAllCategoriesResult[]
> => {
	try {
		const response = await api.get<iGetAllCategoriesResponse>(
			'task-category/',
		);
		return response.data.result.categories;
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE CATEGORY v
/**
 * Supprime une categorie
 * @param {iDeleteCategoryData} data - les informations de la categorie a supprimer
 * @returns {Promise<iDeleteCategoryResult>} - le re sultat de la suppression de la categorie
 * @throws {Error} - si l'appel a e chou e
 */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteCategory = async (
	data: iDeleteCategoryData,
): Promise<iDeleteCategoryResult> => {
	try {
		const response = await api.delete<iDeleteCategoryResponse>(
			`task-category/${data.id}/delete`,
		);
		return { message: response.data.result };
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};
