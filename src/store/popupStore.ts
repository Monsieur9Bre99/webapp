import { create } from 'zustand';

interface PopupStore {
	popup: { message: string; action: () => any } | null;
	setPopup: (popup: any) => void;
}

export const popupStore = create<PopupStore>((set) => ({
	popup: null,
	setPopup: (popup) => set({ popup: popup }),
}));
