import styled from 'styled-components';
import { color, typography, breakpoints } from './variable.style';
import { hexToRgba } from '../utils/colorFunc';

export const Card = styled.div`
	margin: 0 auto;
	padding: 1rem;
	background-color: ${color.light};
	display: flex;
	flex-direction: column;
	border: 0.2rem solid ${color.primary};
	border-radius: 1rem;
	box-shadow: 0px 3px 2px 1px ${hexToRgba(color.dark, 0.5)};
	width: 55%;

	@media (max-width: ${breakpoints.lg}) {
		width: 85%;
	}

	@media (max-width: ${breakpoints.md}) {
		width: 95%;
	}
`;

export const LoginCard = styled(Card)`
	height: fit-content;
	justify-content: center;
	align-items: center;
`;

export const LoginCardHeader = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	@media (max-width: ${breakpoints.md}) {
		gap: 1rem;
	}
`;

export const LoginCardTitle = styled.h2`
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xl};
	font-weight: ${typography.weight.bold};
	color: ${color.secondary};
	text-align: center;

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.xl};
	}
`;

export const LoginCardText = styled.p`
	font-family: ${typography.fontSecondary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.normal};
	color: ${color.dark};
	text-align: center;

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.xs};
	}
`;

export const LoginCardForm = styled.form<{
	$pad?: string;
	$gap?: string;
	$column?: string;
	$row?: string;
}>`
	padding: ${({ $pad }) => $pad || '0.5rem 2rem'};
	width: 100%;
	display: grid;
	grid-template-columns: ${({ $column }) => $column || 'repeat(2, 1fr)'};
	grid-template-rows: ${({ $row }) => $row};
	gap: ${({ $gap }) => $gap || '3rem'};
	@media (max-width: ${breakpoints.md}) {
		padding: 1rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
`;
