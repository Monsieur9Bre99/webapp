import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { authStore } from '../store/authStore';
import { addAuthInterceptors } from '../service/interceptors/api.interceptor';

export const createApiClient = (): AxiosInstance => {
	const api = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});

	api.interceptors.request.use((config) => {
		const token = authStore.getState().getAccessToken();
		const project_id = sessionStorage.getItem('project_id');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		if (project_id) {
			config.params = {
				...(config.params || {}),
				project_id: project_id,
			};
		}
		return config;
	});

	addAuthInterceptors(api);

	return api;
};
