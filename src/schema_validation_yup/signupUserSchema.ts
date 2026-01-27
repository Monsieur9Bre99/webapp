import * as yup from 'yup';

export const signupUserSchema = yup.object({
	firstname: yup
		.string()
		.required('* Champ obligatoire')
		.matches(
			/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ -][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/,
			'* Prenom invalide',
		),

	lastname: yup
		.string()
		.required('* Champ obligatoire')
		.matches(
			/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ -][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/,
			'* Nom invalide',
		),

	email: yup
		.string()
		.required('* Champ obligatoire')
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			'* Format adresse mail invalide',
		),

	username: yup
		.string()
		.required('* Champ obligatoire')
		.matches(
			/^[a-zA-Z0-9_]*$/,
			'* Le pseudo peut contenir que des lettres / chiffres / underscores',
		)
		.min(3, '* Le pseudo doit contenir au moins 3 caractères')
		.max(20, '* Le pseudo doit contenir au maximum 20 caractères'),

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

	condition: yup
		.boolean()
		.default(false)
		.oneOf([true], '* vous devez accepter les conditions utilisateurs'),
});

export type iSignupUser = yup.InferType<typeof signupUserSchema>;
