import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface iToastStore {
	toast: { message: string; type: 'success' | 'error' | "info" } | null;
	setToast: (
		toast: { message: string; type: 'success' | 'error' | "info" } | null,
	) => void;
}

export const toastStore = create<iToastStore>()(
	persist(
		(set) => ({
			toast: null,
			setToast: (toast) => set({ toast }),
		}),
		{
			name: 'toast-storage',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
