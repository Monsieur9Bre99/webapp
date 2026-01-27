import { type iMemberInfoFormated } from '../../../../store/projectDataStore';
import {
	ParamCardContent,
	ParamCardRow,
	ParamCardText,
} from '../../../../style/paramCard.styledComp';

interface Props {
	allMembers: iMemberInfoFormated[];
}

const MemberInfo = ({ allMembers }: Props) => {
	return (
		<ParamCardContent>
			{allMembers &&
				allMembers.map((member) => (
					<ParamCardRow
						key={member.id}
						$columns='20% 35% 19% 15% 11%'>
						<ParamCardText>
							{member?.firstname} {member?.lastname}
						</ParamCardText>
						<ParamCardText>{member?.email}</ParamCardText>
						<ParamCardText>{member?.username}</ParamCardText>
						<ParamCardText>{member?.role}</ParamCardText>
						<ParamCardText>
							{member?.is_confirmed ? 'Confirmé' : 'En attente'}
						</ParamCardText>
					</ParamCardRow>
				))}
		</ParamCardContent>
	);
};

export default MemberInfo;
