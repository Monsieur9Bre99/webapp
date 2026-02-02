import {
	Dot,
	NotifItem,
	NotifItemContent,
	NotifItemHeader,
	NotifTitle,
} from './Notification.comp';
import type { Notification } from '../../store/notificationStore';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import InvitaionNotification from './notification/InvitaionNotification.comp';
import { useNotifications } from '../../context/NotificationContext';

interface Props {
	notification: Notification;
	refetchProjectList: () => void;
}

const NotificationItem = ({ notification, refetchProjectList }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { markAsRead } = useNotifications();

	const renderContent = (notification: Notification) => {
		switch (notification.category) {
			case 'InvitationToProject':
				return (
					<InvitaionNotification
						refetchProjectList={refetchProjectList}
						notification={notification}
					/>
				);
			default:
				return null;
		}
	};

	const handleClick = () => {
		setIsOpen((prev) => !prev);

		if (notification.status === 'read' || notification.status === 'failed') {
			return;
		}

		markAsRead(notification._id);
	};

	return (
		<NotifItem>
			{notification.status !== 'read' && <Dot></Dot>}
			<NotifItemHeader onClick={() => handleClick()}>
				<NotifTitle>{notification.title}</NotifTitle>
				{isOpen ? (
					<Eye style={{ width: '2rem', height: '2rem' }} />
				) : (
					<EyeClosed style={{ width: '2rem', height: '2rem' }} />
				)}
			</NotifItemHeader>
			{isOpen && (
				<NotifItemContent>{renderContent(notification)}</NotifItemContent>
			)}
		</NotifItem>
	);
};

export default NotificationItem;
