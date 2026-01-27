import { FormProvider, useForm } from 'react-hook-form';
import {
	type iUpdatePassword,
	updatePasswordSchema,
} from '../../schema_validation_yup/forgotPassword.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { MainCentered } from '../../style/global.styledComp';
import LogCard from '../../components/login/LogCard.comp';
import { GridCell } from '../../style/global.styledComp';
import Button from '../../prefab/Button.prefab';
import { useMutation } from '@tanstack/react-query';
import type {
	iUpdatePasswordData,
	iUpdatePasswordResult,
} from '../../service/api_interface/authApi.interface';
import { updatePassword } from '../../service/api/auth.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toastStore } from '../../store/toastStore';
import { BaseInput } from '../../prefab/input/BaseInput.prefab';

const UpdatePassword = () => {
	const navigate = useNavigate();
	const { url } = useParams();
	const methods = useForm<iUpdatePassword>({
		resolver: yupResolver(updatePasswordSchema),
	});

	console.log(url);

	if (!url || url === '') {
		navigate('/login');
		toastStore.getState().setToast({
			message: 'Erreur lors de la redirection',
			type: 'error',
		});
	}

	const onSubmit = async (data: iUpdatePassword): Promise<void> => {
		updatePass.mutate({ newPassword: data.password, url: url || '' });
	};

	const updatePass = useMutation<
		iUpdatePasswordResult,
		Error,
		iUpdatePasswordData
	>({
		mutationKey: ['update_password'],
		mutationFn: async (data: iUpdatePasswordData) => updatePassword(data),
		onSuccess: () => {
			toastStore.getState().setToast({
				message: 'Mot de passe mis à jour avec success',
				type: 'success',
			});
			navigate('/login');
		},
		onError: () => {
			toastStore.getState().setToast({
				message:
					'Une erreur est survenue lors de la mise à jour de votre mot de passe veuillez reessayer',
				type: 'error',
			});
		},
	});

	return (
		<FormProvider {...methods}>
			<MainCentered>
				<LogCard
					title='Mettre à jour mot de passe'
					text='Entrez votre nouveau mot de passe'
					onSubmit={onSubmit}>
					<GridCell
						$colstart='1'
						$collspan='2'>
						<BaseInput
							{...methods.register('password')}
							id='password'
							type='password'
							label='* Nouveau mot de passe :'
							placeholder='Entrez votre mot de passe'
							error={methods.formState.errors.password?.message}
						/>
					</GridCell>
					<GridCell
						$colstart='1'
						$collspan='2'>
						<BaseInput
							{...methods.register('confirm_password')}
							id='confirm_password'
							type='password'
							label='* Confirmer le mot de passe :'
							placeholder='Confirmez votre mot de passe'
							error={methods.formState.errors.confirm_password?.message}
						/>
					</GridCell>
					<GridCell
						$colstart='2'
						$align='end'>
						<Button
							type='submit'
							text='Modifier'
							disabled={!methods.formState.isValid}
						/>
					</GridCell>
				</LogCard>
			</MainCentered>
		</FormProvider>
	);
};

export default UpdatePassword;
