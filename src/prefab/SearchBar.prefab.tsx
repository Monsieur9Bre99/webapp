import styled from 'styled-components';
import { color, typography } from '../style/variable.style';
import { hexToRgba } from '../utils/colorFunc';

interface Props {
	ref?: React.RefObject<HTMLInputElement | null>;
	$width?: string;
	setSearch: (search: string) => void;
	placeholder: string;
}

const SearchBar = ({ ref, $width, setSearch, placeholder }: Props) => {
	return (
		<SearchInput
			ref={ref}
			$width={$width}
			onChange={(e) => setSearch(e.target.value)}
			placeholder={placeholder}
		/>
	);
};

export default SearchBar;

const SearchInput = styled.input<{ $width?: string }>`
	outline: none;
	width: ${({ $width }) => $width || '90%'};
	background-color: ${color.light};
	border-radius: 0.5rem;
	border: 0.2rem solid ${color.primary};
	padding: 0.5rem 1rem;
	box-shadow: 0px 3px 2px 1px ${hexToRgba(color.dark, 0.5)};

	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};

	font-weight: ${typography.weight.thin};
	color: ${color.dark};
`;
