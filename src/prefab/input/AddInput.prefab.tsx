import styled from 'styled-components';
import { breakpoints, color, typography } from '../../style/variable.style';
import { adjustColorBrightness } from '../../utils/colorFunc';
import { Plus } from 'lucide-react';

interface Props {
	id: string;
	label: string;
	placeholder: string;
	value?: string;
	error?: string;
	onChange?: (text: string) => void;
	onClick?: () => void;
}

export const AddInput = ({
	id,
	label,
	placeholder,
	onChange,
	onClick,
	value,
	error,
	...props
}: Props) => {
	return (
		<AddInputContainer>
			<Label htmlFor={id}>{label}</Label>
			<FieldContainer>
				<AddInputField
					onChange={(e) => onChange && onChange(e.target.value)}
					type='text'
					id={id}
					value={value}
					placeholder={placeholder}
					{...props}
				/>
				<AddButton
					onClick={onClick}
					type='button'>
					<Plus />
				</AddButton>
			</FieldContainer>
			{error && <Error>{error}</Error>}
		</AddInputContainer>
	);
};

const AddInputContainer = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
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

const FieldContainer = styled.div`
	display: flex;
	width: 100%;
`;

const AddInputField = styled.input`
	outline: none;
	padding: 0.5rem;
	width: 90%;
	background-color: ${color.light};
	border: 0.2rem solid ${color.primary};
	border-radius: 0.5rem 0 0 0.5rem;

	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.normal};
	color: ${color.dark};

	@media (max-width: ${breakpoints.lg}) {
		width: 92%;
		font-size: ${typography.desktop.s};
	}

	@media (max-width: ${breakpoints.md}) {
		width: 85%;
		font-size: ${typography.mobile.s};
	}

	&::placeholder {
		color: ${color.dark};
		font-family: ${typography.fontPrimary};
		font-size: ${typography.desktop.xs};
		font-weight: ${typography.weight.thin};

		@media (max-width: ${breakpoints.lg}) {
			font-size: ${typography.desktop.xxs};
		}

		@media (max-width: ${breakpoints.md}) {
			font-size: ${typography.mobile.xs};
		}
	}
`;

const AddButton = styled.button`
	background-color: ${color.primary};
	border-radius: 0 0.5rem 0.5rem 0;
	width: 10%;
	svg {
		color: ${color.light};
		width: 3rem;
		height: 3rem;
	}

	&:hover {
		background-color: ${adjustColorBrightness(color.primary, 0.2)};
	}
	&:active {
		background-color: ${adjustColorBrightness(color.primary, 0.4)};
	}

	@media (max-width: ${breakpoints.lg}) {
		width: 8%;
		svg {
			width: 3rem;
			height: 3rem;
		}
	}

	@media (max-width: ${breakpoints.md}) {
		width: 15%;
		svg {
			width: 2.5rem;
			height: 2.5rem;
		}
	}
`;
