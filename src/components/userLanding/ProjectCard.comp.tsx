import styled from 'styled-components';
import Badge from '../../prefab/Badge.prefab';
import Button from '../../prefab/Button.prefab';
import { Card } from '../../style/card.styledComp';
import {
	badgeColor,
	breakpoints,
	color,
	typography,
} from '../../style/variable.style';
import dateFormat from 'dateformat';
import { useMutation } from '@tanstack/react-query';
import type {
	iLeaveProjectData,
	iLeaveProjectResult,
} from '../../service/api_interface/memberApi.interface';
import { leaveProject } from '../../service/api/member.api';
import { deleteProject } from '../../service/api/project.api';
import type { iDeleteProjectResult } from '../../service/api_interface/projectApi.interface';
import { popupStore } from '../../store/popupStore';
import { displayStore } from '../../store/displayStore';
import { useNavigate } from 'react-router-dom';

interface Props {
	refetchProjectList: () => void;
	role: 'OWNER' | 'ADMIN' | 'COLLAB' | 'GUEST';
	project: {
		id: string;
		title: string;
		description?: string | null;
		date_start: Date;
		date_end: Date;
	};
}

const ProjectCard = ({ refetchProjectList, role, project }: Props) => {
	const navigate = useNavigate();
	const { setPopup } = popupStore();

	const sliceIndex =
		displayStore.getState().displayType === 'mobile' ? 100 : 250;
	let description = project.description;
	if (!description || description.trim().length === 0) {
		description = 'Aucune description pour le moment.';
	} else if (description && description.length > sliceIndex) {
		description = description?.substring(0, sliceIndex) + ' ...';
	}

	let colorBadge;
	switch (role) {
		case 'OWNER':
			colorBadge = badgeColor.owner;
			break;
		case 'ADMIN':
			colorBadge = badgeColor.admin;
			break;
		case 'COLLAB':
			colorBadge = badgeColor.collab;
			break;
		case 'GUEST':
			colorBadge = badgeColor.guest;
			break;
		default:
			break;
	}

	const leaveProjectQuery = useMutation<
		iLeaveProjectResult,
		Error,
		iLeaveProjectData
	>({
		mutationKey: ['leave_project'],
		mutationFn: (data) => leaveProject(data),
		onSuccess: () => {
			refetchProjectList();
		},
	});

	const deleteProjectQuery = useMutation<
		iDeleteProjectResult,
		Error,
		{ project_id: string | undefined }
	>({
		mutationKey: ['delete_project'],
		mutationFn: (data) => deleteProject(data.project_id),
		onSuccess: () => {
			refetchProjectList();
		},
	});

	return (
		<ProjectCardContainer>
			<ProjectCardHeader>
				<ProjectCardTitle>{project.title}</ProjectCardTitle>
				<Badge
					text={role}
					$backgroundColor={colorBadge}
				/>
			</ProjectCardHeader>
			<ProjectCardText>{description}</ProjectCardText>
			<ProjectCardFooter>
				<p>{`date de debut : ${dateFormat(
					project.date_start,
					'dd/mm/yyyy',
				)}`}</p>
				<p>{`date de fin :  ${dateFormat(
					project.date_end,
					'dd/mm/yyyy',
				)}`}</p>
				<ProjectCardBtnContainer>
					{role === 'OWNER' ? (
						<Button
							onClick={() =>
								setPopup({
									message:
										'Etes vous sur de vouloir supprimer le projet ?',
									action: () =>
										deleteProjectQuery.mutate({
											project_id: project.id,
										}),
								})
							}
							classname='outline'
							type='button'
							text='Supprimer'
							colors={{
								$textColor: color.error,
								$backgroundColor: color.error,
								$borderColor: color.error,
							}}
						/>
					) : (
						<Button
							onClick={() =>
								setPopup({
									message:
										'Etes vous sur de vouloir quitter le projet ?',
									action: () =>
										leaveProjectQuery.mutate({
											project_id: project.id,
										}),
								})
							}
							classname='outline'
							type='button'
							text='Quitter'
							colors={{
								$textColor: color.error,
								$backgroundColor: color.error,
								$borderColor: color.error,
							}}
						/>
					)}
					<Button
						onClick={() => navigate(`/project/${project.id}/dashboard`)}
						type='button'
						text='Voir'
					/>
				</ProjectCardBtnContainer>
			</ProjectCardFooter>
		</ProjectCardContainer>
	);
};

export default ProjectCard;

export const ProjectCardContainer = styled(Card)`
	width: 95%;
	min-height: 25rem;
	padding: 2rem;

	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: space-between;

	@media (max-width: ${breakpoints.md}) {
		width: 100%;
		height: fit-content;
	}
`;

const ProjectCardHeader = styled.section`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 1.5rem;

	@media (max-width: ${breakpoints.md}) {
		gap: 1rem;
	}
`;

const ProjectCardTitle = styled.h2`
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xl};
	font-weight: ${typography.weight.bold};
	color: ${color.secondary};
	line-height: ${typography.desktop.xl};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.xl};
		line-height: ${typography.mobile.xl};
	}
`;

const ProjectCardText = styled.p`
	padding: 1.5rem 0;
	text-align: justify;
	font-family: ${typography.fontSecondary};
	font-size: ${typography.desktop.m};
	font-weight: ${typography.weight.thinner};
	color: ${color.dark};
	line-height: ${typography.desktop.m};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.s};
		line-height: ${typography.mobile.s};
	}
`;

const ProjectCardFooter = styled.section`
	display: flex;
	gap: 1.5rem;
	align-items: center;
	justify-content: space-between;

	@media (max-width: ${breakpoints.md}) {
		gap: 1.5rem;
		flex-direction: column;
		align-items: flex-start;
	}

	p {
		letter-spacing: 0.1rem;
		font-family: ${typography.fontSecondary};
		font-size: ${typography.desktop.s};
		font-weight: ${typography.weight.thin};
		color: ${color.dark};
		line-height: ${typography.desktop.s};

		@media (max-width: ${breakpoints.md}) {
			font-size: ${typography.mobile.xs};
			line-height: ${typography.mobile.xs};
		}
	}
`;

const ProjectCardBtnContainer = styled.section`
	display: flex;
	gap: 2.5rem;
	align-items: center;
	justify-content: space-between;
	@media (max-width: ${breakpoints.md}) {
		width: 100%;
		justify-content: space-around;
	}
`;
