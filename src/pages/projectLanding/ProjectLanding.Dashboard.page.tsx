import styled from 'styled-components';
import { breakpoints, color, typography } from '../../style/variable.style';
import { hexToRgba } from '../../utils/colorFunc';
import DashboardProjectCard from '../../components/projectLanding/dashboard/ProjectCard.comp';
import MemberCard from '../../components/projectLanding/dashboard/MemberCard.comp';
import DateContainer from '../../components/projectLanding/dashboard/DateContainer.comp';
import TaskCard from '../../components/projectLanding/dashboard/TaskCard.comp';

const Dashboard = () => {
	return (
		<DashboardGridContainer
			$columns='repeat(12, 1fr)'
			$rows='repeat(6, 1fr)'
			$gap='2rem 2rem'>
			<DashboardGridCell
				$colstart='1'
				$collspan='8'
				$rowstart='1'
				$rowspan='2'>
				<DashboardProjectCard />
			</DashboardGridCell>
			<DashboardGridCell
				$colstart='7'
				$collspan='2'
				$rowstart='3'
				$rowspan='4'>
				<TaskCard />
			</DashboardGridCell>
			<DashboardGridCell
				$colstart='9'
				$collspan='4'
				$rowstart='1'
				$rowspan='2'>
				<MemberCard name='Administrateur' />
			</DashboardGridCell>
			<DashboardGridCell
				$colstart='9'
				$collspan='4'
				$rowstart='3'
				$rowspan='2'>
				<MemberCard name='Collaborateur' />
			</DashboardGridCell>
			<DashboardGridCell
				$colstart='9'
				$collspan='4'
				$rowstart='5'
				$rowspan='2'>
				<MemberCard name='Invité' />
			</DashboardGridCell>
			<DashboardGridCell
				$colstart='1'
				$collspan='3'
				$rowstart='3'>
				<DateContainer title={'debut'} />
			</DashboardGridCell>
			<DashboardGridCell
				$colstart='4'
				$collspan='3'
				$rowstart='3'>
				<DateContainer title={'fin'} />
			</DashboardGridCell>
		</DashboardGridContainer>
	);
};

export default Dashboard;

const DashboardGridContainer = styled.div<{
	$columns: string;
	$rows: string;
	$gap: string;
}>`
	flex: 1;
	display: grid;
	grid-template-columns: ${({ $columns }) => $columns};
	grid-template-rows: ${({ $rows }) => $rows};
	gap: ${({ $gap }) => $gap};
`;

const DashboardGridCell = styled.div<{
	$align?: string;
	$colstart?: string;
	$collspan?: string;
	$rowstart?: string;
	$rowspan?: string;
}>`
	display: grid;
	grid-column: ${({ $colstart }) => $colstart} / span
		${({ $collspan }) => $collspan || '1'};
	grid-row: ${({ $rowstart }) => $rowstart} / span
		${({ $rowspan }) => $rowspan || '1'};

	@media (max-width: ${breakpoints.md}) {
		place-items: center start;
		};
	}
`;

export const DashboardCard = styled.section`
	overflow: hidden;
	display: flex;
	flex-direction: column;
	width: 100%;
	border: 0.3rem solid ${color.primary};
	padding: 1rem;
	border-radius: 1rem;
	box-shadow: 0px 2px 2px 1px ${hexToRgba(color.dark, 0.5)};
`;

export const DashboardTitle = styled.h2`
	font-size: ${typography.desktop.m};
	font-family: ${typography.fontPrimary};
	color: ${color.primary};
	font-weight: ${typography.weight.normal};
`;

export const DashboardSubTitle = styled.h3`
	font-size: ${typography.desktop.s};
	font-family: ${typography.fontSecondary};
	color: ${color.dark};
	font-weight: ${typography.weight.normal};
`;

export const DashboardText = styled.p<{ $align?: string }>`
	text-align: ${({ $align }) => $align || 'left'};
	font-size: ${typography.desktop.s};
	font-family: ${typography.fontSecondary};
	color: ${color.dark};
`;

export const DashboardCardContent = styled.div`
	padding: 0.5rem 0.3rem 1rem 1rem;
	text-align: justify;
	height: 100%;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	/* Standard moderne (Firefox + Chrome 121+) */
	scrollbar-width: thin;
	scrollbar-color: ${color.light} transparent;

	/* Webkit (Chrome/Safari/Edge) */
	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: ${color.light};
	}
`;
