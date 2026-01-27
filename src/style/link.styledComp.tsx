import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { color, typography, breakpoints } from './variable.style';

export const NavLinkBase = styled(NavLink)`
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.l};
	font-weight: ${typography.weight.normal};
	color: ${color.secondary};
	text-decoration: none;

	@media (max-width: ${breakpoints.xl}) {
	}
	@media (max-width: ${breakpoints.lg}) {
		font-size: ${typography.mobile.l};
	}
	@media (max-width: ${breakpoints.md}) {
	}
	@media (max-width: ${breakpoints.sm}) {
	}
`;

export const NavLinkDesktop = styled(NavLinkBase)`
	position: relative;

	&::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: 0;
		left: 0;
		transform-origin: center;
		transform: scaleX(0);
		background-color: ${color.secondary};
		transition: transform 0.2s ease;
	}

	&:hover::after {
		transform: scaleX(50%);
	}

	&.active::after {
		transform: scaleX(90%);
	}
`;

export const NavLinkMobile = styled(NavLinkBase)`
	transition: all 0.2s ease;
	&.active {
		font-weight: ${typography.weight.bold};
	}
`;

export const FakeLink = styled.p<{ $align?: string }>`
	display: flex;
	justify-content: ${({ $align }) => $align || 'flex-start'};
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.m};
	font-weight: ${typography.weight.normal};
	color: ${color.dark};
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		color: ${color.primary};
	}

	@media (max-width: ${breakpoints.lg}) {
		font-size: ${typography.desktop.s};
	}

	@media (max-width: ${breakpoints.md}) {
		justify-content: flex-start;
		font-size: ${typography.mobile.s};
	}
`;
