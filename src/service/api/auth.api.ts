import type { AxiosError } from 'axios';
import { createApiClient } from '../../hooks/useApi';
import type { iBaseApiResponse } from '../api_interface/_baseApiResponse.interface';
import type {
	iConfirmUserResponse,
	iConfirmUserResult,
	iAskUpdatePasswordData,
	iAskUpdatePasswordResult,
	iSigninUserData,
	iSigninUserResponse,
	iSigninUserResult,
	iSignoutUserData,
	iSignoutUserResponse,
	iSignoutUserResult,
	iSignupUserData,
	iSignupUserResponse,
	iSignupUserResult,
	iAskUpdatePasswordResponse,
	iUpdatePasswordData,
	iUpdatePasswordResult,
	iUpdatePasswordResponse,
	iConfirmUserData,
} from '../api_interface/authApi.interface';

const api = createApiClient();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SIGNUP USER V
/**
 * Enregistre un nouvel utilisateur
 * @param {iSignupUserData} data - les informations de l'utilisateur a enregistrer
 * @returns {Promise<iSignupUserResult>} - le re sultat de l'enregistrement
 * @throws {Error} - si l'enregistrement a e chou e
 */
export const signupUser = async (
	data: iSignupUserData,
): Promise<iSignupUserResult> => {
	try {
		await api.post<iSignupUserResponse>('auth/signup', data);
		return {
			message:
				'veuillez confirmer votre compte avec le lien envoyé par mail',
		};
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SIGNIN V
/**
 * Connexion d'un utilisateur
 * @param {iSigninUserData} data - les informations pour se connecter
 * @returns {Promise<iSigninUserResult>} - le re sultat de la connexion
 */
export const signinUser = async (
	data: iSigninUserData,
): Promise<iSigninUserResult> => {
	try {
		const response = await api.post<iSigninUserResponse>('auth/signin', data);
		return { authentification: response.data.result.authentification };
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SIGNOUT V
/**
 * Deconnection d'un utilisateur
 * @param {iSignoutUserData} data - les informations pour se d econnecter
 * @returns {Promise<iSignoutResult>} - le re sultat de la d econexion
 */
export const signoutUser = async (
	data: iSignoutUserData,
): Promise<iSignoutUserResult> => {
	try {
		const response = await api.delete<iSignoutUserResponse>('auth/signout', {
			data,
		});
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
// CONFIRM USER V
/**
 * Confirme un compte utilisateur
 * @param {iConfirmUserData} data - les informations pour confirmer le compte
 * @returns {Promise<iConfirmUserResult>} - le résultat de la confirmation du compte
 */
export const confirmUser = async (
	data: iConfirmUserData,
): Promise<iConfirmUserResult> => {
	try {
		await api.post<iConfirmUserResponse>(`auth/confirm/${data.token}`);
		return { message: 'votre compte a bien été confirmé' };
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ASK UPDATE PASSWORD V
/**
 * Demande une mise a jour du mot de passe d'un utilisateur
 * @param {iAskUpdatePasswordData} data - les informations pour demander la mise a jour du mot de passe
 * @returns {Promise<iAskUpdatePasswordResult>} - le résultat de la demande de mise a jour du mot de passe
 */
export const askUpdatePassword = async (
	data: iAskUpdatePasswordData,
): Promise<iAskUpdatePasswordResult> => {
	try {
		const response = await api.post<iAskUpdatePasswordResponse>(
			`auth/update_password`,
			data,
		);
		return { url: response.data.result };
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE PASSWORD V
/**
 * Met à jour le mot de passe d'un utilisateur
 * @param {iUpdatePasswordData} data - les informations pour mettre à jour le mot de passe
 * @returns {Promise<iUpdatePasswordResult>} - le résultat de la mise à jour du mot de passe
 */
export const updatePassword = async (
	data: iUpdatePasswordData,
): Promise<iUpdatePasswordResult> => {
	try {
		await api.patch<iUpdatePasswordResponse>(
			`auth/update_password/${data.url}`,
			{ new_password: data.newPassword },
		);
		return { message: 'Votre mot de passe a bien été mis à jour' };
	} catch (error) {
		const axiosError = error as AxiosError<iBaseApiResponse>;

		if (axiosError.response?.data?.message) {
			throw new Error(axiosError.response.data.message);
		}

		throw new Error('Une erreur inconnue est survenue');
	}
};
