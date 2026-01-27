import { useMutation } from '@tanstack/react-query';
import { DetailButton } from './DisplayTaskDetail.comp';
import { Trash2 } from 'lucide-react';
import type {
	iDeleteTaskData,
	iDeleteTaskResult,
} from '../../../service/api_interface/taskApi.interface';
import { deleteTask } from '../../../service/api/task.api';
import { toastStore } from '../../../store/toastStore';
import { modalStore } from '../../../store/modalStore';
import { popupStore } from '../../../store/popupStore';

interface Props {
	taskId: string;
}

const DeleteTaskBtn = ({ taskId }: Props) => {
	const deleteTaskQuery = useMutation<
		iDeleteTaskResult,
		Error,
		iDeleteTaskData
	>({
		mutationKey: ['deleteTask'],
		mutationFn: (data: iDeleteTaskData) => deleteTask(data),
		onSuccess: () => {
			modalStore.getState().closeModal();
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message:
						'Une erreur est survenue lors de la suppression de la tache',
					type: 'error',
				});
		},
	});
	return (
		<DetailButton
			onClick={(e: React.MouseEvent) => {
				e.stopPropagation();
				popupStore
					.getState()
					.setPopup({
						message: 'Etes-vous sur de vouloir supprimer cette tache ?',
						action: () => deleteTaskQuery.mutate({ task_id: taskId }),
					});
			}}>
			<Trash2 />
		</DetailButton>
	);
};

export default DeleteTaskBtn;
