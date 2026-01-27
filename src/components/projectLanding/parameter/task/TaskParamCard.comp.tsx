import ParamCard from '../ParamCard.comp';
import TaskInfo from './TaskParamCard.Info.comp';
import TaskUpdate from './TaskParamCard.Update.comp';

const TaskParamCard = () => {
	return (
		<ParamCard title='Categorie de tâche'>
			{({ isOnUpdate }) =>
				!isOnUpdate ? (
					<TaskInfo isOnUpdate={isOnUpdate} />
				) : (
					<TaskUpdate isOnUpdate={isOnUpdate} />
				)
			}
		</ParamCard>
	);
};

export default TaskParamCard;
