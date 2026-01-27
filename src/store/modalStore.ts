import { create } from 'zustand';

interface ModalStore {
	isOpen: boolean;
	openModal: () => void;
	closeModal: (event?: React.MouseEvent) => void;
}

export const modalStore = create<ModalStore>((set) => ({
	isOpen: false,
	openModal: () => set({ isOpen: true }),
	closeModal: (event) => {
		if (event && event.target !== event.currentTarget) return;
		event?.stopPropagation();
		set({ isOpen: false });
	},
}));
