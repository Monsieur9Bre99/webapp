import type { iBaseApiResponse } from './_baseApiResponse.interface';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE TASK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface iCreateTaskData {
	title: string;
	description?: string | null;
	priority: 'LOW' | 'MEDIUM' | 'HIGH';
	delay: string;
	task_category_id: string;
	image?: File;
	subtasks?: string[];
	users: string[];
}

export interface iCreateTaskResponse extends iBaseApiResponse {
	result: {
		message: string;
		task: {
			id: string;
			title: string;
			description?: string | null;
			priority: 'LOW' | 'MEDIUM' | 'HIGH';
			statuts: 'BACKLOG' | 'TODO' | 'ON_GOING' | 'ON_TEST' | 'FINISHED';
			image: string;
			date_start: Date | null;
			delay: number;
			worked_time: number;
			date_end: Date | null;
			task_category: { id: string; title: string };
			subtasks: { id: string; description: string; is_done: boolean }[];
			user_assigned: {
				user: {
					id: string;
					firstname: string;
					lastname: string;
					username: string;
				};
			}[];
		};
	};
}

export interface iCreateTaskResult {
	id: string;
	title: string;
	description?: string | null;
	priority: 'LOW' | 'MEDIUM' | 'HIGH';
	statuts: 'BACKLOG' | 'TODO' | 'ON_GOING' | 'ON_TEST' | 'FINISHED';
	image: string;
	date_start: Date | null;
	delay: number;
	worked_time: number;
	date_end: Date | null;
	task_category: { id: string; title: string };
	subtasks: { id: string; description: string; is_done: boolean }[];
	user_assigned: {
		user: {
			id: string;
			firstname: string;
			lastname: string;
			username: string;
		};
	}[];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET TASK BY PROJECT
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface iGetTaskByProjectResponse extends iBaseApiResponse {
	result: {
		message: string;
		taskList: {
			id: string;
			title: string;
			description?: string | null;
			priority: 'LOW' | 'MEDIUM' | 'HIGH';
			statuts: 'BACKLOG' | 'TODO' | 'ON_GOING' | 'ON_TEST' | 'FINISHED';
			image: string;
			date_start: Date | null;
			delay: number;
			worked_time: number;
			date_end: Date | null;
			task_category?: { id: string; title: string };
			subtasks?: { id: string; description: string; is_done: boolean }[];
			user_assigned?: {
				user: {
					id: string;
					firstname: string;
					lastname: string;
					username: string;
				};
			}[];
		}[];
	};
}

export interface iGetTaskByProjectResult {
	id: string;
	title: string;
	description?: string | null;
	priority: 'LOW' | 'MEDIUM' | 'HIGH';
	statuts: 'BACKLOG' | 'TODO' | 'ON_GOING' | 'ON_TEST' | 'FINISHED';
	image: string;
	date_start: Date | null;
	delay: number;
	worked_time: number;
	date_end: Date | null;
	task_category?: { id: string; title: string };
	subtasks?: { id: string; description: string; is_done: boolean }[];
	user_assigned?: {
		user: {
			id: string;
			firstname: string;
			lastname: string;
			username: string;
		};
	}[];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET TASK BY ID
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface iGetTaskByIdData {
	task_id: string;
}

export interface iGetTaskByIdResponse extends iBaseApiResponse {
	result: {
		message: string;
		task: {
			id: string;
			title: string;
			description?: string | null;
			priority: 'LOW' | 'MEDIUM' | 'HIGH';
			statuts: 'BACKLOG' | 'TODO' | 'ON_GOING' | 'ON_TEST' | 'FINISHED';
			image: string;
			date_start: Date | null;
			delay: number;
			worked_time: number;
			date_end: Date | null;
			task_category?: { id: string; title: string };
			subtasks?: { id: string; description: string; is_done: boolean }[];
			user_assigned?: {
				user: {
					id: string;
					firstname: string;
					lastname: string;
					username: string;
				};
			}[];
		};
	};
}

export interface iGetTaskByIdResult {
	id: string;
	title: string;
	description?: string | null;
	priority: 'LOW' | 'MEDIUM' | 'HIGH';
	statuts: 'BACKLOG' | 'TODO' | 'ON_GOING' | 'ON_TEST' | 'FINISHED';
	image: string;
	date_start: Date | null;
	delay: number;
	worked_time: number;
	date_end: Date | null;
	task_category?: { id: string; title: string };
	subtasks?: { id: string; description: string; is_done: boolean }[];
	user_assigned?: {
		user: {
			id: string;
			firstname: string;
			lastname: string;
			username: string;
		};
	}[];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE TASK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface iDeleteTaskData {
	task_id: string;
}

export interface iDeleteTaskResponse extends iBaseApiResponse {
	result: string;
}

export interface iDeleteTaskResult {
	message: string;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE TASK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface iUpdateTaskData {
	task_id: string;
	updates: {
		title?: string;
		description?: string | null;
		priority?: 'LOW' | 'MEDIUM' | 'HIGH';
		delay?: string;
		task_category_id?: string;
		image?: File | null;
	};
}

export interface iUpdateTaskResponse extends iBaseApiResponse {
	result: string;
}

export interface iUpdateTaskResult {
	message: string;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE TASK STATUS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface iUpdateTaskStatusData {
	task_id: string;
	newStatuts: 'BACKLOG' | 'TODO' | 'ON_GOING' | 'ON_TEST' | 'FINISHED';
}

export interface iUpdateTaskStatusResponse extends iBaseApiResponse {
	result: string;
}

export interface iUpdateTaskStatusResult {
	message: string;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADD WORK TIME
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface iAddWorkTimeData {
	task_id: string;
	work_time: number;
}

export interface iAddWorkTimeResponse extends iBaseApiResponse {
	result: string;
}

export interface iAddWorkTimeResult {
	message: string;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REMOVE TASK IMAGE V
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface iRemoveTaskImageData {
	task_id: string;
}

export interface iRemoveTaskImageResponse extends iBaseApiResponse {
	result: string;
}

export interface iRemoveTaskImageResult {
	message: string;
}
