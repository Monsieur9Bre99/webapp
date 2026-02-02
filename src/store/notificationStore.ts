import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Notification {
	_id: string;
	category: string;
	title: string;
	content: string;
	payload: Record<string, any>;
	status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
	sentAt: Date;
	readAt?: Date | null;
	channel: ('email' | 'sms' | 'push' | 'in-app')[];
	used: boolean;
}

interface NotificationState {
	notifications: Notification[];
	unreadCount: number;

	addNotification: (notification: Notification) => void;
	updateNotificationStatus: (id: string, status: string) => void;
	markAllAsRead: () => void;
	unactiveNotification: (id: string) => void;
	clearNotifications: () => void;
	setNotifications: (notifications: Notification[]) => void;
}

export const notificationStore = create<NotificationState>()(
	devtools(
		persist(
			(set) => ({
				notifications: [],
				unreadCount: 0,

				addNotification: (notification) =>
					set((state) => {
						const exists = state.notifications.find(
							(n) => n._id === notification._id,
						);
						if (!exists) {
							const newNotifications = [
								notification,
								...state.notifications,
							];
							return {
								notifications: newNotifications,
								unreadCount: newNotifications.filter(
									(n) => n.status !== 'read',
								).length,
							};
						}
						return {
							notifications: state.notifications.map((n) =>
								n._id === notification._id ? notification : n,
							),
							unreadCount: state.notifications.filter(
								(n) => n.status !== 'read',
							).length,
						};
					}),

				updateNotificationStatus: (id, status) =>
					set((state: any) => ({
						notifications: state.notifications.map((n: Notification) =>
							n._id === id ? { ...n, status } : n,
						),
						unreadCount: state.notifications.filter(
							(n: Notification) => n._id !== id && n.status !== 'read',
						).length,
					})),

				markAllAsRead: () =>
					set((state) => ({
						notifications: state.notifications.map((n) => ({
							...n,
							status: 'read' as const,
						})),
						unreadCount: 0,
					})),

				unactiveNotification: (id) =>
					set((state) => ({
						notifications: state.notifications.map((n) => ({
							...n,
							used: n._id === id ? true : n.used,
						})),
						unreadCount: state.notifications.filter(
							(n) => n.status !== 'read',
						).length,
					})),

				clearNotifications: () =>
					set({ notifications: [], unreadCount: 0 }),

				setNotifications: (notifications) => {
					const unreadCount = notifications.filter(
						(n) => n.status !== 'read',
					).length;
					set({ notifications, unreadCount });
				},
			}),
			{
				name: 'notification-storage', // clé localStorage
			},
		),
		{ name: 'NotificationStore' }, // DevTools
	),
);
