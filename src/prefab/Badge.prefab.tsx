import styled from 'styled-components';
import { breakpoints, color, typography } from '../style/variable.style';
import { X } from 'lucide-react';

interface Props {
	text: string;
	$backgroundColor?: string;
	$textColor?: string;
	$canDelete?: boolean;
	$onClick?: () => void;
}

const Badge = ({
	text,
	$backgroundColor,
	$textColor,
	$canDelete,
	$onClick,
}: Props) => {
	return (
		<BadgeContainer $backgroundColor={$backgroundColor}>
			<BadgeText $textColor={$textColor}>{text}</BadgeText>
			{$canDelete && (
				<BadgeDelete
					type='button'
					onClick={$onClick}>
					<X />
				</BadgeDelete>
			)}
		</BadgeContainer>
	);
};

export default Badge;

const BadgeContainer = styled.div<{
	$backgroundColor?: string;
}>`
	height: fit-content;
	width: fit-content;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	background-color: ${({ $backgroundColor }) =>
		$backgroundColor || color.primary};
	border-radius: 2rem;
	padding: 0.5rem 1rem;
`;

const BadgeText = styled.p<{
	$textColor?: string;
}>`
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xxs};
	font-weight: ${typography.weight.thin};
	color: ${({ $textColor }) => $textColor || color.light};
	line-height: ${typography.desktop.xxs};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.xxs};
	}
`;

const BadgeDelete = styled.button`
	vertical-align: middle;
	line-height: ${typography.desktop.xxs};
	svg {
		color: ${color.light};
		width: 1.5rem;
		height: 1.5rem;
	}

	@media (max-width: ${breakpoints.md}) {
		line-height: ${typography.mobile.xxs};
		svg {
			width: 1.2rem;
			height: 1.2rem;
		}
	}
`;
