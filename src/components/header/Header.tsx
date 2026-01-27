import Logo from '../../prefab/Logo.prefad';
import styled from 'styled-components';
import { breakpoints, color } from '../../style/variable.style';
import { displayStore } from '../../store/displayStore';
import NavBar from './NavBar.comp';
import NavbarMobile from './Navbar.mobile.comp';
import { hexToRgba } from '../../utils/colorFunc';
import { authStore } from '../../store/authStore';
import { useMutation } from '@tanstack/react-query';
import { signoutUser } from '../../service/api/auth.api';
import type {
	iSignoutUserData,
	iSignoutUserResult,
} from '../../service/api_interface/authApi.interface';
import { toastStore } from '../../store/toastStore';

const Header = () => {
	const { displayType } = displayStore();
	const { logout, userId } = authStore();

	const disconect = (): void => {
		if (!userId) return;
		handleLogout.mutate({ userId });
	};

	const handleLogout = useMutation<
		iSignoutUserResult,
		Error,
		iSignoutUserData
	>({
		mutationKey: ['logout'],
		mutationFn: (data) => signoutUser(data),
		onSuccess: () => {
			toastStore.getState().setToast({
				message: 'Deconnexion reussie',
				type: 'success',
			});
			logout();
		},
		onError: () => {
			toastStore.getState().setToast({
				message: 'Une erreur est survenue lors de la deconnexion',
				type: 'error',
			});
		},
	});

	return (
		<HeaderContainer>
			<Logo />

			{displayType === 'mobile' ? (
				<NavbarMobile disconect={disconect} />
			) : (
				<NavBar disconect={disconect} />
			)}
		</HeaderContainer>
	);
};

export default Header;

const HeaderContainer = styled.header`
	z-index: 98;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 1rem 2rem;
	background-color: ${color.primary};
	box-shadow: 0px 3px 2px 1px ${hexToRgba(color.dark, 0.5)};

	@media (max-width: ${breakpoints.lg}) {
		padding: 1rem;
	}
`;
