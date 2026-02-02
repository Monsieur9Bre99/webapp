import { useMutation } from '@tanstack/react-query';
import type {
	iAcceptInvitationData,
	iAcceptInvitationResult,
	iDeclineInvitationData,
	iDeclineInvitationResult,
} from '../../../service/api_interface/memberApi.interface';
import { toastStore } from '../../../store/toastStore';
import {
	acceptInvitation,
	declineInvitation,
} from '../../../service/api/member.api';
import type { Notification } from '../../../store/notificationStore';
import dateFormat from 'dateformat';
import { color } from '../../../style/variable.style';
import {
	NotifItemTxtContent,
	NotifContentBtn,
	NotifBtn,
	NotifDate,
} from '../Notification.comp';
import { useNotifications } from '../../../context/NotificationContext';

interface Props {
	notification: Notification;
	refetchProjectList: () => void;
}

const InvitaionNotification = ({ notification, refetchProjectList }: Props) => {
	const { usedNotification } = useNotifications();

	const declineInvitationQuery = useMutation<
		iDeclineInvitationResult,
		Error,
		iDeclineInvitationData
	>({
		mutationKey: ['deniedInvitation'],
		mutationFn: (data) => declineInvitation(data),
		onSuccess: () => {
			toastStore
				.getState()
				.setToast({ message: 'Invitation refusée', type: 'success' });
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({ message: 'Une erreur est survenue', type: 'error' });
		},
	});

	const acceptNotificationQuery = useMutation<
		iAcceptInvitationResult,
		Error,
		iAcceptInvitationData
	>({
		mutationKey: ['acceptInvitation'],
		mutationFn: (data) => acceptInvitation(data),
		onSuccess: () => {
			toastStore
				.getState()
				.setToast({ message: 'Invitation acceptée', type: 'success' });
			refetchProjectList();
		},
		onError: () => {
			toastStore
				.getState()
				.setToast({ message: 'Une erreur est survenue', type: 'error' });
		},
	});

	return (
		<>
			<NotifItemTxtContent>{notification.content}</NotifItemTxtContent>
			{notification.used === false && (
				<NotifContentBtn>
					<NotifBtn
						onClick={() => {
							acceptNotificationQuery.mutate({
								project_id: notification.payload.project_id,
							});
							usedNotification(notification._id);
						}}
						type='button'
						color={color.success}>
						accepter
					</NotifBtn>
					<NotifBtn
						onClick={() => {
							declineInvitationQuery.mutate({
								project_id: notification.payload.project_id,
							});
							usedNotification(notification._id);
						}}
						type='button'
						color={color.error}>
						refuser
					</NotifBtn>
				</NotifContentBtn>
			)}
			<NotifDate>{`Reçue le : ${dateFormat(notification.sentAt, 'dd/mm/yyyy HH:MM')}`}</NotifDate>
		</>
	);
};

export default InvitaionNotification;
