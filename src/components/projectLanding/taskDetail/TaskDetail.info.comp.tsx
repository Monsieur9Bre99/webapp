import { color } from '../../../style/variable.style';
import dateFormat from 'dateformat';
import Separator from '../../../prefab/Separator.prefab';
import { hexWithAlpha } from '../../../utils/colorFunc';
import { traductePriority, traducteStatus } from '../../../utils/textFunc';
import {
	DetailContent,
	DetailLine,
	DetailTitle,
	DetailText,
	DetailImage,
} from './DisplayTaskDetail.comp';
import type { iGetTaskByIdResult } from '../../../service/api_interface/taskApi.interface';
import Loader from '../../../prefab/Loader.prefab';
import SubtaskList from './SubtaskList.comp';
import AddWorkedTime from './AddWorkedTime.comp';
import AddDelay from './AddDelay.comp';

interface Props {
	task: iGetTaskByIdResult | undefined;
	isLoading: boolean;
	$location: string | undefined;
	refetchTask: () => void;
}

const TaskDetailInfo = ({ task, isLoading, $location, refetchTask }: Props) => {
	const canBeModified: boolean =
		task?.statuts !== 'ON_GOING' || $location !== 'kanban' ? true : false;

	return (
		<DetailContent>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<DetailLine>
						<DetailTitle>Titre :</DetailTitle>
						<DetailText>{task?.title || 'Aucun titre'}</DetailText>
					</DetailLine>
					<DetailLine>
						<DetailTitle>Description :</DetailTitle>
						<DetailText>
							{task?.description || 'Aucune description'}
						</DetailText>
					</DetailLine>

					<Separator
						width='85%'
						color={[
							hexWithAlpha(color.primary, 0.0),
							hexWithAlpha(color.primary, 1.0),
							hexWithAlpha(color.primary, 0.0),
						]}
					/>
					<DetailLine>
						<DetailTitle>Categorie :</DetailTitle>
						<DetailText>
							{(task?.task_category && task?.task_category.title)
								|| 'Aucune categorie'}
						</DetailText>
					</DetailLine>
					<DetailLine>
						<DetailTitle>Priorité :</DetailTitle>
						<DetailText>
							{(task?.priority && traductePriority(task?.priority))
								|| 'Aucune priorite'}
						</DetailText>
					</DetailLine>
					<DetailLine>
						<DetailTitle>Etat :</DetailTitle>
						<DetailText>
							{traducteStatus(task?.statuts as string) || 'Aucun etat'}
						</DetailText>
					</DetailLine>

					<Separator
						width='85%'
						color={[
							hexWithAlpha(color.primary, 0.0),
							hexWithAlpha(color.primary, 1.0),
							hexWithAlpha(color.primary, 0.0),
						]}
					/>
					<AddDelay
						taskId={task?.id as string}
						backlog={task?.statuts === 'BACKLOG'}
						delay={task?.delay}
						refetchTask={refetchTask}
					/>
					{task?.statuts !== 'BACKLOG' && (
						<>
							<DetailLine>
								<DetailTitle>Date de debut :</DetailTitle>
								<DetailText>
									{task?.date_start
										? dateFormat(task?.date_start, 'dd/mm/yyyy')
										: 'tâche non commencée'}
								</DetailText>
							</DetailLine>
							<AddWorkedTime
								$location={$location}
								taskId={task?.id as string}
								onGoing={task?.statuts === 'ON_GOING'}
								workedTime={task?.worked_time}
								refetchTask={refetchTask}
							/>
							{task?.statuts === 'FINISHED' && (
								<DetailLine>
									<DetailTitle>Date de fin :</DetailTitle>
									<DetailText>
										{task?.date_end
											? dateFormat(task?.date_end, 'dd/mm/yyyy')
											: 'tâche non terminée'}
									</DetailText>
								</DetailLine>
							)}
						</>
					)}

					<Separator
						width='85%'
						color={[
							hexWithAlpha(color.primary, 0.0),
							hexWithAlpha(color.primary, 1.0),
							hexWithAlpha(color.primary, 0.0),
						]}
					/>
					<DetailLine>
						<DetailTitle>Membre(s) assigné(s) :</DetailTitle>
						{task?.user_assigned && task?.user_assigned.length > 0 ? (
							task?.user_assigned.map((member) => (
								<DetailText
									key={
										member.user.id
									}>{`${member.user.firstname} ${member.user.lastname}, ${member.user.username}`}</DetailText>
							))
						) : (
							<DetailText>Aucun membre assigné</DetailText>
						)}
					</DetailLine>

					{task?.subtasks && task?.subtasks.length > 0 && (
						<SubtaskList
							task_id={task.id}
							canBeModified={canBeModified}
						/>
					)}
				</>
			)}

			{task?.image && (
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
						<DetailImage
							target='_blank'
							href={task?.image}>
							<img
								src={task?.image}
								alt='image de la tâche'
								loading='lazy'
							/>
						</DetailImage>
					</DetailLine>
				</>
			)}
		</DetailContent>
	);
};

export default TaskDetailInfo;
