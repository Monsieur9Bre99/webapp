import * as yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const UpdateProjectSchema = yup.object({
	title: yup.string().optional(),
	description: yup.string().optional(),

	date_start: yup
		.date()
		.typeError('* Veuillez indiquer une date valide')

		.optional(),

	date_end: yup
		.date()
		.typeError('* Veuillez indiquer une date valide')
		.when('date_start', (date_start, schema) =>
			date_start
				? schema.min(
						date_start,
						'* La date de fin doit être postérieure ou égale à la date de début',
				  )
				: schema,
		)
		.optional(),
});

export type iUpdateProject = yup.InferType<typeof UpdateProjectSchema>;
