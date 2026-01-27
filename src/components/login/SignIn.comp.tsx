import { GridCell } from '../../style/global.styledComp';
import { FakeLink } from '../../style/link.styledComp';
import LogCard from './LogCard.comp';
import { color } from '../../style/variable.style';
import { Arrow } from '../../style/icon.styledComp';
import { useNavigate } from 'react-router-dom';
import Button from '../../prefab/Button.prefab';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import {
	type iSigninUser,
	signinUserSchema,
} from '../../schema_validation_yup/signinUserSchema';
import { useMutation } from '@tanstack/react-query';
import { signinUser } from '../../service/api/auth.api';
import type {
	iSigninUserData,
	iSigninUserResult,
} from '../../service/api_interface/authApi.interface';
import { authStore } from '../../store/authStore';
import { BaseInput } from '../../prefab/input/BaseInput.prefab';
import { Checkbox } from '../../prefab/input/Checkbox.prefab';

interface Props {
	setRegister: (register: boolean) => void;
}

const SignIn = ({ setRegister }: Props) => {
	const navigate = useNavigate();

	const methods = useForm<iSigninUser>({
		resolver: yupResolver(signinUserSchema),
	});

	const onSubmit = async (data: iSigninUser): Promise<void> => {
		const userData: iSigninUserData = {
			email: data.email,
			password: data.password,
			rememberMe: data.rememberMe,
		};
		signin.mutate(userData);
	};

	const signin = useMutation<iSigninUserResult, Error, iSigninUserData>({
		mutationKey: ['signin'],
		mutationFn: async (data: iSigninUser) => signinUser(data),
		onSuccess: (data) => {
			authStore.getState().login({
				accessToken: data.authentification.accessToken,
				userId: data.authentification.userId,
			});

			navigate('/user');
		},
		onError: () => {
			methods.setError('email', {
				message: 'Email ou mot de passe incorrect',
			});
			methods.setError('password', {
				message: 'Email ou mot de passe incorrect',
			});
		},
	});

	return (
		<FormProvider {...methods}>
			<LogCard
				title='Connexion'
				text="Connecter vous a votre compte pour accéder a l'application"
				onSubmit={onSubmit}>
				<GridCell
					$colstart='1'
					$collspan='2'>
					<BaseInput
						{...methods.register('email')}
						id='email-signin'
						type='email'
						label='* E-mail :'
						placeholder='Entrez votre e-mail'
						error={methods.formState.errors.email?.message}
					/>
				</GridCell>
				<GridCell
					$colstart='1'
					$collspan='2'>
					<BaseInput
						{...methods.register('password')}
						id='password-signin'
						type='password'
						label='* Mot de passe :'
						placeholder='Entrez votre mot de passe'
						error={methods.formState.errors.password?.message}
					/>
				</GridCell>
				<GridCell $colstart='1'>
					<Checkbox
						{...methods.register('rememberMe')}
						id='rememberMe'
						label='Se souvenir de moi'
						$isReversed={false}
					/>
				</GridCell>
				<GridCell $align='end'>
					<FakeLink
						$align='flex-end'
						onClick={() => setRegister(false)}>
						Vous n’avez pas encore de compte{' '}
						<Arrow color={color.primary} />
					</FakeLink>
				</GridCell>
				<GridCell
					$align='end'
					$colstart='2'>
					<FakeLink
						$align='flex-end'
						onClick={() => navigate('/forgot_password')}>
						Mot de passe oublié ?
					</FakeLink>
				</GridCell>
				<GridCell
					$align='start'
					$colstart='1'
					$rowstart='4'>
					<Button
						classname='fill'
						type='submit'
						text='Connexion'
						colors={{
							$textColor: color.light,
							$borderColor: color.primary,
							$backgroundColor: color.primary,
						}}
						// disabled={!methods.formState.isValid}
					/>
				</GridCell>
			</LogCard>
		</FormProvider>
	);
};

export default SignIn;
