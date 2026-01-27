import styled from 'styled-components';
import { breakpoints, color, typography } from '../../style/variable.style';
import { hexToRgba } from '../../utils/colorFunc';
import { useState } from 'react';

interface Props {
	title: string;
	DataCheckbox: { value: string; label: string; checked: boolean }[];
	error?: string;
	setCheckbox: (value: string) => void;
}

export const SelectCheckbox = ({
	title,
	DataCheckbox,
	setCheckbox,
	error,
}: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<>
			<SelectCheckboxWrapper
				className={isOpen ? 'isOpen' : ''}
				onClick={(e) => {
					if (e.target !== e.currentTarget) return;
					e.preventDefault();
					setIsOpen(!isOpen);
				}}>
				<Label onClick={() => setIsOpen(!isOpen)}>{title}</Label>
				{isOpen && (
					<SelectCheckboxContainer>
						{DataCheckbox.map((Data) => (
							<SelectCheckboxDiv key={Data.value}>
								<SelectCheckboxField
									onChange={() => setCheckbox(Data.value)}
									checked={Data.checked}
									id={Data.value}
									value={Data.value}
									type='checkbox'
								/>
								<SelectCheckboxLabel htmlFor={Data.value}>
									{Data.label}
								</SelectCheckboxLabel>
							</SelectCheckboxDiv>
						))}
					</SelectCheckboxContainer>
				)}
			</SelectCheckboxWrapper>
			{error && <Error>{error}</Error>}
		</>
	);
};

const SelectCheckboxWrapper = styled.section`
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

	z-index: 0;
	position: relative;
	border-bottom: 0.2rem solid ${color.primary};
	padding: 0.5rem;
`;

const Label = styled.label<{ $isReversed?: boolean }>`
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

const SelectCheckboxContainer = styled.ul`
	z-index: 99;
	position: absolute;
	left: 50%;
	top: 100%;
	border-top: none;
	border: 0.2rem solid ${color.primary};
	border-radius: 0 0 0.5rem 0.5rem;
	padding: 0.5rem 1rem;
	height: fit-content;
	width: 100%;
	background-color: ${color.light};
	transform: translateX(-50%) scaleY(1);
	transform-origin: top center;

	SelectCheckboxField:checked {
		text-decoration: line-through;
	}
`;

const SelectCheckboxDiv = styled.li`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const SelectCheckboxField = styled.input`
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;

	width: 1.6rem;
	height: 1.6rem;
	border: 2px solid ${color.primary};
	border-radius: 4px;
	background: ${color.light};
	cursor: pointer;
	transition: all 0.2s ease;

	&:checked {
		background: ${color.primary};
		outline: 0.2rem solid ${hexToRgba(color.primary, 0.75)};
		position: relative;
	}

	&:checked::after {
		content: '';
		position: absolute;
		top: 1px;
		left: 4px;
		width: 0.5rem;
		height: 1rem;
		border-right: 0.2rem solid ${color.light};
		border-bottom: 0.2rem solid ${color.light};
		transform: rotate(45deg);
	}

	&:hover {
		box-shadow: 0 0 4px ${hexToRgba(color.primary, 0.4)};
	}
`;

const SelectCheckboxLabel = styled.label`
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.thin};
	color: ${color.dark};
`;
