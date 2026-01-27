import { Outlet, useParams } from 'react-router-dom';
import {
	Main,
	MainCentered,
	MainTitle,
	PageHeader,
} from '../../style/global.styledComp';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProject } from '../../service/api/project.api';
import Loader from '../../prefab/Loader.prefab';
import type { iGetProjectResult } from '../../service/api_interface/projectApi.interface';
import ProjectLandingNavigation from '../../components/projectLanding/ProjectLandingNavigation.prefab';
import styled from 'styled-components';
import { breakpoints, color } from '../../style/variable.style';
import { projectDataStore } from '../../store/projectDataStore';

const ProjectLanding = () => {
	const { project_id } = useParams();

	const {
		data: getProjectQuery,
		isLoading,
		isSuccess,
		isError,
		refetch: refetchProjectData,
	} = useQuery<iGetProjectResult, Error>({
		queryKey: ['project_data'],
		queryFn: () => getProject(),
		staleTime: 300000,
		enabled: false,
	});

	useEffect(() => {
		if (project_id) {
			sessionStorage.setItem('project_id', project_id);
			refetchProjectData();
		}
	}, [project_id]);

	useEffect(() => {
		if (!getProjectQuery) return;
		const projectData = {
			id: getProjectQuery.project.id,
			title: getProjectQuery.project.title,
			description: getProjectQuery.project.description || null,
			date_start: getProjectQuery.project.date_start,
			date_end: getProjectQuery.project.date_end,
		};
		projectDataStore.getState().setProjectInfo(projectData);
		projectDataStore
			.getState()
			.setProjectMembers(getProjectQuery.project.members);
		projectDataStore
			.getState()
			.setTaskCategories(getProjectQuery.project.task_categories);
		projectDataStore.getState().setTasks(getProjectQuery.project.tasks);
	}, [getProjectQuery]);

	if (isLoading) {
		return (
			<MainCentered>
				<Loader />
			</MainCentered>
		);
	}

	if (isError) {
		return (
			<MainCentered>
				<h2>Une erreur est survenue</h2>
			</MainCentered>
		);
	}

	if (isSuccess) {
		return (
			<Main>
				<PageHeaderProjectLanding $pad='0.5rem 1rem 0 0'>
					<ProjectLandingNavigation />
					<MainTitle>{getProjectQuery.project.title}</MainTitle>
				</PageHeaderProjectLanding>
				<ProjectLandingContainer>
					<Outlet />
				</ProjectLandingContainer>
			</Main>
		);
	}
};

export default ProjectLanding;

const PageHeaderProjectLanding = styled(PageHeader)`
	@media (max-width: ${breakpoints.lg}) {
		justify-content: center;
		align-items: center;
		flex-direction: column-reverse;
	}
`;

const ProjectLandingContainer = styled.section`
	flex: 1;
	padding: 2rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: relative;

	&::after {
		position: absolute;
		content: '';
		width: 100%;
		height: 1rem;
		top: -0.3rem;
		left: 0;
		background-color: ${color.primary};
	}
`;
