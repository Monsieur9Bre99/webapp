import { ArrowRight } from 'lucide-react';
import styled, { css } from 'styled-components';

export const BurgerIcon = styled.div<{ color: string }>`
	position: relative;
	width: 2.2rem;
	height: 0.3rem;
	background-color: ${({ color }) => color};
	transition: all 0.3s ease-in-out;

	&::before,
	&::after {
		content: '';
		position: absolute;
		width: 75%;
		transform-origin: center;
		height: 0.3rem;
		left: 50%;
		transform: translateX(-50%);
		background-color: ${({ color }) => color};
		transition: all 0.3s ease-in-out;
	}

	&::before {
		top: -0.7rem;
	}

	&::after {
		top: 0.7rem;
	}
	}

	&.active {
		background-color: transparent;

		&::before,
		&::after {
			left: 0;
			width: 100%;
			top: 0;
		}

		&::before {
			transform: rotate(45deg);
		}

		&::after {
			transform: rotate(-45deg);	
		}
	}
`;

export const Arrow = styled(ArrowRight)<{
	color: string;
	$isReversed?: boolean;
}>`
	color: ${({ color }) => color};
	vertical-align: middle;
	width: 2rem;
	height: 2rem;

	${({ $isReversed }) =>
		$isReversed &&
		css`
			transform: rotate(180deg);
		`}
`;
