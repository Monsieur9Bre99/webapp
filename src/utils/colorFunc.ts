export const hexToRgba = (hex: string, alpha: number): string => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const hexWithAlpha = (hex: string, alpha: number): string => {
	const toHex = (n: number) => {
		let hex = n.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};

	if (alpha < 0) alpha = 0;
	if (alpha > 1) alpha = 1;

	const a = toHex(Math.round(alpha * 255));

	return `${hex}${a}`;
};

export const hexToRgb = (hex: string): string => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgb(${r}, ${g}, ${b})`;
};

export const rgbToHex = (rgb: string): string => {
	const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/i);
	if (!match) throw new Error('Format RGB invalide');

	const [, r, g, b] = match.map(Number);
	const toHex = (n: number) => n.toString(16).padStart(2, '0');

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

export const adjustColorBrightness = (hex: string, amount: number): string => {
	if (!hex || typeof hex !== 'string' || hex.length < 7) {
		return '#000000';
	}

	const r = Math.min(255, Math.max(0, parseInt(hex.slice(1, 3), 16)));
	const g = Math.min(255, Math.max(0, parseInt(hex.slice(3, 5), 16)));
	const b = Math.min(255, Math.max(0, parseInt(hex.slice(5, 7), 16)));

	const adjust = (color: number) => {
		if (amount < 0) {
			return Math.round(color * (1 + amount));
		} else {
			return Math.round(color + (255 - color) * amount);
		}
	};

	const newR = adjust(r);
	const newG = adjust(g);
	const newB = adjust(b);

	const toHex = (c: number) => c.toString(16).padStart(2, '0');

	return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};

export const buildGradient = (
	type: 'linear' | 'radial' | 'conic' = 'linear',
	colorList: string | string[],
	degree: string,
): string => {
	const colors = Array.isArray(colorList) ? colorList : [colorList];

	if (colorList.length === 1) return colorList[0];

	switch (type) {
		case 'linear':
			return `linear-gradient(${degree}, ${colors.join(',')})`;

		case 'radial':
			return `radial-gradient(${colors.join(',')})`;

		case 'conic':
			return `conic-gradient(${colors.join(',')})`;
	}
};

export const percentColor = (pecent: number): string | null => {
	if (pecent < 0 && pecent > 100) return null;

	if (pecent < 25) {
		return '#d00000';
	} else if (pecent < 50) {
		return '#c46901';
	} else if (pecent < 75) {
		return '#b2a000';
	} else {
		return '#1d9701';
	}
};
