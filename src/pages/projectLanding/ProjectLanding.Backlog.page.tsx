import { useEffect, useRef, useState } from 'react';
import CreateTaskForm from '../../components/projectLanding/backlog/CreateTaskForm.comp';
import TaskTable from '../../components/projectLanding/backlog/TaskTable.comp';
import Accordion from '../../prefab/Accordion.prefab';
import Modal from '../../prefab/Modal.prefab';
import Separator from '../../prefab/Separator.prefab';
import { projectDataStore, type iTaskinfo } from '../../store/projectDataStore';
import { MainCentered, SubTitle } from '../../style/global.styledComp';
import { color } from '../../style/variable.style';
import { hexWithAlpha } from '../../utils/colorFunc';
import { modalStore } from '../../store/modalStore';
import DisplayTaskDetail from '../../components/projectLanding/taskDetail/DisplayTaskDetail.comp';
import { useQuery } from '@tanstack/react-query';
import type { iGetTaskByProjectResult } from '../../service/api_interface/taskApi.interface';
import { getTaskByProject } from '../../service/api/task.api';
import { toastStore } from '../../store/toastStore';

const Backlog = () => {
	const firstRender = useRef(true);
	const isOpen = modalStore((state) => state.isOpen);
	const [displayTask, setDisplayTask] = useState<string | null>(null);
	const { currentRole } = projectDataStore();

	const displayTaskDetails = (taskId: string) => {
		setDisplayTask(taskId);
	};

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			refetchTaskList();
		}
	}, []);

	useEffect(() => {
		if (!isOpen) {
			setDisplayTask(null);
			refetchTaskList();
		}
	}, [isOpen]);

	const {
		data: taskList,
		isSuccess,
		isError,
		refetch: refetchTaskList,
	} = useQuery<iGetTaskByProjectResult[] | []>({
		queryKey: ['taskList'],
		queryFn: () => getTaskByProject(),
		enabled: false,
	});

	useEffect(() => {
		if (taskList) {
			projectDataStore.getState().setTasks(taskList as iTaskinfo[]);
		}
	}, [taskList]);

	if (isError) {
		toastStore
			.getState()
			.setToast({
				message: 'impossible de recuperer les taches du projet',
				type: 'error',
			});
	}

	return (
		<MainCentered $direction='column'>
			{(currentRole === 'OWNER' || currentRole === 'ADMIN') && (
				<>
					<Accordion title='Créer une nouvelle tâche'>
						<CreateTaskForm refetchTaskList={refetchTaskList} />
					</Accordion>
					<Separator
						color={[
							hexWithAlpha(color.primary, 0.0),
							hexWithAlpha(color.primary, 1.0),
							hexWithAlpha(color.primary, 0.0),
						]}
						width='50%'
						height='0.4rem'
					/>
				</>
			)}
			{isSuccess ? (
				<TaskTable
					tasks={taskList}
					displayTaskDetails={displayTaskDetails}
				/>
			) : (
				<>
					<SubTitle>Aucune tâche disponible</SubTitle>
				</>
			)}
			<Modal $alignement='end'>
				{isOpen && displayTask && (
					<DisplayTaskDetail taskId={displayTask} />
				)}
			</Modal>
		</MainCentered>
	);
};

export default Backlog;
