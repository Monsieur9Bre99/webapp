import { create } from 'zustand';

type DisplayType = 'mobile' | 'tablet' | 'desktop' | 'large_desktop';

interface DisplayStore {
	displayType: DisplayType;
	setDisplayType: () => void;
}

export const displayStore = create<DisplayStore>((set) => ({
	displayType: 'desktop',

	setDisplayType: () => {
		const width = window.innerWidth;

		if (width <= 768) set({ displayType: 'mobile' });
		else if (width > 768 && width <= 1024) set({ displayType: 'tablet' });
		else if (width > 1024 && width <= 1440) set({ displayType: 'desktop' });
		else set({ displayType: 'large_desktop' });
	},
}));
