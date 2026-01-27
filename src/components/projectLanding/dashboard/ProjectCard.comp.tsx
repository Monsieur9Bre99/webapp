import {
	DashboardCard,
	DashboardCardContent,
	DashboardText,
	DashboardTitle,
} from '../../../pages/projectLanding/ProjectLanding.Dashboard.page';
import { projectDataStore } from '../../../store/projectDataStore';

const DashboardProjectCard = () => {
	const { projectInfo } = projectDataStore();

	return (
		<DashboardCard>
			<DashboardTitle>Description :</DashboardTitle>
			<DashboardCardContent>
				<DashboardText>
					{projectInfo?.description
						|| 'Aucune déscription disponible pour ce projet'}
				</DashboardText>
			</DashboardCardContent>
		</DashboardCard>
	);
};

export default DashboardProjectCard;
