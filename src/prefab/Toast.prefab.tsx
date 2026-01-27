import styled from 'styled-components';
import { breakpoints, color, typography } from '../style/variable.style';
import { adjustColorBrightness, hexToRgba } from '../utils/colorFunc';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from 'react';
import { toastStore } from '../store/toastStore';

const Toast = () => {
	const toastRef = useRef<HTMLDivElement>(null);
	const { toast } = toastStore();

	useGSAP(() => {
		if (toast) {
			gsap.set(toastRef.current, { x: '100%', autoAlpha: 0 });
			gsap.to(toastRef.current, {
				autoAlpha: 1,
				x: 0,
				duration: 0.5,
			});

			gsap.to(toastRef.current, {
				autoAlpha: 0,
				x: '100%',
				duration: 0.5,
				delay: 2,
			});
		}
	}, [toast]);

	useEffect(() => {
		if (toast) {
			const timer = setTimeout(() => {
				toastStore.getState().setToast(null);
			}, 2500);
			return () => clearTimeout(timer);
		}
	}, [toast]);

	if (toast) {
		return (
			<ToastContainer ref={toastRef}>
				<ToastMessage
					color={toast.type === 'success' ? color.success : color.error}>
					{toast.message}
				</ToastMessage>
			</ToastContainer>
		);
	}
};

export default Toast;

const ToastContainer = styled.div`
	z-index: 999;
	background-color: ${adjustColorBrightness(color.light, -0.05)};
	box-shadow: 0px 0px 3px 2px ${hexToRgba(color.dark, 0.5)};
	max-width: 90vw;
	bottom: 1rem;
	right: 1rem;
	position: fixed;
	border: 0.2rem solid ${color.primary};
	border-radius: 1rem;
	padding: 1rem 2rem;
`;

const ToastMessage = styled.p<{ color: string }>`
	color: ${({ color }) => color};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.normal};

	@media (max-width: ${breakpoints.lg}) {
		font-size: ${typography.mobile.s};
	}
`;
