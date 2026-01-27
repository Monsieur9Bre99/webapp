import TaskCategoryContainer from './TaskCategoryContainer.comp';

interface Props {
	isOnUpdate: boolean;
}

const TaskUpdate = ({ isOnUpdate }: Props) => {
	return (
		<>
			<TaskCategoryContainer isOnUpdate={isOnUpdate} />
		</>
	);
};

export default TaskUpdate;
