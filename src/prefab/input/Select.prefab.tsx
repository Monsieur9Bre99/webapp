import styled from 'styled-components';
import { breakpoints, color, typography } from '../../style/variable.style';
import { hexToRgba } from '../../utils/colorFunc';
import { useState } from 'react';

interface Props {
	id: string;
	type?: string;
	label: string;
	placeholder?: string;
	error?: string;
	labelHidden?: boolean;
	options: { value: string; label: string }[];
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({
	id,
	label,
	error,
	labelHidden,
	options,
	value,
	onChange,
	...props
}: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<SelectorWrapper
			onClick={(e) => {
				e.stopPropagation();
				setIsOpen(!isOpen);
			}}
			className={`${isOpen ? 'isOpen' : ''} ${
				!labelHidden ? 'notHide' : ''
			}`}>
			<SelectLabel
				htmlFor={id}
				$labelHidden={labelHidden}>
				{label}
			</SelectLabel>
			<Selector
				value={value}
				onChange={onChange}
				{...props}
				id={id}>
				{options &&
					options.map((option) => (
						<option
							key={option.value}
							value={option.value}>
							{option.label}
						</option>
					))}
			</Selector>
			{error && <Error>{error}</Error>}
		</SelectorWrapper>
	);
};

const SelectorWrapper = styled.section`
	width: 100%;

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

	&.notHide {
		&::after {
			top: 75%;
		}
	}

	&.isOpen::after {
		transform: translateY(-50%) rotate(180deg);
	}
`;

const SelectLabel = styled.label<{
	$isReversed?: boolean;
	$labelHidden?: boolean;
}>`
	width: 100%;
	text-align: ${({ $isReversed }) => ($isReversed ? 'right' : 'left')};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.m};
	font-weight: ${typography.weight.normal};
	color: ${color.primary};

	@media (max-width: ${breakpoints.lg}) {
		font-size: ${typography.desktop.xs};
	}

	@media (max-width: ${breakpoints.md}) {
		text-align: left;
		font-size: ${typography.mobile.s};
	}

	display: ${({ $labelHidden }) => ($labelHidden ? 'none' : 'block')};
`;

const Error = styled.span<{ $isReversed?: boolean }>`
	width: 100%;
	text-align: ${({ $isReversed }) => ($isReversed ? 'right' : 'left')};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xxs};
	font-weight: ${typography.weight.normal};
	color: ${color.error};

	@media (max-width: ${breakpoints.lg}) {
		font-size: ${typography.mobile.xxs};
	}
`;

const Selector = styled.select`
	margin-top: 0.2rem;
	outline: none;
	width: 100%;
	padding: 0.5rem;
	border: none;
	border-top: 0.2rem solid tansparent;
	border-bottom: 0.2rem solid ${color.primary};
	background-color: ${color.light};

	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.normal};
	color: ${color.dark};

	&:focus {
		outline: none;
		box-shadow: 0px 1px 1px 1px ${hexToRgba(color.dark, 0.1)} inset;
	}

	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
`;
