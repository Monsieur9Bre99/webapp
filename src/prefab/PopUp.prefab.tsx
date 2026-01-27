import styled from 'styled-components';
import { adjustColorBrightness, hexToRgba } from '../utils/colorFunc';
import { breakpoints, color, typography } from '../style/variable.style';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import Button from './Button.prefab';
import { popupStore } from '../store/popupStore';

const PopUp = () => {
	const popupRef = useRef<HTMLDivElement>(null);
	const { popup, setPopup } = popupStore();

	const closePopup = () => {
		if (popupRef.current) {
			gsap.to(popupRef.current, {
				autoAlpha: 0,
				y: '-100%',
				duration: 0.5,
				onComplete: () => setPopup(null),
			});
		}
	};

	useEffect(() => {
		if (!popup || !popupRef.current) return;
		gsap.set(popupRef.current, { y: '-100%', autoAlpha: 0 });
		gsap.to(popupRef.current, {
			autoAlpha: 1,
			y: 0,
			duration: 0.5,
		});
	}, [popup]);

	if (popup) {
		return (
			<PopUpContainer ref={popupRef}>
				<PopUpMessage>{popup.message}</PopUpMessage>
				<PopUpBtnContainer>
					<Button
						onClick={() => closePopup()}
						type='button'
						text='Non'
						colors={{
							$textColor: color.light,
							$backgroundColor: color.error,
							$borderColor: color.error,
						}}
					/>
					<Button
						onClick={() => {
							popup.action();
							closePopup();
						}}
						type='button'
						text='Oui'
						colors={{
							$textColor: color.light,
							$backgroundColor: color.success,
							$borderColor: color.success,
						}}
					/>
				</PopUpBtnContainer>
			</PopUpContainer>
		);
	}
};

export default PopUp;

const PopUpContainer = styled.div`
	z-index: 199;
	background-color: ${adjustColorBrightness(color.light, -0.05)};
	box-shadow: 0px 0px 3px 2px ${hexToRgba(color.dark, 0.5)};
	max-width: 90vw;
	top: 5rem;
	left: 50%;
	transform: translateX(-50%);
	position: fixed;
	border: 0.2rem solid ${color.primary};
	border-radius: 1rem;
	padding: 1rem 2.5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	@media (max-width: ${breakpoints.md}) {
		width: 95%;
		padding: 1rem;
	}
`;

const PopUpMessage = styled.p`
	text-align: center;
	color: ${color.dark};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.normal};

	@media (max-width: ${breakpoints.lg}) {
		font-size: ${typography.mobile.s};
	}
`;

const PopUpBtnContainer = styled.div`
	padding: 2rem 0 1rem 0;
	width: 100%;
	display: flex;
	justify-content: space-around;
	gap: 1rem;
`;
