import styled from 'styled-components';
import { NavLinkMobile } from '../../style/link.styledComp';
import { color } from '../../style/variable.style';
import { useState } from 'react';
import { hexToRgba } from '../../utils/colorFunc';
import { authStore } from '../../store/authStore';
import { BurgerIcon } from '../../style/icon.styledComp';

interface Props {
	disconect: () => void;
}

const NavbarMobile = ({ disconect }: Props) => {
	const { isLogged } = authStore();
	const [open, setOpen] = useState<boolean>(false);

	const handleClick = () => {
		setOpen(!open);
		disconect();
	};

	return (
		<NavMobile>
			<MobileMenu className={open ? 'isOpen' : ''}>
				<NavLinkMobile
					onClick={() => setOpen(false)}
					to='/'>
					A propos
				</NavLinkMobile>
				<NavLinkMobile
					onClick={() => setOpen(false)}
					to='/contact'>
					Nous contacter
				</NavLinkMobile>
				{isLogged ? (
					<>
						<NavLinkMobile
							onClick={() => setOpen(false)}
							to='/user'>
							Mon compte
						</NavLinkMobile>
						<NavLinkMobile
							onClick={() => handleClick()}
							to=''>
							Se déconnecter
						</NavLinkMobile>
					</>
				) : (
					<NavLinkMobile
						onClick={() => setOpen(false)}
						to='/login'>
						Se connecter
					</NavLinkMobile>
				)}
			</MobileMenu>

			<BtnNav onClick={() => setOpen(!open)}>
				<BurgerIcon
					color={color.secondary}
					className={open ? 'active' : ''}></BurgerIcon>
			</BtnNav>
		</NavMobile>
	);
};

export default NavbarMobile;

const NavMobile = styled.div`
	position: relative;
`;

const MobileMenu = styled.nav`
	z-index: 99;
	box-shadow: 0px 2px 2px 1px ${hexToRgba(color.dark, 0.5)};
	border: 0.2rem solid ${color.primary};
	border-top: none;
	border-bottom: none;
	top: 4.8rem;
	right: -110vw;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	background-color: ${color.light};
	transition: all 0.3s ease-in-out;

	&.isOpen {
		right: -1rem;
	}

	& a {
		text-align: center;
		width: 100%;
		padding: 1.5rem;
		border-bottom: 0.2rem solid ${color.primary};
	}
`;

const BtnNav = styled.button`
	box-shadow: 0px 2px 2px 1px ${hexToRgba(color.dark, 0.5)};
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3.8rem;
	height: 3.8rem;
	border-radius: 50%;
	border: 0.2rem solid ${color.secondary};
	background-color: ${color.light};
`;
