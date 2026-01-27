import type { AxiosError } from 'axios';
import { createApiClient } from '../../hooks/useApi';
import type { iBaseApiResponse } from '../api_interface/_baseApiResponse.interface';
import type {
	iCreateTaskData,
	iCreateTaskResult,
	iCreateTaskResponse,
	iGetTaskByIdData,
	iGetTaskByIdResult,
	iGetTaskByIdResponse,
	iUpdateTaskStatusData,
	iUpdateTaskStatusResult,
	iUpdateTaskStatusResponse,
	iGetTaskByProjectResult,
	iGetTaskByProjectResponse,
	iDeleteTaskResult,
	iDeleteTaskData,
	iDeleteTaskResponse,
	iAddWorkTimeData,
	iAddWorkTimeResponse,
	iAddWorkTimeResult,
	iUpdateTaskData,
	iUpdateTaskResponse,
	iUpdateTaskResult,
	iRemoveTaskImageData,
	iRemoveTaskImageResponse,
	iRemoveTaskImageResult,
} from '../api_interface/taskApi.interface';

const api = createApiClient();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE TASK V
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const createTask = async (
	data: iCreateTaskData,
): Promise<iCreateTaskResult> => {
	try {
		const formData = new FormData();
		formData.append('title', data.title);
		formData.append('description', data.description || '');
		formData.append('priority', data.priority);
		formData.append('delay', data.delay);
		formData.append('task_category_id', data.task_category_id);
		formData.append('users', JSON.stringify(data.users));
		formData.append('subtasks', JSON.stringify(data.subtasks));
		if (data.image) {
			formData.append('image', data.image);
		}

		const response = await api.post<iCreateTaskResponse>(
			'task/new_task',
			formData,
			{ headers: { 'Content-Type': 'multipart/form-data' } },
		);
		return response.data.result.task;
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET TASK BY PROJECT V
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getTaskByProject = async (): Promise<
	iGetTaskByProjectResult[] | []
> => {
	try {
		const response = await api.get<iGetTaskByProjectResponse>(`task/`);
		return response.data.result.taskList || [];
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET TASK BY ID V
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getTaskById = async (
	data: iGetTaskByIdData,
): Promise<iGetTaskByIdResult> => {
	try {
		const response = await api.get<iGetTaskByIdResponse>(
			`task/${data.task_id}`,
		);
		return response.data.result.task;
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE TASK V
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteTask = async (
	data: iDeleteTaskData,
): Promise<iDeleteTaskResult> => {
	try {
		const response = await api.delete<iDeleteTaskResponse>(
			`task/delete/${data.task_id}`,
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
// UPDATE TASK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateTask = async (
	data: iUpdateTaskData,
): Promise<iUpdateTaskResult> => {
	try {
		const formData = new FormData();

		if (data.updates.title) formData.append('title', data.updates.title);
		if (data.updates.description)
			formData.append('description', data.updates.description);
		if (data.updates.priority)
			formData.append('priority', data.updates.priority);
		if (data.updates.delay) formData.append('delay', data.updates.delay);
		if (data.updates.task_category_id)
			formData.append('task_category_id', data.updates.task_category_id);
		if (data.updates.image) formData.append('image', data.updates.image);

		const response = await api.patch<iUpdateTaskResponse>(
			`task/${data.task_id}`,
			formData,
			{ headers: { 'Content-Type': 'multipart/form-data' } },
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
// UPDATE TASK STATUS V
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateTaskStatuts = async (
	data: iUpdateTaskStatusData,
): Promise<iUpdateTaskStatusResult> => {
	try {
		const response = await api.patch<iUpdateTaskStatusResponse>(
			`task/statuts/${data.task_id}`,
			{ newStatuts: data.newStatuts },
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
// ADD WORK TIME V
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addWorkTime = async (
	data: iAddWorkTimeData,
): Promise<iAddWorkTimeResult> => {
	try {
		const response = await api.patch<iAddWorkTimeResponse>(
			`task/work_on/${data.task_id}`,
			{ work_time: data.work_time },
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
// REMOVE TASK IMAGE V
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const removeTaskImage = async (
	data: iRemoveTaskImageData,
): Promise<iRemoveTaskImageResult> => {
	try {
		const response = await api.delete<iRemoveTaskImageResponse>(
			`task/remove_image/${data.task_id}`,
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
