import styled from 'styled-components';
import { color, typography, breakpoints } from '../style/variable.style';
import { Card } from './card.styledComp';
import { GridContainer } from './global.styledComp';
import { adjustColorBrightness, hexWithAlpha } from '../utils/colorFunc';

export const ParamCardContainer = styled(Card)`
	margin: 2rem auto;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

export const ParamCardHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ParamCardTitle = styled.h2`
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xl};
	font-weight: ${typography.weight.bold};
	color: ${color.primary};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.xl};
	}
`;

export const ParamCardHeaderSide = styled.div`
	display: flex;
	gap: 1rem;
`;

export const ParamCardButton = styled.button<{ $color?: string }>`
	cursor: pointer;
	display: flex;
	gap: 1rem;
	border: 0.2rem solid ${({ $color }) => $color || color.primary};
	border-radius: 0.5rem;
	padding: 0.6rem;
	svg {
		width: 2rem;
		height: 2rem;
	}
	color: ${({ $color }) => $color || color.primary};

	&:hover {
		background-color: ${({ $color }) => $color || color.primary};
		color: ${color.light};
	}
`;

export const ParamCardContent = styled.div`
	width: 100%;
	padding: 0 1rem 1rem;
`;

export const ParamCardSubTitle = styled.h3`
	width: 100%;
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.m};
	font-weight: ${typography.weight.normal};
	color: ${color.primary};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.xs};
	}
`;

export const ParamCardText = styled.p`
	width: 100%;
	padding: 0.5rem;
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.normal};
	color: ${color.dark};

	@media (max-width: ${breakpoints.lg}) {
		font-size: ${typography.desktop.xs};
	}

	@media (max-width: ${breakpoints.md}) {
		text-align: left;
		font-size: ${typography.mobile.s};
	}
`;

export const ParamCardSubContent = styled.section<{ $margin?: string }>`
	margin: ${({ $margin }) => $margin || '0'};
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ParamCardRow = styled(GridContainer)`
	align-content: center;
	gap: 0;
	row: 1;
	padding: 0.5rem;
	border-bottom: 0.2rem solid ${color.primary};
	@media (max-width: ${breakpoints.lg}) {
		display: grid;
	}

	@media (max-width: ${breakpoints.md}) {
		position: relative;
		display: flex;
	}
`;

export const ParamCardSelectRole = styled.select`
	width: 90%;
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.normal};
	color: ${color.dark};
`;

export const ParamCardDeleteBtn = styled.button`
	cursor: pointer;
	color: ${color.error};

	&:hover {
		color: ${adjustColorBrightness(color.error, -0.2)};
	}

	&:active {
		color: ${adjustColorBrightness(color.error, 0.2)};
	}

	&:disabled {
		cursor: not-allowed;
		color: ${hexWithAlpha(color.error, 0.25)};
	}

	@media (max-width: ${breakpoints.md}) {
		z-index: 99;
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
`;
