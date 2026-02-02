import { useEffect, useState } from 'react';
import Button from '../../prefab/Button.prefab';
import { authStore } from '../../store/authStore';
import { notificationStore } from '../../store/notificationStore';
import { Bell, X } from 'lucide-react';
import styled from 'styled-components';
import { color, typography } from '../../style/variable.style';
import { adjustColorBrightness, hexToRgba } from '../../utils/colorFunc';
import NotificationItem from './NotificationItem.comp';
import { useNotifications } from '../../context/NotificationContext';

interface Props {
	refetchProjectList: () => void;
}

const NotificationContainer = ({ refetchProjectList }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const userId = authStore((state) => state.userId);
	const { notifications, unreadCount } = notificationStore();

	const { markAllRead } = useNotifications();

	useEffect(() => {
		if (!userId) return;
	}, []);

	return (
		<NotifWrapper>
			<BtnContainer>
				{!isOpen ? (
					<>
						<Button
							onClick={() => setIsOpen(true)}
							type='button'
							text={<Bell style={{ width: '2rem', height: '2rem' }} />}
						/>
						{unreadCount > 0 && (
							<New onClick={() => setIsOpen(true)}>
								<p>{unreadCount}</p>
							</New>
						)}
					</>
				) : (
					<Button
						onClick={() => setIsOpen(false)}
						type='button'
						text={<X style={{ width: '2rem', height: '2rem' }} />}
					/>
				)}
			</BtnContainer>

			{isOpen && (
				<NotifContent onMouseLeave={() => setIsOpen(false)}>
					<NotifList>
						{notifications.map((notification) => (
							<NotificationItem
								key={notification._id}
								notification={notification}
								refetchProjectList={refetchProjectList}
							/>
						))}
					</NotifList>
					<NotifFooter>
						<NotifBtn
							type='button'
							color={color.primary}
							onClick={() => markAllRead()}>
							tous marquer comme lu
						</NotifBtn>
					</NotifFooter>
				</NotifContent>
			)}
		</NotifWrapper>
	);
};

export default NotificationContainer;

const NotifWrapper = styled.div`
	position: relative;
`;

const BtnContainer = styled.div`
	position: relative;
`;

const New = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
	position: absolute;
	bottom: 0.5rem;
	right: 0.5rem;
	width: 1.5rem;
	height: 1.5rem;
	background-color: ${color.error};
	border-radius: 50%;

    p {

        font-size: 1rem};
        font-weight: ${typography.weight.bold};
        color: ${color.light};
    }
`;

const NotifContent = styled.div`
	z-index: 99;
	overflow: hidden;
	position: absolute;
	background-color: ${color.light};
	top: 110%;
	right: 0;
	height: 50rem;
	max-height: 50rem;
	width: 40rem;
	border: 0.2rem solid ${color.primary};
	border-radius: 1rem;
	box-shadow: 0px 4px 3px 1px ${hexToRgba(color.dark, 0.35)};
`;

const NotifList = styled.ul`
	list-style: none;
	height: 93%;
	overflow-y: scroll;

	/* Standard moderne (Firefox + Chrome 121+) */
	scrollbar-width: none;
	scrollbar-color: ${color.third} transparent;
`;

export const NotifItem = styled.li`
	padding: 1rem;
	border-bottom: 0.2rem solid ${color.primary};
	height: fit-content;

	&:hover {
		background-color: ${adjustColorBrightness(color.light, -0.05)};
	}
	position: relative;
`;

export const NotifItemHeader = styled.div`
	cursor: pointer;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const NotifFooter = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	border-top: 0.2rem solid ${color.primary};
	height: 7%;
	box-shadow: 0px -2px 3px 1px ${hexToRgba(color.dark, 0.15)};
`;

export const NotifTitle = styled.h3`
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.normal};
	font-family: ${typography.fontPrimary};
	color: ${color.dark};
`;

export const NotifItemContent = styled.div`
	padding: 0.5rem;
`;

export const NotifItemTxtContent = styled.p`
	text-align: left;
	font-size: ${typography.desktop.xs};
	font-weight: ${typography.weight.thin};
	font-family: ${typography.fontPrimary};
	color: ${color.dark};
`;

export const NotifContentBtn = styled.div`
	padding: 0.5rem;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`;

export const NotifBtn = styled.button<{ color?: string }>`
	cursor: pointer;
	font-size: ${typography.desktop.xs};
	font-weight: ${typography.weight.normal};
	font-family: ${typography.fontPrimary};
	color: ${(colors) => colors.color || color.dark};
	background-color: transparent;
	border: none;
`;

export const NotifDate = styled.p`
	text-align: left;
	font-size: 1.2rem;
	font-weight: ${typography.weight.thin};
	font-family: ${typography.fontPrimary};
	color: ${color.dark};
`;

export const Dot = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 0.5rem;
	height: 100%;
	background-color: ${color.success};
`;
