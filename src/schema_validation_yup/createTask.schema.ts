import * as yup from 'yup';

export const CreateTaskSchema = yup.object({
	title: yup.string().required('* Champ obligatoire'),

	description: yup.string().default(''),

	priority: yup
		.string()
		.oneOf(['LOW', 'MEDIUM', 'HIGH'], '* Priorité invalide')
		.default('LOW'),

	task_category_id: yup.string().required('* Champ obligatoire'),
});

export type iCreateTask = yup.InferType<typeof CreateTaskSchema>;
