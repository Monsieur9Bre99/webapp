// import { useState } from 'react';
import SignIn from '../../components/login/SignIn.comp';
import { MainCentered } from '../../style/global.styledComp';
import styled, { css } from 'styled-components';
import Signup from '../../components/login/Signup.comp';
import { breakpoints } from '../../style/variable.style';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState, useEffect, useRef } from 'react';
import { showHideForm } from '../../utils/animation/authform.animation';

const Login = () => {
	const [isRegister, setIsRegister] = useState<boolean>(true);
	const signinform = useRef<HTMLDivElement>(null);
	const signupform = useRef<HTMLDivElement>(null);
	const isFirstRender = useRef<boolean>(true);

	useGSAP(() => {
		gsap.set(signinform.current, { x: 0, autoAlpha: 1 });
		gsap.set(signupform.current, { x: '100vw', autoAlpha: 0 });
	}, []);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		showHideForm(signinform, signupform, isRegister);
	}, [isRegister]);

	return (
		<MainCentered>
			<Container ref={signinform}>
				<SignIn setRegister={setIsRegister} />
			</Container>

			<Container
				$isRegister
				ref={signupform}>
				<Signup setRegister={setIsRegister} />
			</Container>
		</MainCentered>
	);
};

export default Login;

const Container = styled.div<{ $isRegister?: boolean }>`
	height: 100%;
	width: clamp(320px, 100%, 2400px);
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 1rem 0;

	@media (max-width: ${breakpoints.md}) {
		${({ $isRegister }) =>
			$isRegister &&
			css`
				display: block;
			`}
	}
`;
