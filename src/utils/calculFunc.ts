export const calculateProgress = (subtasks: boolean[]): string => {
	const completedSubtasks = subtasks.filter(
		(subtask) => subtask === true,
	).length;
	return ((completedSubtasks / subtasks.length) * 100).toFixed(0);
};

export const clalculateTimeFromTimestamp = (
	timestamp: number,
): string | null => {
	if (!timestamp || isNaN(timestamp)) {
		return null;
	}

	const seconds = timestamp / 1000;

	let minutes = seconds / 60;

	let hours = Math.floor(minutes / 60);
	minutes = minutes % 60;

	return `${hours > 0 ? `${hours.toFixed(0)}h ` : ''}${minutes > 0 ? ` ${minutes.toFixed(0)}m` : ''} `;
};

export const checkWeekfromDate = (date: Date): boolean => {
	if (!date) {
		return true;
	}

	const today = new Date();
	const diffTime = Math.abs(today.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return diffDays < 7;
};
