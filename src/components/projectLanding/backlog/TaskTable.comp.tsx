import styled from 'styled-components';
import { breakpoints, color, typography } from '../../../style/variable.style';
import { SubTitle } from '../../../style/global.styledComp';
import { traductePriority, traducteStatus } from '../../../utils/textFunc';
import { adjustColorBrightness, percentColor } from '../../../utils/colorFunc';
import { calculateProgress } from '../../../utils/calculFunc';
import { modalStore } from '../../../store/modalStore';
import type { iGetTaskByProjectResult } from '../../../service/api_interface/taskApi.interface';
import SearchBar from '../../../prefab/SearchBar.prefab';
import { useEffect, useRef, useState } from 'react';
import TaskFilterBtn from '../../TaskFilterBtn.comp';

interface Props {
	tasks: iGetTaskByProjectResult[] | undefined;
	displayTaskDetails: (taskId: string) => void;
}

const TaskTable = ({ tasks, displayTaskDetails }: Props) => {
	const searchBar = useRef<HTMLInputElement | null>(null);
	const [search, setSearch] = useState<string>('');
	const [filteredTasks, setFilteredTasks] = useState<
		iGetTaskByProjectResult[]
	>([]);

	useEffect(() => {
		if (!tasks) return;
		setFilteredTasks(tasks);
	}, [tasks]);

	return (
		<TaskListContainer>
			<TaskListHeader>
				<SubTitle>Liste des tâches</SubTitle>

				<TaskListFilterContainer>
					<TaskFilterBtn
						setFilteredTasks={setFilteredTasks}
						tasks={tasks || []}
						search={search}
						searchBar={searchBar}
					/>

					<SearchBar
						ref={searchBar}
						setSearch={(e) => setSearch(e)}
						placeholder='Rechercher une tâche'
					/>
				</TaskListFilterContainer>
			</TaskListHeader>

			<Table>
				<TableRow $bgColor={adjustColorBrightness(color.primary, 0.3)}>
					<TableCell>
						<TableHeader>Nom de la tâche</TableHeader>
					</TableCell>
					<TableCell>
						<TableHeader>Priorité</TableHeader>
					</TableCell>
					<TableCell>
						<TableHeader>Etat</TableHeader>
					</TableCell>
					<TableCell>
						<TableHeader>Categorie</TableHeader>
					</TableCell>
					<TableCell>
						<TableHeader>Assigné à</TableHeader>
					</TableCell>
					<TableCell>
						<TableHeader>Avancement</TableHeader>
					</TableCell>
				</TableRow>
				{!filteredTasks || filteredTasks.length === 0 ? (
					<TableRow>
						<TableCell $colspan='6'>Aucune tâche disponible</TableCell>
					</TableRow>
				) : (
					filteredTasks.map((task) => (
						<TableRow
							onClick={() => {
								displayTaskDetails(task.id);
								modalStore.getState().openModal();
							}}
							$hoverColor={adjustColorBrightness(color.primary, 0.6)}
							key={task.id}>
							<TableCell>
								<TableText>{task?.title}</TableText>
							</TableCell>
							<TableCell>
								<TableText>
									{traductePriority(task?.priority)}
								</TableText>
							</TableCell>
							<TableCell>
								<TableText>
									{traducteStatus(task?.statuts as string)}
								</TableText>
							</TableCell>
							<TableCell>
								<TableText>
									{task.task_category && task?.task_category.title}
								</TableText>
							</TableCell>
							<TableCell>
								<TableText>
									{task.user_assigned
										&& task?.user_assigned
											.map((user) => user.user.username)
											.join(', ')}
								</TableText>
							</TableCell>
							<TableCell>
								<TableText
									$color={
										percentColor(
											Number(
												task?.subtasks
													&& calculateProgress(
														task?.subtasks.map(
															(subtask) => subtask.is_done,
														),
													),
											),
										) || color.dark
									}>
									{task.subtasks
										&& calculateProgress(
											task?.subtasks.map(
												(subtask) => subtask.is_done,
											),
										)}
									%
								</TableText>
							</TableCell>
						</TableRow>
					))
				)}
			</Table>
		</TaskListContainer>
	);
};

export default TaskTable;

const TaskListContainer = styled.div`
	width: 75%;

	@media (max-width: ${breakpoints.lg}) {
		width: 85%;
	}

	@media (max-width: ${breakpoints.md}) {
		width: 95%;
	}
`;

const TaskListHeader = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const TaskListFilterContainer = styled.div`
	width: 60%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
`;

const Table = styled.div`
	margin: 3rem auto;
`;

const TableRow = styled.section<{ $bgColor?: string; $hoverColor?: string }>`
	background-color: ${({ $bgColor }) => $bgColor || 'transparent'};
	display: grid;
	grid-template-columns: 40% 10% 10% 10% 20% 10%;

	${({ $hoverColor }) =>
		$hoverColor
		&& `
cursor: pointer;

&:hover {
    background-color: ${$hoverColor};`};
`;

const TableCell = styled.div<{ $colspan?: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: -1px;
	grid-column: ${({ $colspan }) => ($colspan ? `span ${$colspan}` : 'auto')};
	padding: 1rem;
	border: 2px solid ${color.secondary};
`;

const TableText = styled.p<{ $color?: string }>`
	font-size: ${typography.desktop.s};
	font-family: ${typography.fontPrimary};
	color: ${({ $color }) => $color || color.dark};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.s};
	}
`;

const TableHeader = styled(TableText)`
	font-weight: bold;
`;
