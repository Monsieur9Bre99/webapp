import { authStore } from '../../store/authStore';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { iSigninUserResponse } from '../api_interface/authApi.interface';

declare module 'axios' {
	export interface InternalAxiosRequestConfig {
		_retry?: boolean;
	}
}

export const addAuthInterceptors = (api: AxiosInstance) => {
	const AuthStore = authStore.getState();

	api.interceptors.response.use(
		(response: AxiosResponse) => response,
		async (error: AxiosError) => {
			const originalRequest = error.config;
			const status = error.response?.status;
			const userId: null | string = AuthStore.getUserId();

			switch (status) {
				case 400:
					console.error('bad request');
					break;

				case 401: {
					if (originalRequest && !originalRequest._retry) {
						originalRequest._retry = true;
						if (userId) {
							try {
								const response = await api.patch<iSigninUserResponse>(
									`auth/refresh/`,
									{},
									{ withCredentials: true },
								);
								if (response.data.result.authentification.accessToken) {
									AuthStore.refreshAccess(
										response.data.result.authentification.accessToken,
									);
								}
								return api(originalRequest);
							} catch {
								console.error('Refresh token failed, logout required');
								AuthStore.logout();
							}
						}
					} else {
						if (userId) {
							AuthStore.logout();
						}
					}
					break;
				}

				case 404:
					console.error('Not Found');
					break;

				case 500:
					console.error('server error');
					break;
			}

			return Promise.reject(error);
		},
	);
};
