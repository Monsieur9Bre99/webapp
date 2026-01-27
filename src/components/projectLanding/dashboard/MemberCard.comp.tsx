import { useEffect, useState } from 'react';
import {
	DashboardCard,
	DashboardCardContent,
	DashboardText,
	DashboardTitle,
} from '../../../pages/projectLanding/ProjectLanding.Dashboard.page';
import {
	projectDataStore,
	type iMemberInfoFormated,
} from '../../../store/projectDataStore';
import styled from 'styled-components';
import { color, typography } from '../../../style/variable.style';

interface Props {
	name: 'Administrateur' | 'Collaborateur' | 'Invité' | 'En attente';
}

const MemberCard = ({ name }: Props) => {
	const { projectMembers } = projectDataStore();

	const [displayedMembers, setDisplayedMembers] = useState<
		iMemberInfoFormated[]
	>([]);

	useEffect(() => {
		if (!projectMembers) return;

		switch (name) {
			case 'Administrateur':
				setDisplayedMembers(projectMembers.admin);
				break;

			case 'Collaborateur':
				setDisplayedMembers(projectMembers.collab);
				break;

			case 'Invité':
				setDisplayedMembers(projectMembers.guest);
				break;

			case 'En attente':
				setDisplayedMembers(projectMembers.notConfirmed);
				break;
		}
	}, [projectMembers]);

	return (
		<DashboardCard>
			<DashboardTitle>{name} :</DashboardTitle>
			<DashboardCardContent>
				{displayedMembers.length === 0 && (
					<DashboardText>Aucun membre</DashboardText>
				)}
				{displayedMembers.map((member) => (
					<MemberLine key={member.id}>
						<MemberInfo>
							{member.firstname} {member.lastname}
						</MemberInfo>
						<Sep></Sep>
						<MemberInfo>{member.email}</MemberInfo>
						<Sep></Sep>
						<MemberInfo>{member.username}</MemberInfo>
					</MemberLine>
				))}
			</DashboardCardContent>
		</DashboardCard>
	);
};

export default MemberCard;

const MemberLine = styled.div`
	display: grid;
	grid-template-columns: 25% 0.1% 54.8% 0.1% 20%;
	grid-template-rows: auto;

	&:hover {
		p {
			font-weight: ${typography.weight.bolder};
		}

		div {
			width: 0.2rem;
		}
	}
`;

const MemberInfo = styled.p`
	text-align: center;
	font-family: ${typography.fontSecondary};
	font-size: ${typography.desktop.xs};
	font-weight: ${typography.weight.normal};

	transition: all 0.2s ease-in-out;

	&:nth-child(1) {
		text-align: left;
	}
	&:nth-child(5) {
		text-align: right;
	}
`;

const Sep = styled.div`
	transition: all 0.2s ease-in-out;
	margin: auto 0;
	width: 0.1rem;
	height: 100%;
	background-color: ${color.primary};
`;
