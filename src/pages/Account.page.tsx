import { useEffect, useRef, useState } from 'react';
import {
	FilterContainer,
	GridContainer,
	Main,
	MainCentered,
	MainTitle,
	PageHeader,
} from '../style/global.styledComp';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../service/api/user.api';
import ProjectCard from '../components/userLanding/ProjectCard.comp';
import CreateBtn from '../components/userLanding/CreateBtn.comp';
import Loader from '../prefab/Loader.prefab';
import Modal from '../prefab/Modal.prefab';
import CreateProjectForm from '../components/userLanding/CreateProjectForm.comp';
import SearchBar from '../prefab/SearchBar.prefab';
import FilterSelecter from '../prefab/FilterSelecter.prefab';
import { projectDataStore } from '../store/projectDataStore';

interface project {
	role: 'OWNER' | 'ADMIN' | 'COLLAB' | 'GUEST';
	project: {
		id: string;
		title: string;
		description?: string | null;
		date_start: Date;
		date_end: Date;
	};
}

const Account = () => {
	const options = [
		{ value: 'all', label: 'Tous les rôles' },
		{ value: 'OWNER', label: 'propritaire' },
		{ value: 'ADMIN', label: 'administrateur' },
		{ value: 'COLLAB', label: 'collaborateur' },
		{ value: 'GUEST', label: 'invité' },
	];
	const [filter, setFilter] = useState<string>('all');
	const [searchedTitle, setSearchedTitle] = useState<string>('');
	const [projectList, setProjectList] = useState<project[] | null>(null);
	const {
		data: userProjectList,
		isLoading,
		isError,
		isSuccess,
		refetch: refetchProjectList,
	} = useQuery({
		queryKey: ['userProjectList'],
		queryFn: () => getUser(),
		enabled: false,
	});
	const firstRender = useRef<boolean>(true);

	useEffect(() => {
		projectDataStore.getState().reset();
		sessionStorage.removeItem('project_id');
		if (!firstRender.current) return;
		firstRender.current = false;
		refetchProjectList();
	}, []);

	useEffect(() => {
		if (!userProjectList) return;

		let filtered = userProjectList.projects;

		if (searchedTitle.length > 0) {
			const lower = searchedTitle.toLowerCase();
			filtered = filtered.filter((project) =>
				project.project.title.toLowerCase().includes(lower),
			);
		}

		if (filter !== 'all') {
			filtered = filtered.filter((project) => project.role === filter);
		}

		setProjectList(filtered);
	}, [searchedTitle, userProjectList, filter]);

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
				<PageHeader>
					<MainTitle>{`${userProjectList.firstname} ${userProjectList.lastname}`}</MainTitle>
					<FilterContainer>
						<FilterSelecter
							options={options}
							setFilter={setFilter}
						/>
						<SearchBar
							setSearch={setSearchedTitle}
							placeholder='Rechercher par titre'
						/>
					</FilterContainer>
				</PageHeader>
				<GridContainer
					$columns='repeat(2, 1fr)'
					$gap='3rem 1rem'>
					{projectList?.map((project) => (
						<ProjectCard
							key={project.project.id}
							refetchProjectList={refetchProjectList}
							role={project.role}
							project={project.project}
						/>
					))}
					<CreateBtn />
				</GridContainer>
				<Modal>
					<CreateProjectForm refetchProjectsList={refetchProjectList} />
				</Modal>
			</Main>
		);
	}
};

export default Account;
