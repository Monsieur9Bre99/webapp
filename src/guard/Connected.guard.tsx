import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from '../store/authStore';

const Connected = () => {
	const { isLogged } = authStore();
	return <>{isLogged ? <Outlet /> : <Navigate to={'/login'} />}</>;
};

export default Connected;
