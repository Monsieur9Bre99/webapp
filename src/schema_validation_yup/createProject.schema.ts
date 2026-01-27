import * as yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const CreateProjectSchema = yup.object({
	title: yup.string().required('* Champ obligatoire'),

	description: yup.string().default(''),

	date_start: yup
		.date()
		.default(today)
		.typeError('* Veuillez indiquer une date valide')
		.required('* Champ obligatoire')
		.min(
			today,
			'* La date de début doit être postérieure ou égale à aujourd’hui',
		),

	date_end: yup
		.date()
		.default(undefined)
		.typeError('* Veuillez indiquer une date valide')
		.required('* Champ obligatoire')
		.min(
			yup.ref('date_start'),
			'* La date de fin doit être postérieure ou égale à la date de début',
		),
});

export type iCreateProject = yup.InferType<typeof CreateProjectSchema>;