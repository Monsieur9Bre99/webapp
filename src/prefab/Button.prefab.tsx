import styled from 'styled-components';
import { breakpoints, color, typography } from '../style/variable.style';
import { adjustColorBrightness, hexToRgba } from '../utils/colorFunc';

interface Props {
	onClick?: (param?: any) => any;
	classname?: 'fill' | 'outline';
	type?: 'button' | 'reset' | 'submit';
	text: string | React.ReactNode;
	disabled?: boolean;
	colors?: {
		$textColor?: string;
		$backgroundColor?: string;
		$borderColor?: string;
	};
}

const Button = ({
	onClick,
	classname,
	type,
	text,
	disabled,
	colors,
}: Props) => {
	return (
		<Btn
			onClick={onClick}
			className={classname || 'fill'}
			type={type || 'button'}
			$textColor={colors?.$textColor || color.light}
			disabled={disabled || false}
			$backgroundColor={colors?.$backgroundColor || color.primary}
			$borderColor={colors?.$borderColor || color.primary}>
			{text}
		</Btn>
	);
};

export default Button;

const Btn = styled.button<{
	$textColor: string;
	$backgroundColor: string;
	$borderColor: string;
}>`
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};

	font-weight: ${typography.weight.normal};
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	border: 0.2rem solid ${({ $borderColor }) => $borderColor || color.primary};
	box-shadow: 0px 3px 2px 1px ${hexToRgba(color.dark, 0.5)};

	&:active {
		${({ $backgroundColor }) =>
			$backgroundColor
			&& `
      background-color: ${adjustColorBrightness($backgroundColor, -0.1)};
    `}
		${({ $borderColor }) =>
			$borderColor
			&& `
      border-color: ${adjustColorBrightness($borderColor, -0.1)};
    `}
    
		box-shadow: 0px 2px 2px 1px ${hexToRgba(color.dark, 0.5)};
	}

	svg {
		margin-bottom: -0.4rem;
		width: 2rem;
		height: 2rem;
	}

	transition: all 0.2s ease;

	@media (max-width: ${breakpoints.lg}) {
		font-size: ${typography.desktop.xs};
	}

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.s};
	}

	&.fill {
		background-color: ${({ $backgroundColor }) =>
			$backgroundColor || color.primary};
		color: ${({ $textColor }) => $textColor || color.light};

		&:hover {
			background-color: ${({ $backgroundColor }) =>
				adjustColorBrightness($backgroundColor, 0.2)};
		}
	}

	&.outline {
		background-color: ${color.light};
		color: ${({ $textColor }) => $textColor || color.primary};

		&:hover {
			background-color: ${({ $backgroundColor }) =>
				$backgroundColor || color.primary};
			color: ${color.light};
		}
	}

	&:disabled {
		opacity: 0.75;
		cursor: not-allowed;
	}
`;
