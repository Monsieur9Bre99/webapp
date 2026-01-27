import ParamCard from '../ParamCard.comp';
import ProjectInfo from './ProjectParamCard.Info.comp';
import ProjectUpdate from './ProjectParamCard.Update.comp';

const ProjectParamCard = () => {
	return (
		<ParamCard
			$form='project-update-form'
			title='Projet'>
			{({ isOnUpdate, setIsOnUpdate }) =>
				!isOnUpdate ? (
					<ProjectInfo />
				) : (
					<ProjectUpdate setIsOnUpdate={setIsOnUpdate} />
				)
			}
		</ParamCard>
	);
};

export default ProjectParamCard;
