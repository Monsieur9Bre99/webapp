import { color } from '../../../style/variable.style';
import {
	DetailLine,
	DetailText,
	DetailTitle,
	DetailSecondaryBtn,
	DetailTextContainer,
	DetailInputContainer,
} from './DisplayTaskDetail.comp';
import { clalculateTimeFromTimestamp } from '../../../utils/calculFunc';
import { Check, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addWorkTime } from '../../../service/api/task.api';
import type {
	iAddWorkTimeData,
	iAddWorkTimeResult,
} from '../../../service/api_interface/taskApi.interface';
import { toastStore } from '../../../store/toastStore';

interface Props {
	$location?: string;
	taskId: string;
	onGoing: boolean;
	workedTime?: number;
	refetchTask: () => void;
}

const AddWorkedTime = ({
	$location,
	taskId,
	onGoing,
	workedTime,
	refetchTask,
}: Props) => {
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

		stateFunc(e.target.value);
	};

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
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

		AddWorkedTimeQuerry.mutate({ task_id: taskId, work_time: totalTime });
	};

	const AddWorkedTimeQuerry = useMutation<
		iAddWorkTimeResult,
		Error,
		iAddWorkTimeData
	>({
		mutationKey: ['addWorkTime'],
		mutationFn: (data) => addWorkTime(data),
		onSuccess: () => {
			refetchTask();
			setAddTime(false);
		},
		onError: () => {
			setAddTime(false);
			toastStore
				.getState()
				.setToast({
					message:
						"Une erreur est survenue lors de l'ajout du temps travaillé",
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
				<DetailTitle>Temps passé :</DetailTitle>
				{onGoing ? (
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
									onClick={(e) => handleClick(e)}
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
									{(workedTime
										&& clalculateTimeFromTimestamp(workedTime))
										|| '0m'}
								</DetailText>
								{$location === 'kanban' && (
									<DetailSecondaryBtn
										onClick={() => setAddTime(true)}
										$color={color.primary}>
										<Plus />
									</DetailSecondaryBtn>
								)}
							</>
						)}
					</DetailTextContainer>
				) : (
					<DetailText>
						{(workedTime && clalculateTimeFromTimestamp(workedTime))
							|| '0m'}
					</DetailText>
				)}
			</DetailLine>
		</>
	);
};

export default AddWorkedTime;
