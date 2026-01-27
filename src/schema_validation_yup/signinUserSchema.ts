import * as yup from 'yup';

export const signinUserSchema = yup.object({
	email: yup
		.string()
		.required('* Champ obligatoire')
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			'* Format adresse mail invalide',
		),

	password: yup
		.string()
		.required('* Champ obligatoire')
		.min(12, '* Le mot de passe doit contenir au moins 12 caractères'),

	rememberMe: yup.boolean().default(false).optional(),
});

export type iSigninUser = yup.InferType<typeof signinUserSchema>;
