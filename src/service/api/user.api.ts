import type { AxiosError } from 'axios';
import { createApiClient } from '../../hooks/useApi';
import type { iBaseApiResponse } from '../api_interface/_baseApiResponse.interface';

import type {
	iGetUserResult,
	iGetUserResponse,
	iGetAllUsersResult,
	iGetAllUsersResponse,
} from '../api_interface/userApi.interface';

const api = createApiClient();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET USER V
/**
 * Recupere les informations d'un utilisateur
 * @returns {Promise<iGetUserResult>} - les informations de l'utilisateur
 * @throws {Error} - si l'appel a e chou e
 */
export const getUser = async (): Promise<iGetUserResult> => {
	try {
		const response = await api.get<iGetUserResponse>('user');
		return response.data.result.user;
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET ALL USERS V
/**
 * Recupere tous les utilisateurs de l'application en dehors du projet actuel
 * @returns {Promise<iGetAllUsersResult[]>} - la liste des utilisateurs
 * @throws {Error} - si l'appel a e chou e
 */
export const getAllUsers = async (): Promise<iGetAllUsersResult[]> => {
	try {
		const response = await api.get<iGetAllUsersResponse>('user/all');
		return response.data.result.users;
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};
