import { useDraggable } from '@dnd-kit/core';
import styled from 'styled-components';
import { color, typography } from '../../../style/variable.style';
import type { iTaskinfo } from '../../../store/projectDataStore';
import { hexToRgba, percentColor } from '../../../utils/colorFunc';
import Badge from '../../../prefab/Badge.prefab';
import {
	calculateProgress,
	clalculateTimeFromTimestamp,
} from '../../../utils/calculFunc';
import { modalStore } from '../../../store/modalStore';
import { Eye } from 'lucide-react';

interface Props {
	task: iTaskinfo;
	setDisplayTask: (taskId: string) => void;
}

const Ticket = ({ task, setDisplayTask }: Props) => {
	const { isDragging, attributes, listeners, setNodeRef, transform } =
		useDraggable({ id: task.id, data: { type: task.statuts } });

	const style = transform
		? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
		: undefined;

	const progress = calculateProgress(
		task?.subtasks.map((subtask) => subtask.is_done),
	);

	const rubbonColor = { LOW: '#01a21c', MEDIUM: '#d28c00', HIGH: '#c62007' };

	return (
		<Container
			className={isDragging ? 'dragging' : ''}
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}>
			<TicketTitle>{task.title}</TicketTitle>
			<TicketLine>
				<TicketText>{`categorie : ${task.task_category.title}`}</TicketText>
				<TicketText
					$color={
						percentColor(Number(progress)) || color.dark
					}>{`${progress}%`}</TicketText>
			</TicketLine>
			<TicketUser>
				{task.user_assigned?.map((u) => (
					<Badge
						key={u.user.id}
						text={u.user.username}
						$textColor={color.light}
						$backgroundColor={color.secondary}
					/>
				))}
			</TicketUser>
			<TicketText>
				{`delai : ${
					task.delay && task.delay > 0
						? clalculateTimeFromTimestamp(task.delay)
						: ' aucun'
				}`}
			</TicketText>
			<TicketLine>
				<TicketText>
					{`temps travailler : ${
						task?.worked_time
							? clalculateTimeFromTimestamp(task.worked_time)
							: 'aucun'
					}`}
				</TicketText>
				<TicketBtn
					onClick={(e) => {
						e.stopPropagation();
						setDisplayTask(task.id);
						modalStore.getState().openModal();
					}}>
					<Eye />
				</TicketBtn>
			</TicketLine>
			<Rubbon $color={rubbonColor[task.priority]}>
				<div></div>
			</Rubbon>
		</Container>
	);
};

export default Ticket;

const Container = styled.section`
	overflow: hidden;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	padding: 1rem;
	position: relative;
	width: 85%;
	background-color: ${color.light};
	border: 0.2rem solid ${color.primary};
	color: ${color.dark};
	border-radius: 1rem;
	box-shadow: 0px 1px 2px 1px ${hexToRgba(color.dark, 0.5)};
	cursor: pointer;

	&.dragging {
		z-index: 100;
		pointer-events:;
		cursor: grabbing;
		box-shadow: 0px 3px 3px 2px ${hexToRgba(color.dark, 0.3)};
	}
`;

const Rubbon = styled.div<{ $color?: string }>`
	position: absolute;
	top: 0;
	right: -16px;
	width: 7rem;
	height: 1.2rem;
	transform: rotate(45deg);
	background-color: ${({ $color }) => $color || color.primary};

	div {
		position: absolute;
		top: 0;
		right: 0;
		width: 7rem;
		height: 0.5rem;
		background-color: ${hexToRgba(color.light, 0.3)};
	}
`;

const TicketTitle = styled.h3`
	margin: 0;
	color: ${color.primary};
	font-size: ${typography.desktop.s};
	font-family: ${typography.fontPrimary};
	font-weight: ${typography.weight.normal};
	text-align: left;
`;

const TicketText = styled.p<{ $color?: string }>`
	color: ${({ $color }) => $color || color.dark};
	font-size: ${typography.desktop.s};
	font-family: ${typography.fontPrimary};
	font-weight: ${typography.weight.normal};
	text-align: left;
`;

const TicketUser = styled.div`
	width: 100%;
	display: flex;
	gap: 0.5rem;
`;

const TicketLine = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: 0.5rem;
`;

const TicketBtn = styled.button`
	color: ${color.third};
	&:hover {
		color: ${color.primary};
	}
`;
