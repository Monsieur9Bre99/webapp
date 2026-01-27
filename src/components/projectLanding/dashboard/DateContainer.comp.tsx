import dateFormat from 'dateformat';
import {
	DashboardCard,
	DashboardText,
	DashboardTitle,
} from '../../../pages/projectLanding/ProjectLanding.Dashboard.page';
import { projectDataStore } from '../../../store/projectDataStore';

interface Props {
	title: string;
}

const DateContainer = ({ title }: Props) => {
	const { projectInfo } = projectDataStore();

	const date =
		title === 'debut' ? projectInfo?.date_start : projectInfo?.date_end;

	return (
		<DashboardCard
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-around',
			}}>
			<DashboardTitle>{`Date de ${title} :`}</DashboardTitle>
			<DashboardText>
				{dateFormat(date, 'dd/mm/yyyy')}
			</DashboardText>
		</DashboardCard>
	);
};

export default DateContainer;
