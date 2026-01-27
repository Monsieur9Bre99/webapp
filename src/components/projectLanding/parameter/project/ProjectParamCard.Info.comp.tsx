import dateFormat from 'dateformat';
import { GridContainer, GridCell } from '../../../../style/global.styledComp';
import {
	ParamCardSubContent,
	ParamCardSubTitle,
	ParamCardText,
} from '../../../../style/paramCard.styledComp';
import { projectDataStore } from '../../../../store/projectDataStore';

const ProjectInfo = () => {
	const { projectInfo } = projectDataStore();

	return (
		<GridContainer
			$gap='2rem'
			$columns='repeat(4, 1fr)'>
			<GridCell
				$align='start'
				$colstart='1'
				$collspan='2'>
				<ParamCardSubContent>
					<ParamCardSubTitle>Nom du projet :</ParamCardSubTitle>
					<ParamCardText>{projectInfo?.title}</ParamCardText>
				</ParamCardSubContent>
			</GridCell>
			<GridCell
				$align='start'
				$colstart='3'>
				<ParamCardSubContent>
					<ParamCardSubTitle>Date de début :</ParamCardSubTitle>
					<ParamCardText>
						{dateFormat(projectInfo?.date_start, 'dd/mm/yyyy')}
					</ParamCardText>
				</ParamCardSubContent>
			</GridCell>
			<GridCell
				$align='start'
				$colstart='4'>
				<ParamCardSubContent>
					<ParamCardSubTitle>Date de fin :</ParamCardSubTitle>
					<ParamCardText>
						{dateFormat(projectInfo?.date_end, 'dd/mm/yyyy')}
					</ParamCardText>
				</ParamCardSubContent>
			</GridCell>
			<GridCell
				$align='start'
				$colstart='1'
				$collspan='4'>
				<ParamCardSubContent>
					<ParamCardSubTitle>Description :</ParamCardSubTitle>
					<ParamCardText>
						{projectInfo?.description ||
							'Aucune description pour le moment.'}
					</ParamCardText>
				</ParamCardSubContent>
			</GridCell>
		</GridContainer>
	);
};

export default ProjectInfo;
