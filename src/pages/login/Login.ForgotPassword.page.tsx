import { FormProvider, useForm } from 'react-hook-form';
import LogCard from '../../components/login/LogCard.comp';
import {
	checkEmailSchema,
	type iCheckEmail,
} from '../../schema_validation_yup/forgotPassword.schema';
import { GridCell } from '../../style/global.styledComp';
import { MainCentered } from '../../style/global.styledComp';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../prefab/Button.prefab';
import { useMutation } from '@tanstack/react-query';
import { askUpdatePassword } from '../../service/api/auth.api';
import type {
	iAskUpdatePasswordResult,
	iAskUpdatePasswordData,
} from '../../service/api_interface/authApi.interface';
import { toastStore } from '../../store/toastStore';
import { useNavigate } from 'react-router-dom';
import { BaseInput } from '../../prefab/input/BaseInput.prefab';
import { Checkbox } from '../../prefab/input/Checkbox.prefab';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const methods = useForm<iCheckEmail>({
		resolver: yupResolver(checkEmailSchema),
	});

	const onSubmit = async (data: iCheckEmail): Promise<void> => {
		confirmEmail.mutate({ email: data.email });
	};

	const confirmEmail = useMutation<
		iAskUpdatePasswordResult,
		Error,
		iAskUpdatePasswordData
	>({
		mutationKey: ['confirmEmail'],
		mutationFn: async (data) => askUpdatePassword(data),
		onSuccess: (data) => {
			navigate(`/forgot_password/${data.url}`);
		},
		onError: () => {
			toastStore.getState().setToast({
				message:
					'Une erreur est survenue lors de la verification de votre e-mail',
				type: 'error',
			});
		},
	});

	return (
		<FormProvider {...methods}>
			<MainCentered>
				<LogCard
					title='Mot de passe oublier'
					text='Entrez votre adresse email pour reinitialiser votre mot de passe'
					onSubmit={onSubmit}>
					<GridCell
						$colstart='1'
						$collspan='2'>
						<BaseInput
							{...methods.register('email')}
							id='email'
							type='email'
							label='* E-mail :'
							placeholder='Entrez votre e-mail'
							error={methods.formState.errors.email?.message}
						/>
					</GridCell>
					<GridCell $colstart='1'>
						<Checkbox
							{...methods.register('confirm_email')}
							id='confirm_email'
							label="Confirmer la validité de l'e-mail"
							error={methods.formState.errors.confirm_email?.message}
						/>
					</GridCell>
					<GridCell
						$align='end'
						$colstart='2'>
						<Button
							type='submit'
							text='Confirmer'
							disabled={!methods.formState.isValid}
						/>
					</GridCell>
				</LogCard>
			</MainCentered>
		</FormProvider>
	);
};

export default ForgotPassword;
