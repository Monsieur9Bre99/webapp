import type { iBaseApiResponse } from './_baseApiResponse.interface';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET USER
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface iGetUserResponse extends iBaseApiResponse {
	result: {
		message: string;
		user: {
			firstname: string;
			lastname: string;
			projects: {
				role: 'OWNER' | 'ADMIN' | 'COLLAB' | 'GUEST';
				project: {
					id: string;
					title: string;
					description?: string | null;
					date_start: Date;
					date_end: Date;
				};
			}[];
		};
	};
}

export interface iGetUserResult {
	firstname: string;
	lastname: string;
	projects: {
		role: 'OWNER' | 'ADMIN' | 'COLLAB' | 'GUEST';
		project: {
			id: string;
			title: string;
			description?: string | null;
			date_start: Date;
			date_end: Date;
		};
	}[];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET ALL USERS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface iGetAllUsersResponse extends iBaseApiResponse {
	result: {
		message: string;
		users: { id: string; username: string }[];
	};
}

export interface iGetAllUsersResult {
	id: string;
	username: string;
}

