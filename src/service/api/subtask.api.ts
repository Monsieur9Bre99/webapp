import type { AxiosError } from 'axios';
import { createApiClient } from '../../hooks/useApi';
import type { iBaseApiResponse } from './../api_interface/_baseApiResponse.interface';
import type {
	iCreateSubtaskData,
	iCreateSubtaskResponse,
	iCreateSubtaskResult,
	iDeleteSubtaskData,
	iDeleteSubtaskResponse,
	iDeleteSubtaskResult,
	iFinishSubtaskData,
	iFinishSubtaskResponse,
	iFinishSubtaskresult,
	iGetSubtaskData,
	iGetSubtaskResponse,
	iGetSubtaskResult,
	iUpdateSubtaskData,
	iUpdateSubtaskResponse,
	iUpdateSubtaskResult,
} from '../api_interface/subtaskApi.interface';

const api = createApiClient();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE SUBTASK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createSubtask = async (
	data: iCreateSubtaskData,
): Promise<iCreateSubtaskResult> => {
	try {
		const response = await api.post<iCreateSubtaskResponse>(
			`/subtask/create/${data.task_id}`,
			{ description: data.description },
		);
		return { subtask: response.data.result.subtask };
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET SUBTASK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getSubtask = async (
	data: iGetSubtaskData,
): Promise<iGetSubtaskResult> => {
	try {
		const response = await api.get<iGetSubtaskResponse>(
			`/subtask/${data.task_id}`,
		);
		return { subtasks: response.data.result.subtasks };
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE SUBTASK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteSubtask = async (
	data: iDeleteSubtaskData,
): Promise<iDeleteSubtaskResult> => {
	try {
		await api.delete<iDeleteSubtaskResponse>(
			`/subtask/delete/${data.task_id}/${data.subtask_id}`,
		);
		return { subtask: data.subtask_id };
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE SUBTASK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateSubtask = async (
	data: iUpdateSubtaskData,
): Promise<iUpdateSubtaskResult> => {
	try {
		const response = await api.patch<iUpdateSubtaskResponse>(
			`/subtask/update/${data.task_id}/${data.subtask_id}`,
			{ description: data.description },
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
// FINISH SUBTASK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const finishSubtask = async (
	data: iFinishSubtaskData,
): Promise<iFinishSubtaskresult> => {
	try {
		const response = await api.patch<iFinishSubtaskResponse>(
			`/subtask/finish/${data.task_id}/${data.subtask_id}`,
			{ is_done: data.is_done },
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
