export const traductePriority = (priority: string): string => {
	switch (priority) {
		case 'LOW':
			return 'Basse';
		case 'MEDIUM':
			return 'Moyenne';
		case 'HIGH':
			return 'Haute';
		default:
			return priority;
	}
};

export const traducteStatus = (status: string): string => {
	switch (status) {
		case 'BACKLOG':
			return 'En attente';
		case 'TODO':
			return 'A faire';
		case 'ON_GOING':
			return 'En cours';
		case 'ON_TEST':
			return 'a tester';
		case 'FINISHED':
			return 'Terminé';
		default:
			return status;
	}
};
