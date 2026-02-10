import type { iBaseApiResponse } from './_baseApiResponse.interface';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE PROJECT
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface iCreateProjectData {
	title: string;
	description?: string;
	date_start: Date;
	date_end: Date;
}

export interface iCreateProjectResponse extends iBaseApiResponse {
	result: string;
}

export interface iCreateProjectResult {
	message: string;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET PROJECT
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface iGetProjectResponse extends iBaseApiResponse {
	result: {
		message: string;
		project: {
			id: string;
			title: string;
			description?: string | null;
			date_start: Date;
			date_end: Date;
			task_categories: { id: string; title: string }[];
			tasks: {
				id: string;
				title: string;
				description?: string | null;
				priority: 'LOW' | 'MEDIUM' | 'HIGH';
				statuts: 'BACKLOG' | 'TODO' | 'ON_GOING' | 'ON_TEST' | 'FINISHED';
				image?: string | null;
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
			}[];
			members: {
				role: 'OWNER' | 'ADMIN' | 'COLLAB' | 'GUEST';
				is_confirmed: boolean;
				user: {
					id: string;
					firstname: string;
					lastname: string;
					email: string;
					username: string;
				};
			}[];
		};
	};
}

export interface iGetProjectResult {
	project: {
		id: string;
		title: string;
		description?: string | null;
		date_start: Date;
		date_end: Date;
		task_categories: { id: string; title: string }[];
		tasks: {
			id: string;
			title: string;
			description?: string | null;
			priority: 'LOW' | 'MEDIUM' | 'HIGH';
			statuts: 'BACKLOG' | 'TODO' | 'ON_GOING' | 'ON_TEST' | 'FINISHED';
			image?: string | null;
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
		}[];
		members: {
			role: 'OWNER' | 'ADMIN' | 'COLLAB' | 'GUEST';
			is_confirmed: boolean;
			user: {
				id: string;
				firstname: string;
				lastname: string;
				email: string;
				username: string;
			};
		}[];
	};
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE PROJECT
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface iDeleteProjectResponse extends iBaseApiResponse {
	result: string;
}

export interface iDeleteProjectResult {
	message: string;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE PROJECT
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface iUpdateProjectData {
	title?: string;
	description?: string;
	date_start?: Date;
	date_end?: Date;
}

export interface iUpdateProjectResponse extends iBaseApiResponse {
	result: {
		message: string;
		project: {
			id: string;
			title: string;
			description?: string | null;
			date_start: Date;
			date_end: Date;
		};
	};
}

export interface iUpdateProjectResult {
	id: string;
	title: string;
	description?: string | null;
	date_start: Date;
	date_end: Date;
}
