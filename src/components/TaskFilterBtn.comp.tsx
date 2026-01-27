import gsap from 'gsap';
import Button from '../prefab/Button.prefab';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { projectDataStore } from '../store/projectDataStore';
import FilterListItem from './FilterListItem.comp';
import { ListRestart } from 'lucide-react';
import { filterTasks, resetFilter } from '../utils/filterFunc';
import type { iGetTaskByProjectResult } from '../service/api_interface/taskApi.interface';

interface Props {
	setFilteredTasks: React.Dispatch<
		React.SetStateAction<iGetTaskByProjectResult[]>
	>;
	tasks: iGetTaskByProjectResult[];
	search?: string;
	searchBar?: React.RefObject<HTMLInputElement | null>;
}

export interface iActiveFilter {
	search: string | null;
	priority: string | null;
	statuts: string | null;
	category: string | null;
	user: string | null;
}

export interface iFilter {
	label: string;
	value: string | null;
}

const TaskFilterBtn = ({
	setFilteredTasks,
	tasks,
	search,
	searchBar,
}: Props) => {
	const [activeFilter, setActiveFilter] = useState<iActiveFilter>({
		search: null,
		priority: null,
		statuts: null,
		category: null,
		user: null,
	});
	const { taskCategories, projectMembers } = projectDataStore();
	const [users, setUsers] = useState<iFilter[]>([]);
	const [categories, setCategories] = useState<iFilter[]>([]);

	const toggleFilterList = (
		e: React.MouseEvent,
		name: 'priority' | 'statuts' | 'category' | 'user',
		open: boolean,
	) => {
		e.stopPropagation();

		if (open === false) {
			gsap.to(`#${name}`, { scale: 0, autoAlpha: 0, duration: 0.3 });
			return;
		}

		if (open === true) {
			gsap.to(`#${name}`, { scale: 1, autoAlpha: 1, duration: 0.3 });
			return;
		}
	};

	useEffect(() => {
		if (!projectMembers || !taskCategories) return;

		const members = [...projectMembers.admin, ...projectMembers.collab].map(
			(member) => {
				return { label: `${member.username}`, value: member.id };
			},
		);

		const categoriesList = taskCategories.map((category) => {
			return { label: `${category.title}`, value: category.id };
		});

		setUsers([{ label: 'tous', value: null }, ...members]);
		setCategories([{ label: 'tous', value: null }, ...categoriesList]);
	}, [projectMembers, taskCategories]);

	useEffect(() => {
		if (!search) return;
		setActiveFilter({ ...activeFilter, search: search || null });
	}, [search]);

	useEffect(() => {
		if (search && searchBar) {
			if (activeFilter.search === null) {
				searchBar.current!.value = '';
			}
		}

		setFilteredTasks(filterTasks(activeFilter, tasks));
	}, [activeFilter]);

	return (
		<>
			{activeFilter
				&& Object.values(activeFilter).some((value) => value !== null)
					!== false && (
					<Wrapper>
						<Button
							onClick={() =>
								setActiveFilter(resetFilter(activeFilter as any) as any)
							}
							type='button'
							text={<ListRestart />}
						/>
					</Wrapper>
				)}

			<Wrapper
				onMouseLeave={(e) => toggleFilterList(e, 'priority', false)}
				onMouseEnter={(e) => toggleFilterList(e, 'priority', true)}>
				<Button
					type='button'
					text={'priorité'}
				/>
				<FilterListItem
					id='priority'
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					data={[
						{ label: 'tous', value: null },
						{ label: 'basse', value: 'LOW' },
						{ label: 'moyenne', value: 'MEDIUM' },
						{ label: 'haute', value: 'HIGH' },
					]}
				/>
			</Wrapper>

			<Wrapper
				onMouseLeave={(e) => toggleFilterList(e, 'statuts', false)}
				onMouseEnter={(e) => toggleFilterList(e, 'statuts', true)}>
				<Button
					type='button'
					text={'état'}
				/>
				<FilterListItem
					id='statuts'
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					data={[
						{ label: 'tous', value: null },
						{ label: 'en attente', value: 'BACKLOG' },
						{ label: 'à faire', value: 'TODO' },
						{ label: 'en cours', value: 'ON_GOING' },
						{ label: 'à tester', value: 'ON_TEST' },
						{ label: 'terminé', value: 'FINISHED' },
					]}
				/>
			</Wrapper>

			<Wrapper
				onMouseLeave={(e) => toggleFilterList(e, 'category', false)}
				onMouseEnter={(e) => toggleFilterList(e, 'category', true)}>
				<Button
					type='button'
					text={'catégorie'}
				/>
				<FilterListItem
					id='category'
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					data={categories}
				/>
			</Wrapper>

			<Wrapper
				onMouseLeave={(e) => toggleFilterList(e, 'user', false)}
				onMouseEnter={(e) => toggleFilterList(e, 'user', true)}>
				<Button
					type='button'
					text={'utilisateur'}
				/>
				<FilterListItem
					id='user'
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					data={users}
				/>
			</Wrapper>
		</>
	);
};

export default TaskFilterBtn;

const Wrapper = styled.div`
	width: max-content;
	position: relative;
`;
