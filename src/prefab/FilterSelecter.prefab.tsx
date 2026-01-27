import styled from 'styled-components';
import { color, typography } from '../style/variable.style';
import { useState } from 'react';
import { hexToRgba } from '../utils/colorFunc';

interface Props {
	options: { value: string; label: string }[];
	setFilter: (filter: string) => void;
}

const FilterSelecter = ({ options, setFilter }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter(`${e.target.value}`);
	};

	return (
		<SelectorWrapper
			onClick={() => setIsOpen(!isOpen)}
			className={isOpen ? 'isOpen' : ''}>
			<Selector
				onChange={(e) => handleChange(e)}
				name='filter'
				id='filter'>
				{options.map((option) => (
					<SelectorOption
						key={`${option.value}`}
						value={option.value}>
						{option.label}
					</SelectorOption>
				))}
			</Selector>
		</SelectorWrapper>
	);
};

export default FilterSelecter;

const SelectorWrapper = styled.div`
	position: relative;
	display: inline-block;
	
	&::after {
		content: '';
		position: absolute;
		top: 50%;
		right: 0.75rem;
		width: 0;
		height: 0;
		border-left: 0.9rem solid transparent;
		border-right: 0.9rem solid transparent;
		border-top: 0.8rem solid ${color.primary};
		transform: translateY(-50%);
		pointer-events: none;
		transition: transform 0.2s ease;
	}
	
	&.isOpen::after {
		transform: translateY(-50%) rotate(180deg);
	}
	`;
	
	const Selector = styled.select`
	box-shadow: 0px 3px 2px 1px ${hexToRgba(color.dark, 0.5)};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.thin};
	color: ${color.dark};
	background-color: ${color.light};
	border: 0.2rem solid ${color.primary};
	border-radius: 0.5rem;
	padding: 0.7rem 2.5rem 0.7rem 1rem;
	cursor: pointer;

	&:focus {
		outline: none;
	}

	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
`;

const SelectorOption = styled.option`
	background-color: ${color.light};
	color: ${color.dark};
	font-weight: ${typography.weight.thin};
`;
