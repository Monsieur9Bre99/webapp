import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from '../store/authStore';
import { NotificationProvider } from '../context/NotificationContext';

const ConnectedLayout = () => {
	const { isLogged, userId } = authStore();
	if (!userId) return <Navigate to={'/login'} />;

	if (!isLogged) return <Navigate to={'/login'} />;

	return (
		<NotificationProvider userId={userId}>
			<Outlet />
		</NotificationProvider>
	);
};

export default ConnectedLayout;
