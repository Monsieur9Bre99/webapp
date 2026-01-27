import styled from 'styled-components';
import { color, typography } from '../style/variable.style';
import { adjustColorBrightness, hexToRgba } from '../utils/colorFunc';
import type { iActiveFilter, iFilter } from './TaskFilterBtn.comp';

interface Props {
	id: string;
	activeFilter: iActiveFilter;
	setActiveFilter: (activeFilter: iActiveFilter) => void;
	data: iFilter[];
}

const FilterListItem = ({ id, activeFilter, setActiveFilter, data }: Props) => {
	const clickOnFilter = (
		e: React.MouseEvent,
		filter: string,
		value: string | null,
	) => {
		e.stopPropagation();

		let currentFilter = { ...activeFilter };

		switch (filter) {
			case 'priority':
				currentFilter.priority = value;
				break;
			case 'statuts':
				currentFilter.statuts = value;
				break;
			case 'category':
				currentFilter.category = value;
				break;
			case 'user':
				currentFilter.user = value;
				break;
		}

		setActiveFilter(currentFilter);
	};

	return (
		<FilterList id={id}>
			{data.map((item) => (
				<ListItem
					key={item.value}
					className={
						activeFilter[id as keyof iActiveFilter] === item.value
							? 'active'
							: ''
					}
					onClick={(e) => clickOnFilter(e, id, item.value)}>
					{item.label}
				</ListItem>
			))}
		</FilterList>
	);
};

export default FilterListItem;

const FilterList = styled.ul`
	z-index: 99;
	overflow: hidden;
	border-radius: 0.5rem;
	position: absolute;
	top: 100%;
	left: 50%;

	transform: translateX(-50%) scale(0, 0);
	transform-origin: top center;
	width: max-content;

	border: 0.2rem solid ${color.secondary};

	list-style: none;
	background-color: ${color.light};
	font-family: ${typography.fontPrimary};
	box-shadow: 0px 3px 3px 1px ${hexToRgba(color.dark, 0.5)};
`;

const ListItem = styled.li`
	width: 100%;
	cursor: pointer;
	text-align: center;
	padding: 0.3rem 1.5rem;
	color: ${color.dark};

	&:hover {
		background-color: ${adjustColorBrightness(color.secondary, 0.5)};
	}

	&.active {
		background-color: ${color.secondary};
		color: ${color.light};
	}
`;
