import {
	DashboardCard,
	DashboardCardContent,
	DashboardSubTitle,
	DashboardText,
	DashboardTitle,
} from '../../../pages/projectLanding/ProjectLanding.Dashboard.page';
import { projectDataStore } from '../../../store/projectDataStore';

const TaskCard = () => {
	const { tasks } = projectDataStore();

	if (!tasks) return null;

	const taskCount = tasks?.length;
	const backlogTasks = tasks?.filter(
		(task) => task.statuts === 'BACKLOG',
	).length;
	const todoTasks = tasks?.filter((task) => task.statuts === 'TODO').length;
	const onGoingTasks = tasks?.filter(
		(task) => task.statuts === 'ON_GOING',
	).length;
	const onTestTasks = tasks?.filter(
		(task) => task.statuts === 'ON_TEST',
	).length;
	const finishedTasks = tasks?.filter(
		(task) => task.statuts === 'FINISHED',
	).length;
	const percentage = Math.round((finishedTasks / taskCount) * 100);

	return (
		<DashboardCard>
			<DashboardTitle>Taches :</DashboardTitle>
			<DashboardCardContent style={{ gap: '1.2rem', marginTop: '1.4rem' }}>
				<div>
					<DashboardSubTitle>Total :</DashboardSubTitle>
					<DashboardText $align='right'>{taskCount}</DashboardText>
				</div>

				<div>
					<DashboardSubTitle>En attente :</DashboardSubTitle>
					<DashboardText $align='right'>{`${backlogTasks} / ${taskCount}`}</DashboardText>
				</div>

				<div>
					<DashboardSubTitle>A faire :</DashboardSubTitle>
					<DashboardText $align='right'>{`${todoTasks} / ${taskCount}`}</DashboardText>
				</div>

				<div>
					<DashboardSubTitle>En cours :</DashboardSubTitle>
					<DashboardText $align='right'>{`${onGoingTasks} / ${taskCount}`}</DashboardText>
				</div>

				<div>
					<DashboardSubTitle>A tester :</DashboardSubTitle>
					<DashboardText $align='right'>{`${onTestTasks} / ${taskCount}`}</DashboardText>
				</div>

				<div>
					<DashboardSubTitle>Terminer :</DashboardSubTitle>
					<DashboardText $align='right'>{`${finishedTasks} / ${taskCount}`}</DashboardText>
				</div>

				<div>
					<DashboardSubTitle>Avancement :</DashboardSubTitle>
					<DashboardText $align='right'>{`${percentage}%`}</DashboardText>
				</div>
			</DashboardCardContent>
		</DashboardCard>
	);
};

export default TaskCard;
