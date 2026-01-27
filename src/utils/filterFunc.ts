import type { iActiveFilter } from '../components/TaskFilterBtn.comp';
import type { iGetTaskByProjectResult } from '../service/api_interface/taskApi.interface';

export const resetFilter = (filterList: {
	[key: string]: string | null;
}): { [key: string]: string | null } => {
	const keys = Object.keys(filterList) as (keyof typeof filterList)[];

	let filters: { [key: string]: string | null } = { ...filterList };

	keys.forEach((key) => (filters[key as keyof typeof filterList] = null));

	return filters;
};

export const filterTasks = (
	filters: iActiveFilter,
	tasks: iGetTaskByProjectResult[],
) => {
	return tasks.filter((task) => {
		const matchSearch =
			!filters.search
			|| task.title.toLowerCase().includes(filters.search.toLowerCase());

		const matchPriority =
			!filters.priority || task.priority === filters.priority;

		const matchStatus = !filters.statuts || task.statuts === filters.statuts;

		const matchCategory =
			!filters.category || task.task_category?.id === filters.category;

		const matchUser =
			!filters.user
			|| task.user_assigned?.some((user) => user.user.id === filters.user);

		return (
			matchSearch
			&& matchPriority
			&& matchStatus
			&& matchCategory
			&& matchUser
		);
	});
};
