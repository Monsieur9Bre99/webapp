import * as yup from 'yup';

export const checkEmailSchema = yup.object({
	email: yup
		.string()
		.required('* Champ obligatoire')
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			'* Format adresse mail invalide',
		),

	confirm_email: yup
		.boolean()
		.default(false)
		.oneOf([true], "* vous devez confirmé la validité de l'email"),
});

export type iCheckEmail = yup.InferType<typeof checkEmailSchema>;

export const updatePasswordSchema = yup.object({
	password: yup
		.string()
		.required('* Champ obligatoire')
		.matches(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/,
			'* Le mot de passe doit contenir une majuscule / une minuscule / un chiffre / un caractère spécial',
		)
		.min(12, '* Le mot de passe doit contenir au moins 12 caractères'),

	confirm_password: yup
		.string()
		.required('* Champ obligatoire')
		.oneOf([yup.ref('password')], '* Les mots de passe ne correspondent pas'),
});

export type iUpdatePassword = yup.InferType<typeof updatePasswordSchema>;
