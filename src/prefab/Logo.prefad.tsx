import styled from 'styled-components';
import TaskHiveLogo from '../asset/logo/logo_TaskHive.svg';
import { breakpoints, color, typography } from '../style/variable.style';

const LogoContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	align-items: center;

	@media (max-width: ${breakpoints.md}) {
		gap: 0.25rem;
	}
`;

const LogoImg = styled.img`
	width: 5rem;
	height: 5rem;

	@media (max-width: ${breakpoints.md}) {
		width: 4rem;
		height: 4rem;
	}
`;

const LogoTextContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const LogoText = styled.span<{ color: string }>`
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xl};
	font-weight: ${typography.weight.bolder};
	color: ${({ color }) => color};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.xl};
	}
`;

const Logo = () => {
	return (
		<LogoContainer>
			<LogoImg
				src={TaskHiveLogo}
				alt='logo de taskhive'
			/>
			<LogoTextContainer>
				<LogoText color={color.dark}>Task</LogoText>
				<LogoText color={color.secondary}>Hive</LogoText>
			</LogoTextContainer>
		</LogoContainer>
	);
};

export default Logo;
