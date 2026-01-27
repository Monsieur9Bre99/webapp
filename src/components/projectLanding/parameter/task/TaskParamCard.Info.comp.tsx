import TaskCategoryContainer from './TaskCategoryContainer.comp';

interface Props {
	isOnUpdate: boolean;
}

const TaskInfo = ({ isOnUpdate }: Props) => {
	return (
		<>
			<TaskCategoryContainer isOnUpdate={isOnUpdate} />
		</>
	);
};

export default TaskInfo;
