import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from '@dnd-kit/core';
import Ticket from '../../components/projectLanding/kanban/Ticket.comp';
import Column from '../../components/projectLanding/kanban/Column.comp';
import styled from 'styled-components';
import { color } from '../../style/variable.style';
import { projectDataStore, type iTaskinfo } from '../../store/projectDataStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	getTaskByProject,
	updateTaskStatuts,
} from '../../service/api/task.api';
import type {
	iGetTaskByProjectResult,
	iUpdateTaskStatusData,
	iUpdateTaskStatusResult,
} from '../../service/api_interface/taskApi.interface';
import { toastStore } from '../../store/toastStore';
import { useEffect, useState } from 'react';
import DisplayTaskDetail from '../../components/projectLanding/taskDetail/DisplayTaskDetail.comp';
import Modal from '../../prefab/Modal.prefab';
import { modalStore } from '../../store/modalStore';
import { checkWeekfromDate } from '../../utils/calculFunc';
import TaskFilterBtn from '../../components/TaskFilterBtn.comp';

const Kanban = () => {
	const sensors = useSensors(
		useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
		useSensor(TouchSensor, {
			activationConstraint: { delay: 250, tolerance: 5 },
		}),
	);

	const isOpen = modalStore((state) => state.isOpen);
	const [filteredTasks, setFilteredTasks] = useState<
		iGetTaskByProjectResult[]
	>([]);
	const [displayTask, setDisplayTask] = useState<string | null>(null);
	const { setTasks } = projectDataStore();
	const containers = [
		{ id: 'TODO', title: 'A faire' },
		{ id: 'ON_GOING', title: 'En cours' },
		{ id: 'ON_TEST', title: 'A tester' },
		{ id: 'FINISHED', title: 'Terminer' },
	];

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over || !active) return;

		const currentStatus = active.data.current?.type;

		if (currentStatus === over.id) return;

		if (currentStatus === 'FINISHED') return;

		const allStatus = ['TODO', 'ON_GOING', 'ON_TEST', 'FINISHED'];
		const previousStatus =
			currentStatus === 'TODO'
				? 'TODO'
				: allStatus[allStatus.indexOf(currentStatus) - 1];
		const nextStatus =
			currentStatus === 'FINISHED'
				? 'FINISHED'
				: allStatus[allStatus.indexOf(currentStatus) + 1];

		if (over && (over.id === previousStatus || over.id === nextStatus)) {
			updateStatusQuery.mutate({
				task_id: active.id as string,
				newStatuts: over.id as
					| 'BACKLOG'
					| 'TODO'
					| 'ON_GOING'
					| 'ON_TEST'
					| 'FINISHED',
			});
		}
	};

	const {
		data: taskList,
		isSuccess: taskListSuccess,
		refetch: refetchTaskList,
	} = useQuery<iGetTaskByProjectResult[]>({
		queryKey: ['taskList'],
		queryFn: () => getTaskByProject(),
		enabled: false,
	});

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
			refetchTaskList();
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message: `Une erreur est survenue lors de la mise à jour du statuts`,
					type: 'error',
				});
		},
	});

	useEffect(() => {
		if (!taskList) return;

		setTasks(taskList as iTaskinfo[]);
		setFilteredTasks(taskList);
	}, [taskList, taskListSuccess]);

	useEffect(() => {
		if (!isOpen) {
			setDisplayTask(null);
			refetchTaskList();
		}
	}, [isOpen]);

	return (
		<>
			<FilterContainer>
				<TaskFilterBtn
					setFilteredTasks={setFilteredTasks}
					tasks={taskList || []}
				/>
			</FilterContainer>
			<KanbanContainer>
				<DndContext
					sensors={sensors}
					onDragEnd={handleDragEnd}>
					{containers.map((container) => (
						<Column
							key={container.id}
							id={container.id}
							title={container.title}>
							{filteredTasks
							&& filteredTasks?.filter(
								(task) => task.statuts === container.id,
							).length > 0
								? filteredTasks
										.filter(
											(task) =>
												task.statuts === container.id
												&& ((task.date_end
													&& checkWeekfromDate(
														new Date(task.date_end),
													))
													|| !task.date_end),
										)
										.map((task) => (
											<Ticket
												setDisplayTask={setDisplayTask}
												task={task as iTaskinfo}
												key={task.id}
											/>
										))
								: `Aucune tâche ${container.title.toLowerCase()}`}
						</Column>
					))}
				</DndContext>

				<Modal $alignement='end'>
					{isOpen && displayTask && (
						<DisplayTaskDetail taskId={displayTask} />
					)}
				</Modal>
			</KanbanContainer>
		</>
	);
};

export default Kanban;

const FilterContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	margin: 1rem 0;
`;

const KanbanContainer = styled.section`
	margin: 3rem auto;
	padding: 0.2rem 0.1rem;
	background-color: ${color.primary};
	width: 90%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
`;
