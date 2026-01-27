import { Check, X, Plus } from 'lucide-react';
import { color } from '../../../style/variable.style';
import { clalculateTimeFromTimestamp } from '../../../utils/calculFunc';
import {
	DetailLine,
	DetailTitle,
	DetailTextContainer,
	DetailInputContainer,
	DetailSecondaryBtn,
	DetailText,
} from './DisplayTaskDetail.comp';
import { useEffect, useState } from 'react';
import type {
	iUpdateTaskData,
	iUpdateTaskResult,
} from '../../../service/api_interface/taskApi.interface';
import { useMutation } from '@tanstack/react-query';
import { updateTask } from '../../../service/api/task.api';
import { toastStore } from '../../../store/toastStore';

interface Props {
	taskId: string;
	backlog: boolean;
	delay?: number;
	refetchTask: () => void;
}

const AddDelay = ({ taskId, backlog, delay, refetchTask }: Props) => {
	const [hours, setHours] = useState<string>('0');
	const [minutes, setMinutes] = useState<string>('0');
	const [addTime, setAddTime] = useState<boolean>(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		stateFunc: (value: string) => void,
	) => {
		if (!e.target.value.match('^[0-9]*$')) {
			e.target.value = e.target.value.replace(/[^0-9]/g, '');
			return;
		}

		if (e.target.value.length > 2) {
			e.target.value = e.target.value.slice(0, 2);
		}

		stateFunc(e.target.value);
	};

	const handleClick = () => {
		if (
			(hours === '' && minutes === '')
			|| (hours === '0' && minutes === '0')
		) {
			setAddTime(false);
			return;
		}

		const minOnTimestamp = parseInt(minutes) * 60 * 1000;
		const hoursOnTimestamp = parseInt(hours) * 60 * 60 * 1000;

		const totalTime = minOnTimestamp + hoursOnTimestamp;

		addDelayToTaskQuery.mutate({
			task_id: taskId,
			updates: { delay: String(totalTime) },
		});
	};

	const addDelayToTaskQuery = useMutation<
		iUpdateTaskResult,
		Error,
		iUpdateTaskData
	>({
		mutationKey: ['addDelayToTask'],
		mutationFn: (data) => updateTask(data),
		onSuccess: () => {
			refetchTask();
			setAddTime(false);
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({
					message: "Erreur lors de l'ajout du délai",
					type: 'error',
				});
		},
	});

	useEffect(() => {
		if (addTime === false) {
			setHours('0');
			setMinutes('0');
		}
	}, [addTime]);
	return (
		<>
			<DetailLine>
				<DetailTitle>Délai :</DetailTitle>
				{backlog ? (
					<DetailTextContainer>
						{addTime ? (
							<>
								<DetailInputContainer>
									<input
										id='hours'
										type='text'
										min='0'
										placeholder='00'
										pattern='[0-9]'
										onChange={(e) => handleChange(e, setHours)}
									/>
									<label htmlFor='hours'>H</label>
								</DetailInputContainer>
								<DetailInputContainer>
									<input
										id='minutes'
										type='text'
										min='0'
										placeholder='00'
										pattern='[0-9]'
										onChange={(e) => handleChange(e, setMinutes)}
									/>
									<label htmlFor='minutes'>M</label>
								</DetailInputContainer>
								<DetailSecondaryBtn
									onClick={() => handleClick()}
									$color={color.success}>
									<Check />
								</DetailSecondaryBtn>
								<DetailSecondaryBtn
									onClick={() => setAddTime(false)}
									$color={color.error}>
									<X />
								</DetailSecondaryBtn>
							</>
						) : (
							<>
								<DetailText>
									{(delay && clalculateTimeFromTimestamp(delay))
										|| 'Aucun delai'}
								</DetailText>
								<DetailSecondaryBtn
									onClick={() => setAddTime(true)}
									$color={color.primary}>
									<Plus />
								</DetailSecondaryBtn>
							</>
						)}
					</DetailTextContainer>
				) : (
					<DetailText>
						{(delay && clalculateTimeFromTimestamp(delay))
							|| 'Aucun delai'}
					</DetailText>
				)}
			</DetailLine>
		</>
	);
};

export default AddDelay;
