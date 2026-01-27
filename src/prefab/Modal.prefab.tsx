import styled from 'styled-components';
import { hexWithAlpha } from '../utils/colorFunc';
import { color } from '../style/variable.style';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from 'react';
import { modalStore } from '../store/modalStore';

interface Props {
	$alignement?: 'start' | 'center' | 'end';
	children: React.ReactNode;
}

const Modal = ({ $alignement, children }: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const { isOpen } = modalStore();

	useGSAP(() => {
		gsap.set(ref.current, { x: '100%', autoAlpha: 0 });
	}, []);

	useEffect(() => {
		if (isOpen) {
			gsap.to(ref.current, {
				autoAlpha: 1,
				x: 0,
				duration: 0.5,
			});
		} else {
			gsap.to(ref.current, {
				autoAlpha: 0,
				x: '100%',
				duration: 0.5,
			});
		}
	}, [isOpen]);

	return (
		<ModalContainer
			$alignement={$alignement || 'center'}
			ref={ref}
			onClick={(e) => modalStore.getState().closeModal(e)}>
			{children}
		</ModalContainer>
	);
};

export default Modal;

const ModalContainer = styled.div<{ $alignement: 'start' | 'center' | 'end' }>`
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background-color: ${hexWithAlpha(color.dark, 0.5)};
	display: flex;
	justify-content: ${({ $alignement }) => $alignement};
	align-items: center;
`;
