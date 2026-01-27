import { FileInput } from '../../../prefab/input/FileInput.prefab';
import Separator from '../../../prefab/Separator.prefab';
import { color } from '../../../style/variable.style';
import { hexWithAlpha } from '../../../utils/colorFunc';
import { DetailImage, DetailLine, DetailTitle } from './DisplayTaskDetail.comp';
import { X } from 'lucide-react';
import type {
	iGetTaskByIdResult,
	iRemoveTaskImageData,
	iRemoveTaskImageResult,
	iUpdateTaskData,
} from '../../../service/api_interface/taskApi.interface';
import { useMutation } from '@tanstack/react-query';
import { removeTaskImage } from '../../../service/api/task.api';
import { toastStore } from '../../../store/toastStore';
import { useRef, useState } from 'react';

interface Props {
	setUpdates:React.Dispatch<
    React.SetStateAction<Partial<iUpdateTaskData['updates']>>
  >;
	task: iGetTaskByIdResult;
	refetchTask: () => void;
}

const TaskDetailImageUpdate = ({ setUpdates, task, refetchTask }: Props) => {
	const inputImgRef = useRef<HTMLInputElement>(null);
	const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
		task.image,
	);
	const [_imageFile, setImageFile] = useState<File | null>(null);
	const [imageError, setImageError] = useState<string | null>(null);

	const handleImgPreviewCleanup = (e: React.MouseEvent) => {
		e.preventDefault();
		if (task.image) {
			removeTaskImageQuery.mutate({ task_id: task.id });
		}
		if (previewImageUrl && previewImageUrl !== task.image) {
			URL.revokeObjectURL(previewImageUrl);
		}
		if (inputImgRef.current) {
			inputImgRef.current.value = '';
		}
		setPreviewImageUrl(null);
		setImageFile(null);
		setUpdates((prev) => {
			const next = { ...prev };
			delete next.image;
			return next;
		});
	};

	const selectedFiles = (files: FileList | null) => {
		setImageError(null);

		if (!files || files.length === 0) {
			setPreviewImageUrl(task.image ?? null);
			setImageFile(null);
			setUpdates((prev) => {
				const next = { ...prev };
				delete next.image;
				return next;
			});
			return;
		}

		const file = files[0];

		if (!file.type.startsWith('image/')) {
			setImageError('* Type de fichier non supporté');
			setPreviewImageUrl(task.image ?? null);
			setImageFile(null);
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			setImageError('* Fichier trop volumineux (5MO max)');
			setPreviewImageUrl(task.image ?? null);
			setImageFile(null);
			return;
		}

		const url = URL.createObjectURL(file);
		setPreviewImageUrl((old) => {
			if (old && old !== task.image) {
				URL.revokeObjectURL(old);
			}
			return url;
		});
		setImageFile(file);
		setUpdates((prev) => ({ ...prev, image: file }));
	};

	const removeTaskImageQuery = useMutation<
		iRemoveTaskImageResult,
		Error,
		iRemoveTaskImageData
	>({
		mutationKey: ['removeTaskImage'],
		mutationFn: (data) => removeTaskImage(data),
		onSuccess: () => {
			refetchTask();
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message:
						"Une erreur est survenue lors de la suppression de l'image de la tache",
					type: 'error',
				});
		},
	});

	return (
		<>
			<Separator
				width='85%'
				color={[
					hexWithAlpha(color.primary, 0.0),
					hexWithAlpha(color.primary, 1.0),
					hexWithAlpha(color.primary, 0.0),
				]}
			/>
			<DetailLine>
				<DetailTitle>Image de la tâche :</DetailTitle>
				{previewImageUrl && (
					<DetailImage
						target='_blank'
						href={previewImageUrl}>
						<img
							src={previewImageUrl}
							alt='image de la tâche'
							loading='lazy'
						/>
						<button
							onClick={(e) => handleImgPreviewCleanup(e)}
							type='button'>
							<X />
						</button>
					</DetailImage>
				)}
				<FileInput
					$ref={inputImgRef}
					id='image'
					name='image'
					placeholder={
						previewImageUrl ? "Modifier l'image" : 'Ajouter une image'
					}
					onChange={selectedFiles}
					label='Ajouter une image'
					acceptedFormat='image/*'
					multiple={false}
					error={imageError ? imageError : undefined}
					$hideLabel
				/>
			</DetailLine>
		</>
	);
};

export default TaskDetailImageUpdate;
