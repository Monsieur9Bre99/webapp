import gsap from 'gsap';

export const showHideForm = (
	signinRef: React.RefObject<HTMLDivElement | null>,
	signupref: React.RefObject<HTMLDivElement | null>,
	show: boolean,
) => {
	if (signinRef === null || signupref === null) {
		return;
	}

	const tl = gsap.timeline();

	if (!show) {
		tl.to(signupref.current, {
			x: 0,
			autoAlpha: 1,
			duration: 0.75,
			ease: 'power3.Out',
		}).to(
			signinRef.current,
			{ x: '-100vw', autoAlpha: 0, duration: 0.75, ease: 'power3.Out' },
			'<',
		);
	} else {
		tl.to(signupref.current, {
			x: '100vw',
			autoAlpha: 0,
			duration: 0.75,
			ease: 'power3.Out',
		}).to(
			signinRef.current,
			{ x: 0, autoAlpha: 1, duration: 0.75, ease: 'power3.Out' },
			'<',
		);
	}
};
