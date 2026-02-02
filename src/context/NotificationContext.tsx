import { createContext, useState, useContext, useEffect } from 'react';
import { notificationStore } from '../store/notificationStore';
import { io, Socket } from 'socket.io-client';
import { toastStore } from '../store/toastStore';

interface NotificationContextType {
	markAsRead: (notificationId: string) => void;
	usedNotification: (notificationId: string) => void;
	markAllRead: () => void;
	unreadCount: number;
	isConnected: boolean;
}

interface Props {
	children: React.ReactNode;
	userId: string;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children, userId }: Props) => {
	const {
		markAllAsRead,
		addNotification,
		updateNotificationStatus,
		unactiveNotification,
		unreadCount,
	} = notificationStore();

	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		if (!userId) return;

		const socket = io(
			import.meta.env.VITE_API_NOTIFICATION_URL || 'http://localhost:3003',
			{ autoConnect: true, reconnection: true, reconnectionAttempts: 5 },
		);

		setSocket(socket);

		socket.emit('joinUser', userId);

		socket.on('notificationUpdated', (notification) => {
			addNotification(notification);
			if (notification.status !== 'read') {
				toastStore
					.getState()
					.setToast({ message: notification.title, type: 'info' });
			}
		});

		socket.on('notificationRead', (notificationId) => {
			updateNotificationStatus(notificationId, 'read');
		});

		socket.on('notificationUsed', (notificationId) => {
			unactiveNotification(notificationId);
		});

		socket.on('markAllAsRead', () => {
			markAllAsRead();
		});

		socket.on('connect', () => setIsConnected(true));
		socket.on('disconnect', () => setIsConnected(false));

		return () => {
			socket.disconnect();
		};
	}, [userId]);

	const markAsRead = (notificationId: string) => {
		socket?.emit('notificationRead', { notificationId, userId });
	};

	const usedNotification = (notificationId: string) => {
		socket?.emit('notificationUsed', { notificationId, userId });
	};

	const markAllRead = () => {
		socket?.emit('markAllAsRead', userId);
	};

	return (
		<NotificationContext.Provider
			value={{
				markAsRead,
				usedNotification,
				markAllRead,
				unreadCount,
				isConnected,
			}}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotifications = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error('useNotifications doit être dans NotificationProvider');
	}
	return context;
};
