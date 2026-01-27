import styled from 'styled-components';
import { NavLinkDesktop } from '../../style/link.styledComp';
import { authStore } from '../../store/authStore';

interface Props {
	disconect: () => void;
}

const NavBar = ({ disconect }: Props) => {
	const { isLogged } = authStore();

	return (
		<Nav>
			<NavLinkDesktop to='/'>A propos</NavLinkDesktop>
			<NavLinkDesktop to='/contact'>Nous contacter</NavLinkDesktop>
			{isLogged ? (
				<>
					<NavLinkDesktop to='/user'>Mon compte</NavLinkDesktop>
					<NavLinkDesktop
						onClick={() => disconect()}
						to=''>
						Se déconnecter
					</NavLinkDesktop>
				</>
			) : (
				<NavLinkDesktop to='/login'>Se connecter</NavLinkDesktop>
			)}
		</Nav>
	);
};

export default NavBar;

const Nav = styled.nav`
	display: flex;
	flex-direction: row;
	gap: 2rem;
`;
