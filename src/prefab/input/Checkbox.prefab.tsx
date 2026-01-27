import styled from 'styled-components';
import { breakpoints, color, typography } from '../../style/variable.style';
import { hexToRgba } from '../../utils/colorFunc';

interface Props {
	id: string;
	label: string;
	$isReversed?: boolean;
	error?: string;
}

export const Checkbox = ({
	id,
	label,
	$isReversed = false,
	error,
	...props
}: Props) => {
	return (
		<CheckboxContainer $isReversed={$isReversed}>
			<CheckboxBlock $isReversed={$isReversed}>
				<CheckboxField
					id={id}
					type='checkbox'
					{...props}
				/>
				<Label
					$isReversed={$isReversed}
					htmlFor={id}>
					{label}
				</Label>
			</CheckboxBlock>
			{error && <Error $isReversed={$isReversed}>{error}</Error>}
		</CheckboxContainer>
	);
};

const CheckboxContainer = styled.div<{ $isReversed?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: stretch;
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

const CheckboxBlock = styled.div<{ $isReversed?: boolean }>`
	display: flex;
	flex-direction: ${({ $isReversed }) =>
		$isReversed ? 'row-reverse' : 'row'};
	align-items: center;
	gap: 1rem;

	@media (max-width: ${breakpoints.md}) {
		flex-direction: row;
	}
`;

const CheckboxField = styled.input`
	margin-top: 0.2rem;
	padding: 0.5rem;

	&:focus {
		outline: none;
		box-shadow: 0px 1px 1px 1px ${hexToRgba(color.dark, 0.1)} inset;
	}

	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;

	width: 20px;
	height: 20px;
	border: 2px solid ${color.primary};
	border-radius: 4px;
	background: ${color.light};
	cursor: pointer;
	transition: all 0.2s ease;

	&:checked {
		background: ${color.primary};
		outline: 2px solid ${hexToRgba(color.primary, 0.75)};
		position: relative;
	}

	&:checked::after {
		content: '';
		position: absolute;
		top: 3px;
		left: 6px;
		width: 5px;
		height: 10px;
		border-right: 2px solid ${color.light};
		border-bottom: 2px solid ${color.light};
		transform: rotate(45deg);
	}

	&:hover {
		box-shadow: 0 0 4px ${hexToRgba(color.primary, 0.4)};
	}
`;
