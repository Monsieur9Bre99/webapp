import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from '../store/authStore';

const NotConnected = () => {
	const { isLogged } = authStore();
	return <>{!isLogged ? <Outlet /> : <Navigate to={'/user'} />}</>;
};

export default NotConnected;
