import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import { DetailButton } from './DisplayTaskDetail.comp';
import { projectDataStore } from '../../../store/projectDataStore';
import type {
	iGetTaskByIdResult,
	iUpdateTaskStatusData,
	iUpdateTaskStatusResult,
} from '../../../service/api_interface/taskApi.interface';
import { color } from '../../../style/variable.style';
import { useMutation } from '@tanstack/react-query';
import { toastStore } from '../../../store/toastStore';
import { updateTaskStatuts } from '../../../service/api/task.api';

interface Props {
	type: 'before' | 'after';
	task: iGetTaskByIdResult;
	$location: string | undefined;
	refetchTask: () => void;
}

const ChangeStatusBtn = ({ type, task, $location, refetchTask }: Props) => {
	const { currentRole } = projectDataStore();
	const currentUser = localStorage.getItem('user_id');

	const isAdmin = currentRole === 'ADMIN' || currentRole === 'OWNER';
	const isAssigned = task.user_assigned?.some(
		(u) => u.user.id === currentUser,
	);
	const isOnBacklog = task.statuts === 'BACKLOG';
	if (!isAdmin) {
		if (!isAssigned) return null;
		if (isOnBacklog) return null;
	}

	let isBeforeDisabled: boolean = false;
	let isAfterDisabled: boolean = false;

	if (type === 'before') {
		if ($location === 'backlog' && task.statuts !== 'TODO') {
			isBeforeDisabled = true;
		} else if (
			$location === 'kanban'
			&& (task.statuts === 'TODO' || task.statuts === 'FINISHED')
		) {
			isBeforeDisabled = true;
		} else {
			isBeforeDisabled = false;
		}
	}

	if (type === 'after') {
		if (task.statuts === 'FINISHED') {
			isAfterDisabled = true;
		} else if (task.statuts === 'TODO' && $location === 'backlog') {
			isAfterDisabled = true;
		} else {
			isAfterDisabled = false;
		}
	}

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (task.statuts === 'FINISHED') return;

		const possibleStatuts: (
			| 'BACKLOG'
			| 'TODO'
			| 'ON_GOING'
			| 'ON_TEST'
			| 'FINISHED'
		)[] = ['BACKLOG', 'TODO', 'ON_GOING', 'ON_TEST', 'FINISHED'];

		const currentIndex = possibleStatuts.indexOf(task.statuts);

		if (task.statuts === 'BACKLOG' && !task.delay) {
			toastStore
				.getState()
				.setToast({
					message: 'Veuillez definir un delai avant de lancer la tache',
					type: 'error',
				});
			return;
		}

		const newIndex = type === 'before' ? currentIndex - 1 : currentIndex + 1;
		const newStatuts:
			| 'BACKLOG'
			| 'TODO'
			| 'ON_GOING'
			| 'ON_TEST'
			| 'FINISHED' = possibleStatuts[newIndex];

		const data: iUpdateTaskStatusData = {
			task_id: task.id,
			newStatuts: newStatuts,
		};

		updateStatusQuery.mutate(data);
	};

	const updateStatusQuery = useMutation<
		iUpdateTaskStatusResult,
		Error,
		iUpdateTaskStatusData
	>({
		mutationKey: ['updateStatus'],
		mutationFn: async (data) => updateTaskStatuts(data),
		onSuccess: () => {
			toastStore
				.getState()
				.setToast({ message: 'Statuts mis à jour', type: 'success' });
			refetchTask();
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message:
						'Une erreur est survenue lors de la mise à jour du statuts',
					type: 'error',
				});
		},
	});

	return (
		<DetailButton
			onClick={(e) => handleClick(e)}
			disabled={type === 'before' ? isBeforeDisabled : isAfterDisabled}
			$color={color.secondary}>
			{type === 'before' ? <ArrowBigLeftDash /> : <ArrowBigRightDash />}
		</DetailButton>
	);
};

export default ChangeStatusBtn;
