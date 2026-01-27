import type { AxiosError } from 'axios';
import { createApiClient } from '../../hooks/useApi';
import type { iBaseApiResponse } from '../api_interface/_baseApiResponse.interface';
import type {
	iAssignTaskToUserData,
	iAssignTaskToUserResponse,
	iAssignTaskToUserResult,
	iGetUserTaskData,
	iGetUserTaskResponse,
	iGetUserTaskResult,
	iRemoveUserTaskData,
	iRemoveUserTaskResponse,
	iRemoveUserTaskResult,
} from '../api_interface/user_taskApi.interface';

const api = createApiClient();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ASSIGN TASK TO USER V
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const assignTaskToUser = async (
	data: iAssignTaskToUserData,
): Promise<iAssignTaskToUserResult> => {
	try {
		const response = await api.post<iAssignTaskToUserResponse>(
			`user_task/${data.task_id}`,
			{ user: { user_id: data.user_id } },
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
// GET USER TASK V
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getUserTask = async (
	data: iGetUserTaskData,
): Promise<iGetUserTaskResult> => {
	try {
		const response = await api.get<iGetUserTaskResponse>(
			`user_task/${data.task_id}`,
		);
		return { userTaskList: response.data.result.userTaskList };
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REMOVE USER TASK V
/**
 * Supprime une tache utilisateur
 * @param {iRemoveUserTaskData} data - les informations pour supprimer la tache utilisateur
 * @returns {Promise<iRemoveUserTaskResult>} - le re sultat de la suppression de la tache utilisateur
 * @throws {Error} - si l'appel a e chou e
 */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const removeUserTask = async (
	data: iRemoveUserTaskData,
): Promise<iRemoveUserTaskResult> => {
	try {
		const response = await api.delete<iRemoveUserTaskResponse>(
			`user_task/delete/${data.task_id}/${data.user_id}`,
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
