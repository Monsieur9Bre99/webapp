import styled from 'styled-components';
import Separator from '../../prefab/Separator.prefab';
import {
	LoginCard,
	LoginCardHeader,
	LoginCardText,
	LoginCardTitle,
} from '../../style/card.styledComp';
import { MainCentered } from '../../style/global.styledComp';
import { FakeLink } from '../../style/link.styledComp';
import { color, typography } from '../../style/variable.style';
import { hexWithAlpha } from '../../utils/colorFunc';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../prefab/Loader.prefab';
import { useMutation } from '@tanstack/react-query';
import { confirmUser } from '../../service/api/auth.api';
import type {
	iConfirmUserData,
	iConfirmUserResult,
} from '../../service/api_interface/authApi.interface';
import { useEffect, useState } from 'react';

const ConfirmAccount = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isSuccess, setisSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	let { token } = useParams();
	const navigate = useNavigate();
	const colorExt = hexWithAlpha(color.primary, 0.0);
	const colorInt = hexWithAlpha(color.primary, 1.0);

	let content;

	useEffect(() => {
		if (!token) return;
		confirmation.mutate({ token: token });
		token = undefined;
	}, [token]);

	const confirmation = useMutation<
		iConfirmUserResult,
		Error,
		iConfirmUserData
	>({
		mutationKey: ['confirmation'],
		mutationFn: (data) => confirmUser(data),
		onSuccess: () => {
			setisSuccess(true);
			setIsLoading(false);
			setIsError(false);
		},
		onError: () => {
			setisSuccess(false);
			setIsLoading(false);
			setIsError(true);
		},
	});

	if (isLoading) {
		content = <Loader />;
	} else if (isSuccess) {
		content = (
			<>
				<h3>Félicitation !</h3>
				<LoginCardText>
					Votre compte a bien ete confirme, vous pouvez vous connecter
				</LoginCardText>
			</>
		);
	} else if (isError) {
		content = <LoginCardText>Une erreur est survenue</LoginCardText>;
	}

	return (
		<MainCentered>
			<LoginCard>
				<LoginCardHeader>
					<LoginCardTitle>Confirmation de votre compte</LoginCardTitle>
				</LoginCardHeader>
				<Separator
					width='75%'
					height='0.4rem'
					color={[colorExt, colorInt, colorInt, colorExt]}
					$degree='90deg'
				/>
				<Container>{content}</Container>
				<Separator
					width='75%'
					height='0.4rem'
					color={[colorExt, colorInt, colorInt, colorExt]}
					$degree='90deg'
				/>
				<FakeLink
					onClick={() => navigate('/login')}
					$align='center'>
					Retour à la connexion
				</FakeLink>
			</LoginCard>
		</MainCentered>
	);
};

export default ConfirmAccount;

const Container = styled.div`
	width: 100%;
	display: flex;
	gap: 2rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h3 {
		font-size: ${typography.desktop.xl};
		font-weight: ${typography.weight.bolder};
		text-align: center;
		color: ${color.primary};
	}
`;
