import styled from 'styled-components';
import { color, typography, breakpoints } from '../../../style/variable.style';
import { projectDataStore } from '../../../store/projectDataStore';
import { Check, Settings, X } from 'lucide-react';
import { modalStore } from '../../../store/modalStore';
import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '../../../service/api/task.api';
import type { iGetTaskByIdResult } from '../../../service/api_interface/taskApi.interface';
import { toastStore } from '../../../store/toastStore';
import { adjustColorBrightness, hexToRgba } from '../../../utils/colorFunc';
import { useEffect, useState } from 'react';
import TaskDetailInfo from './TaskDetail.info.comp';
import ChangeStatusBtn from './ChangeStatusBtn.comp';
import DeleteTaskBtn from './DeleteTaskBtn.comp';
import TaskDetailUpdate from './TaskDetailUpdate.comp';

interface Props {
	taskId: string;
}

const DisplayTaskDetail = ({ taskId }: Props) => {
	const [onUpdate, setOnUpdate] = useState(false);
	const { currentRole } = projectDataStore();
	const path: string | undefined = location.pathname.split('/').pop();
	const isOpen = modalStore((state) => state.isOpen);

	useEffect(() => {
		if (isOpen) {
			refetchTask();
		}
	}, [isOpen]);

	const {
		data: task,
		isSuccess,
		isLoading,
		isError,
		refetch: refetchTask,
	} = useQuery<iGetTaskByIdResult>({
		queryKey: ['task', taskId],
		queryFn: () => getTaskById({ task_id: taskId }),
		enabled: false,
	});

	if (isError) {
		modalStore.getState().closeModal();
		toastStore
			.getState()
			.setToast({
				message:
					'Une erreur est survenue lors de la recuperation de la tache',
				type: 'error',
			});
		return null;
	}

	if (isSuccess) {
		return (
			<>
				<DetailContainer>
					<DetailBtnContainer>
						{!onUpdate && (
							<>
								<ChangeStatusBtn
									task={task!}
									type='before'
									refetchTask={refetchTask}
									$location={path}
								/>
								<ChangeStatusBtn
									task={task!}
									type='after'
									refetchTask={refetchTask}
									$location={path}
								/>
							</>
						)}
						{(currentRole === 'OWNER' || currentRole === 'ADMIN')
							&& path === 'backlog' && (
								<>
									<DeleteTaskBtn taskId={task.id} />
									{task.statuts === 'BACKLOG'
										&& (onUpdate ? (
											<DetailButton
												form='update_task'
												type='submit'
												$color={color.success}>
												<Check />
											</DetailButton>
										) : (
											<>
												<DetailButton
													onClick={() => setOnUpdate(true)}
													$color={color.primary}>
													<Settings />
												</DetailButton>
											</>
										))}
								</>
							)}
						<DetailButton
							$color={color.error}
							onClick={
								onUpdate
									? () => setOnUpdate(false)
									: () => {
											modalStore.getState().closeModal();
										}
							}>
							<X />
						</DetailButton>
					</DetailBtnContainer>
					{onUpdate ? (
						<TaskDetailUpdate
							refetchTask={refetchTask}
							setOnUpdate={setOnUpdate}
							task={task}
						/>
					) : (
						<TaskDetailInfo
							refetchTask={refetchTask}
							task={task}
							isLoading={isLoading}
							$location={path as string}
						/>
					)}
				</DetailContainer>
			</>
		);
	}
};

export default DisplayTaskDetail;

export const DetailContainer = styled.div`
	position: relative;
	height: 100%;
	width: 33%;
	border-left: 0.2rem solid ${color.primary};
	background-color: ${color.light};
	overflow-y: scroll;

	/* Standard moderne (Firefox + Chrome 121+) */
	scrollbar-width: thin;
	scrollbar-color: ${color.third} transparent;

	/* Webkit (Chrome/Safari/Edge) */
	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: ${color.third};
	}
`;

export const DetailBtnContainer = styled.section`
	position: sticky;
	width: fit-content;
	float: right;
	top: 10px;
	right: 10px;
	display: flex;
	gap: 1rem;
`;

export const DetailButton = styled.button<{ $color?: string }>`
	cursor: pointer;
	display: flex;
	gap: 1rem;
	background-color: ${color.light};
	border: 0.2rem solid ${({ $color }) => $color || color.primary};
	border-radius: 0.5rem;
	padding: 0.2rem;
	svg {
		width: 2rem;
		height: 2rem;
	}
	color: ${({ $color }) => $color || color.primary};

	&:hover {
		background-color: ${({ $color }) => $color || color.primary};
		color: ${color.light};
	}

	&:disabled {
		color: ${adjustColorBrightness(color.dark, 0.5)};
		background-color: ${color.light};
		cursor: not-allowed;
		border: 0.2rem solid ${adjustColorBrightness(color.dark, 0.5)};
	}
`;

export const DetailContent = styled.section`
	padding: 1rem 2rem 2rem 2rem;
`;

export const DetailLine = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const DetailTitle = styled.label`
	text-align: left;
	font-weight: ${typography.weight.normal};
	text-decoration: underline;
	font-size: ${typography.desktop.m};
	font-family: ${typography.fontPrimary};
	color: ${color.primary};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.m};
	}
`;

export const DetailTextContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 0.7rem;
`;

export const DetailText = styled.p<{ $color?: string }>`
	text-align: right;
	font-size: ${typography.desktop.m};
	font-family: ${typography.fontPrimary};
	color: ${({ $color }) => $color || color.dark};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.m};
	}
`;

export const DetailInput = styled.input`
	padding-right: 1rem;
	align-self: flex-end;
	text-align: right;
	width: 75%;
	outline: none;
	margin: 0;
	font-size: ${typography.desktop.m};
	font-family: ${typography.fontPrimary};
	color: ${color.dark};
	border: none;
	background-color: ${color.light};
	border-bottom: 2px solid ${color.primary};
`;

export const DetailTextArea = styled.textarea`
	padding-right: 1rem;
	align-self: flex-end;
	text-align: right;
	width: 75%;
	outline: none;
	margin: 0;
	font-size: ${typography.desktop.m};
	font-family: ${typography.fontPrimary};
	color: ${color.dark};
	border: none;
	background-color: ${color.light};
	border-bottom: 2px solid ${color.primary};
`;

export const DetailSelect = styled.select`
	padding-right: 1rem;
	height: fit-content;
	align-self: flex-end;
	text-align: right;
	width: 75%;
	outline: none;
	margin: 0;
	font-size: ${typography.desktop.m};
	font-family: ${typography.fontPrimary};
	color: ${color.dark};
	border: none;
	background-color: ${color.light};
	border-bottom: 2px solid ${color.primary};

	appearance: none;
`;

export const DetailImage = styled.a`
	position: relative;
	padding: 2rem;
	margin: auto;

	img {
		max-width: 100%;
		max-height: 250px;
		object-fit: contain;
	}

	button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background-color: transparent;
		border: none;
		cursor: pointer;
		svg {
			width: 2rem;
			height: 2rem;
			color: ${color.error};
		}

		&:hover {
			opacity: 0.7;
		}
	}
`;

export const DetailSecondaryBtn = styled.button<{ $color?: string }>`
	cursor: pointer;
	border: none;
	color: ${({ $color }) => $color || color.primary};
	transition: opacity 0.3s ease;

	&:hover {
		opacity: 0.5;
	}

	svg {
		width: 2rem;
		height: 2rem;
	}
`;

export const DetailInputContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	input {
		text-align: center;
		outline: none;
		width: 5rem;
		padding: 0.2rem 0.5rem;
		border: none;
		background-color: ${color.light};
		border-bottom: 2px solid ${color.primary};
		font-size: ${typography.desktop.s};
		font-family: ${typography.fontPrimary};
		color: ${color.dark};

		&:focus {
			outline: none;
			additional-focus-styles: none;
			appearance: none;
		}

		@media (max-width: ${breakpoints.md}) {
			font-size: ${typography.mobile.s};
		}
	}

	label {
		font-size: ${typography.desktop.s};
		font-family: ${typography.fontPrimary};
		color: ${color.dark};

		@media (max-width: ${breakpoints.md}) {
			font-size: ${typography.mobile.s};
		}
	}
`;

export const DetailCheckBox = styled.div`
	&.hiden {
		label {
			cursor: default;
		}
		input {
			display: none;
		}
	}

	margin-top: 0.5rem;
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
	line-height: ${typography.desktop.m};

	label {
		cursor: pointer;
		text-align: right;
		font-size: ${typography.desktop.m};
		font-family: ${typography.fontPrimary};
		color: ${color.dark};

		@media (max-width: ${breakpoints.md}) {
			font-size: ${typography.mobile.m};
		}

		&.done {
			color: ${adjustColorBrightness(color.dark, 0.4)};
		}
	}

	input {
		cursor: pointer;
		margin-top: 0.2rem;
		padding: 0.5rem;

		&:focus {
			outline: none;
			box-shadow: 0px 1px 1px 1px ${hexToRgba(color.dark, 0.1)} inset;
		}

		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;

		width: 18px;
		height: 18px;
		border: 2px solid ${color.primary};
		border-radius: 4px;
		background: ${color.light};
		cursor: pointer;
		transition: all 0.2s ease;

		&:checked {
			background: ${color.primary};
			outline: 2px solid ${hexToRgba(color.primary, 0.75)};
			position: relative;
		}

		&:checked::after {
			content: '';
			position: absolute;
			top: 1px;
			left: 5px;
			width: 5px;
			height: 10px;
			border-right: 2px solid ${color.light};
			border-bottom: 2px solid ${color.light};
			transform: rotate(45deg);
		}

		&:hover {
			box-shadow: 0 0 4px ${hexToRgba(color.primary, 0.4)};
		}
	}
`;