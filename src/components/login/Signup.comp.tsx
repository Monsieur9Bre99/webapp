import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../../prefab/Button.prefab';
import {
	type iSignupUser,
	signupUserSchema,
} from '../../schema_validation_yup/signupUserSchema';
import { GridCell } from '../../style/global.styledComp';
import { Arrow } from '../../style/icon.styledComp';
import { FakeLink } from '../../style/link.styledComp';
import { color } from '../../style/variable.style';
import LogCard from './LogCard.comp';
import { useMutation } from '@tanstack/react-query';
import { signupUser } from '../../service/api/auth.api';
import type {
	iSignupUserData,
	iSignupUserResult,
} from '../../service/api_interface/authApi.interface';
import { toastStore } from '../../store/toastStore';
import { BaseInput } from '../../prefab/input/BaseInput.prefab';
import { Checkbox } from '../../prefab/input/Checkbox.prefab';

interface Props {
	setRegister: (register: boolean) => void;
}

const Signup = ({ setRegister }: Props) => {
	const methods = useForm<iSignupUser>({
		resolver: yupResolver(signupUserSchema),
	});

	const onSubmit = async (data: iSignupUser): Promise<void> => {
		const newUser: iSignupUserData = {
			firstname: data.firstname,
			lastname: data.lastname,
			email: data.email,
			username: data.username,
			password: data.password,
		};

		signup.mutate(newUser);
	};

	const signup = useMutation<iSignupUserResult, Error, iSignupUserData>({
		mutationKey: ['register'],
		mutationFn: async (data: iSignupUserData) => signupUser(data),
		onSuccess: () => {
			setRegister(true);
			toastStore.getState().setToast({
				message: 'Inscription reussie, veuillez verifier vos mails',
				type: 'success',
			});
		},
		onError: () => {
			toastStore.getState().setToast({
				message: `Une erreur est survenue lors de la creation de votre compte veuillez reessayer`,
				type: 'error',
			});
		},
	});

	return (
		<FormProvider {...methods}>
			<LogCard
				title='Inscription'
				text="Créer votre compte pour accéder a l'application"
				onSubmit={onSubmit}>
				<GridCell>
					<BaseInput
						{...methods.register('firstname')}
						id='firstname'
						label={'* Prénom'}
						placeholder='Entrez votre prénom'
						error={methods.formState.errors.firstname?.message}
					/>
				</GridCell>
				<GridCell>
					<BaseInput
						{...methods.register('lastname')}
						id='lastname'
						label={'* Nom'}
						placeholder='Entrez votre nom'
						error={methods.formState.errors.lastname?.message}
					/>
				</GridCell>
				<GridCell>
					<BaseInput
						{...methods.register('email')}
						id='email'
						type='email'
						label={'* E-mail'}
						placeholder='Entrez votre e-mail'
						error={methods.formState.errors.email?.message}
					/>
				</GridCell>
				<GridCell>
					<BaseInput
						{...methods.register('username')}
						id='username'
						label={"* Nom d'utilisateur"}
						placeholder="Entrez votre nom d'utilisateur"
						error={methods.formState.errors.username?.message}
					/>
				</GridCell>
				<GridCell>
					<BaseInput
						{...methods.register('password')}
						id='password'
						type='password'
						label={'* Mot de passe'}
						placeholder='Entrez votre mot de passe'
						error={methods.formState.errors.password?.message}
					/>
				</GridCell>
				<GridCell>
					<BaseInput
						{...methods.register('confirm_password')}
						id='confirm_password'
						type='password'
						label={'* Confirmer le mot de passe'}
						placeholder='Confirmez votre mot de passe'
						error={methods.formState.errors.confirm_password?.message}
					/>
				</GridCell>
				<GridCell $colstart='1'>
					<FakeLink onClick={() => setRegister(true)}>
						<Arrow
							$isReversed
							color={color.primary}
						/>
						Vous avez déjà un compte
					</FakeLink>
				</GridCell>
				<GridCell $colstart='2'>
					<Checkbox
						{...methods.register('condition')}
						$isReversed
						id='condition'
						label="Accepter les conditions d'utilisation"
						error={methods.formState.errors.condition?.message}
					/>
				</GridCell>
				<GridCell
					$align='end'
					$colstart='2'>
					<Button
						type='submit'
						text="S'inscrire"
						disabled={!methods.formState.isValid}
					/>
				</GridCell>
			</LogCard>
		</FormProvider>
	);
};

export default Signup;
