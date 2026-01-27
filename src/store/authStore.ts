import { create } from 'zustand';

interface iAuthStore {
	isLogged: boolean;
	accessToken: string | null;
	userId: string | null;

	login: (info: { accessToken: string; userId: string }) => void;
	logout: () => void;
	refreshAccess: (accessToken: string) => void;
	getAccessToken: () => string | null;
	getUserId: () => string | null;
}

export const authStore = create<iAuthStore>((set, get) => ({
	isLogged: localStorage.getItem('access_token') ? true : false,
	accessToken: localStorage.getItem('access_token'),
	userId: localStorage.getItem('user_id'),

	login: (info) => {
		localStorage.setItem('access_token', info.accessToken);
		localStorage.setItem('user_id', info.userId);

		set({
			isLogged: true,
			accessToken: info.accessToken,
			userId: info.userId,
		});

		location.replace('/user');
	},

	logout: async () => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('user_id');

		set({ isLogged: false, accessToken: null, userId: null });
		location.replace('/login');
	},

	refreshAccess: (accessToken: string) => {
		localStorage.setItem('access_token', accessToken);

		set({ accessToken: accessToken });
	},

	getAccessToken: () => get().accessToken,

	getUserId: () => get().userId,
}));
