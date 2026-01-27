import styled from 'styled-components';
import { breakpoints, color, typography } from '../../style/variable.style';
import { hexToRgba } from '../../utils/colorFunc';

interface Props {
	id: string;
	type?: string;
	label: string;
	placeholder?: string;
	error?: string;
	value?: string;
}

export const DateInput = ({ id, label, error, value, ...props }: Props) => {
	return (
		<InputContainer>
			<Label htmlFor={id}>{label}</Label>
			<DateField
				id={id}
				value={value}
				type='date'
				{...props}
			/>
			{error && <Error>{error}</Error>}
		</InputContainer>
	);
};

const InputContainer = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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

const DateField = styled.input`
	outline: none;
	width: 100%;
	padding: 0.5rem;
	border: none;
	border-bottom: 0.2rem solid ${color.primary};
	background-color: ${color.light};

	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.thin};
	color: ${color.dark};

	@media (max-width: ${breakpoints.lg}) {
		font-size: ${typography.desktop.s};
	}

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.s};
	}

	&::-webkit-calendar-picker-indicator {
		cursor: pointer;
		width: 2.5rem;
		color: ${color.primary};
		filter: invert(54%) sepia(93%) saturate(651%) hue-rotate(6deg)
			brightness(90%) contrast(101%);
	}
	&:focus {
		outline: none;
		box-shadow: 0px 1px 1px 1px ${hexToRgba(color.dark, 0.1)} inset;
	}
`;
