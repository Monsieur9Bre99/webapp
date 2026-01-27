import { useEffect } from 'react';
import { projectDataStore } from '../../store/projectDataStore';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectParamCard from '../../components/projectLanding/parameter/project/ProjectParamCard.comp';
import MemberParamCard from '../../components/projectLanding/parameter/member/MemberParamCard.comp';
import TaskParamCard from '../../components/projectLanding/parameter/task/TaskParamCard.comp';

const Parameter = () => {
	const navigate = useNavigate();
	const { project_id } = useParams();
	const { currentRole } = projectDataStore();

	useEffect(() => {
		if (currentRole !== 'OWNER' && currentRole !== 'ADMIN') {
			navigate(`/project/${project_id}/dashboard`);
		}
	}, [currentRole]);

	return (
		<>
			<ProjectParamCard />
			<MemberParamCard />
			<TaskParamCard />
		</>
	);
};

export default Parameter;
