import styled from 'styled-components';
import { color, typography, breakpoints } from '../../style/variable.style';
import { NavLink } from 'react-router-dom';
import { displayStore } from '../../store/displayStore';
import { Kanban, LayoutDashboard, Logs, Settings } from 'lucide-react';
import { projectDataStore } from '../../store/projectDataStore';

const ProjectLandingNavigation = () => {
	const { currentRole } = projectDataStore();
	return (
		<NavBar>
			<Link to={'dashboard'}>
				{displayStore.getState().displayType === 'mobile' ? (
					<LayoutDashboard />
				) : (
					'Dashboard'
				)}
			</Link>
			<Link to={'backlog'}>
				{' '}
				{displayStore.getState().displayType === 'mobile' ? (
					<Logs />
				) : (
					'Backlog'
				)}
			</Link>
			<Link to={'kanban'}>
				{' '}
				{displayStore.getState().displayType === 'mobile' ? (
					<Kanban />
				) : (
					'Kanban'
				)}
			</Link>
			{/* <Link to={'file'}>
				{' '}
				{displayStore.getState().displayType === 'mobile' ? (
					<FileText />
				) : (
					'Document'
				)}
			</Link> */}
			{/* <Link to={'messagerie'}>
				{' '}
				{displayStore.getState().displayType === 'mobile' ? (
					<MessagesSquare />
				) : (
					'Messagerie'
				)}
			</Link> */}
			{(currentRole === 'OWNER' || currentRole === 'ADMIN') && (
				<Link to={'parameter'}>
					{displayStore.getState().displayType === 'mobile' ? (
						<Settings />
					) : (
						'Paramètre'
					)}
				</Link>
			)}
		</NavBar>
	);
};

export default ProjectLandingNavigation;

const NavBar = styled.nav`
	display: flex;
	flex-direction: row;
`;

const Link = styled(NavLink)`
	position: relative;
	margin-right: -0.2rem;
	padding: 0.4rem 1.5rem 0.7rem 1.5rem;
	border-radius: 1rem 1rem 0rem 0rem;
	border: 0.2rem solid ${color.primary};
	border-bottom: none;
	text-decoration: none;
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.m};
	font-weight: ${typography.weight.bold};
	color: ${color.dark};
	@media (max-width: ${breakpoints.lg}) {
		padding: 0.4rem 2rem 0.7rem 2rem;
		font-size: ${typography.desktop.s};
		font-weight: ${typography.weight.normal};
	}

	@media (max-width: ${breakpoints.md}) {
		padding: 0.7rem 1rem 0.2rem 1rem;

		svg {
			color: ${color.dark};
			width: 2.5rem;
			height: 2rem;
		}

		&.active {
			background-color: ${color.primary};
			color: ${color.light};
		}
	}

	cursor: pointer;
	transition: all 0.2s ease;

	@media (min-width: ${breakpoints.md}) {
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 30%;
			transform: scaleY(0);
			transform-origin: bottom;
			background-color: ${color.primary};
			transition: all 0.2s ease;
		}

		&.active::after {
			transform: scaleY(1);
		}
	}
`;
