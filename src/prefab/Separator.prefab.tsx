import styled, { css } from 'styled-components';
import { breakpoints, color } from '../style/variable.style';
import { buildGradient } from '../utils/colorFunc';

interface Props {
	width?: string;
	height?: string;
	color?: string | string[];
	style?: React.CSSProperties;
	$degree?: string;
}

const Separator = ({
	width,
	height,
	color,
	style,
	$degree = '90deg',
}: Props) => {
	return (
		<Sep
			style={style}
			width={width}
			height={height}
			color={color}
			$degree={$degree}></Sep>
	);
};

export default Separator;

const Sep = styled.div<Props>`
	margin: 4rem auto;
	width: ${({ width }) => width || '100%'};
	height: ${({ height }) => height || '0.2rem'};
	${({ color: c, $degree }) =>
		$degree && c && c.length > 0
			? css`
					background: ${buildGradient('linear', c, $degree)};
				`
			: css`
					background: ${color.primary};
				`}

	@media (max-width: ${breakpoints.md}) {
		margin: 2rem auto;
		height: 0.2rem;
		width: 100%;
	}
`;
