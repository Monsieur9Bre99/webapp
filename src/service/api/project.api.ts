import type { AxiosError } from 'axios';
import { createApiClient } from '../../hooks/useApi';
import type { iBaseApiResponse } from '../api_interface/_baseApiResponse.interface';
import type {
	iCreateProjectData,
	iCreateProjectResult,
	iCreateProjectResponse,
	iGetProjectResult,
	iGetProjectResponse,
	iDeleteProjectResult,
	iDeleteProjectResponse,
	iUpdateProjectResult,
	iUpdateProjectData,
	iUpdateProjectResponse,
} from '../api_interface/projectApi.interface';

const api = createApiClient();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE PROJECT V
/**
 * Crée un nouveau projet
 * @param {iCreateProjectData} data - les informations du projet a cr er
 * @returns {Promise<iCreateProjectResult>} - le r sultat de la cr ation du projet
 * @throws {Error} - si l'appel a e chou e
 */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createProject = async (
	data: iCreateProjectData,
): Promise<iCreateProjectResult> => {
	try {
		const response = await api.post<iCreateProjectResponse>(
			'project/new_project',
			data,
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET PROJECT V
/**
 * Récupére les informations du projet actuel
 * @returns {Promise<iGetProjectResult>} - les informations du projet actuel
 * @throws {Error} - si l'appel a e chou e
 */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getProject = async (): Promise<iGetProjectResult> => {
	try {
		const response = await api.get<iGetProjectResponse>(`project/info`);
		return { project: response.data.result.project };
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE PROJECT V
/**
 * Supprime le projet actuel
 * @param {string} project_id - l'id du projet
 * @returns {Promise<iDeleteProjectResult>} - le re sultat de la suppression du projet actuel
 * @throws {Error} - si l'appel a  e chou e
 */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteProject = async (
	project_id?: string,
): Promise<iDeleteProjectResult> => {
	try {
		const response = await api.delete<iDeleteProjectResponse>(
			`project/delete`,
			{
				params: project_id && { project_id },
			},
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE PROJECT V
/**
 * Met a jour le projet actuel
 * @param {iUpdateProjectData} data - les informations pour mettre a jour le projet actuel
 * @returns {Promise<iUpdateProjectResult>} - le re sultat de la mise a jour du projet actuel
 * @throws {Error} - si l'appel a e chou e
 */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateProject = async (
	data: iUpdateProjectData,
): Promise<iUpdateProjectResult> => {
	try {
		const response = await api.patch<iUpdateProjectResponse>(
			`project/update`,
			data,
		);
		return response.data.result.project;
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};
