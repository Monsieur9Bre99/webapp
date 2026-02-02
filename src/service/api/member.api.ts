import type { AxiosError } from 'axios';
import { createApiClient } from '../../hooks/useApi';
import type {
	iAcceptInvitationData,
	iAcceptInvitationResponse,
	iAcceptInvitationResult,
	iAddMemberToProjectData,
	iAddMemberToProjectResponse,
	iAddMemberToProjectResult,
	iDeclineInvitationData,
	iDeclineInvitationResponse,
	iDeclineInvitationResult,
	iDeleteProjectMemberData,
	iDeleteProjectMemberResult,
	iGetProjectMembersResponse,
	iGetProjectMembersResult,
	iLeaveProjectData,
	iLeaveProjectResponse,
	iLeaveProjectResult,
	iUpdateMemberRoleData,
	iUpdateMemberRoleResponse,
	iUpdateMemberRoleResult,
} from '../api_interface/memberApi.interface';
import type { iBaseApiResponse } from '../api_interface/_baseApiResponse.interface';
import type { iDeleteProjectResponse } from '../api_interface/projectApi.interface';

const api = createApiClient();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  ADD MEMBER TO PROJECT V
/**
 * Ajoute un membre au projet actuel
 * @param {iAddMemberToProjectData} data - les informations du membre a ajouter
 * @returns {Promise<iAddMemberToProjectResult>} - le re sultat de l'ajout du membre
 * @throws {Error} - si l'appel a e chou e
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const addMemberToProject = async (
	data: iAddMemberToProjectData,
): Promise<iAddMemberToProjectResult> => {
	try {
		const response = await api.post<iAddMemberToProjectResponse>(
			`member/add`,
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  GET PROJECT MEMBERS V
/**
 * Recupere les informations des tous les membres du projet actuel
 * @returns {Promise<iGetProjectMembersResult>} - les informations des tous les membres du projet actuel
 * @throws {Error} - si l'appel a  e chou e
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getProjectMembers =
	async (): Promise<iGetProjectMembersResult> => {
		try {
			const response = await api.get<iGetProjectMembersResponse>(`member/`);
			return { members: response.data.result.members };
		} catch (error) {
			const axiosError = error as AxiosError<iBaseApiResponse>;

			if (axiosError.response?.data?.message) {
				throw new Error(axiosError.response.data.message);
			}

			throw new Error('Une erreur inconnue est survenue');
		}
	};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  DELETE PROJECT MEMBER V
/**
 * Supprime un membre du projet actuel
 * @param {iDeleteProjectMemberData} data - les informations du membre a supprimer
 * @returns {Promise<iDeleteProjectMemberResult>} - le re sultat de la suppression du membre
 * @throws {Error} - si l'appel a e chou e
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteProjectMember = async (
	data: iDeleteProjectMemberData,
): Promise<iDeleteProjectMemberResult> => {
	try {
		const response = await api.delete<iDeleteProjectResponse>(
			`member/delete`,
			{ params: { user_id: data.user_id } },
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  LEAVE PROJECT V
/**
 * Quitte le projet actuel
 * @param {iLeaveProjectData} data - les informations du projet a quitter
 * @returns {Promise<iLeaveProjectResult>} - le re sultat de la sortie du projet
 * @throws {Error} - si l'appel a e chou e
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const leaveProject = async (
	data: iLeaveProjectData,
): Promise<iLeaveProjectResult> => {
	try {
		const response = await api.delete<iLeaveProjectResponse>(`member/leave`, {
			params: { project_id: data.project_id },
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE MEMBER ROLE V
/**
 * Met a jour le r le d'un membre du projet actuel
 * @param {iUpdateMemberRoleData} data - les informations du membre a mettre a jour
 * @returns {Promise<iUpdateMemberRoleResult>} - le re sultat de la mise a jour du membre
 * @throws {Error} - si l'appel a e chou e
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateMemberRole = async (
	data: iUpdateMemberRoleData,
): Promise<iUpdateMemberRoleResult> => {
	try {
		const response = await api.patch<iUpdateMemberRoleResponse>(
			`member/update_role`,
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DECLINE INVITATION V
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const declineInvitation = async (
	data: iDeclineInvitationData,
): Promise<iDeclineInvitationResult> => {
	try {
		const response = await api.delete<iDeclineInvitationResponse>(
			`member/decline_invitation`,
			{ params: { project_id: data.project_id } },
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ACCEPT INVITATION V
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const acceptInvitation = async (
	data: iAcceptInvitationData,
): Promise<iAcceptInvitationResult> => {
	try {
		const response = await api.patch<iAcceptInvitationResponse>(
			`member/accept_invitation`,
			{},
			{ params: { project_id: data.project_id } },
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
