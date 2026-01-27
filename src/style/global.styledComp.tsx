import styled from 'styled-components';
import { color, typography, breakpoints } from './variable.style';

export const Main = styled.main`
	position: relative;
	width: clamp(320px, 100%, 2400px);
	margin: 0 auto;
	background-color: ${color.light};
	display: flex;
	flex-direction: column;
	flex: 1;
`;

export const MainCentered = styled(Main)<{ $direction?: string }>`
	display: flex;
	align-items: center;
	flex-direction: ${({ $direction }) => $direction || 'row'};
	gap: 2rem;
`;

export const MainTitle = styled.h1`
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xxl};
	font-weight: ${typography.weight.bold};
	color: ${color.third};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.xxl};
	}
`;

export const SubTitle = styled.h2`
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.l};
	font-weight: ${typography.weight.bold};
	color: ${color.primary};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.l};
	}
`;

export const GridContainer = styled.section<{
	$columns?: string;
	$rows?: string;
	$gap?: string;
}>`
	display: grid;
	padding: 1rem;
	grid-template-columns: ${({ $columns }) => $columns || '1fr'};
	grid-template-rows: repeat(${({ $rows }) => $rows || '1'}, 1fr);
	gap: ${({ $gap }) => $gap || '1rem'};

	@media (max-width: ${breakpoints.lg}) {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
`;

export const GridCell = styled.div<{
	$align?: string;
	$colstart?: string;
	$collspan?: string;
	$rowstart?: string;
	$rowspan?: string;
}>`
	display: grid;
	height: fit-content;
	place-items: ${({ $align }) => `${$align}` || 'center start'};
	grid-column: ${({ $colstart }) => $colstart} / span
		${({ $collspan }) => $collspan || '1'};
	grid-row: ${({ $rowstart }) => $rowstart} / span
		${({ $rowspan }) => $rowspan || '1'};

	@media (max-width: ${breakpoints.md}) {
		place-items: center start;
		};
	}
`;

export const PageHeader = styled.section<{ $pad?: string }>`
	width: 100%;
	padding: ${({ $pad }) => $pad || '1rem'};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;

	@media (max-width: ${breakpoints.md}) {
		flex-direction: column;
		gap: 0.5rem;
		align-items: flex-start;
	}
`;

export const FilterContainer = styled.div`
	width: fit-content;
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	wrap: wrap;

	@media (max-width: ${breakpoints.md}) {
		flex-direction: column;
		align-items: flex-start;
	}
`;
