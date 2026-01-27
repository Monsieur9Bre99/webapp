import { useEffect } from 'react';
import { displayStore } from '../store/displayStore';

export function useDisplayTypeListener() {
	const setDisplayType = displayStore((s) => s.setDisplayType);

	useEffect(() => {
		window.addEventListener('resize', setDisplayType);
		setDisplayType();

		return () => {
			window.removeEventListener('resize', setDisplayType);
		};
	}, [setDisplayType]);
}
