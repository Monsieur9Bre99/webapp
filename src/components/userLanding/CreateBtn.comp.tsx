import styled from 'styled-components';
import { breakpoints, color, typography } from '../../style/variable.style';
import { hexToRgba } from '../../utils/colorFunc';
import { modalStore } from '../../store/modalStore';

const CreateBtn = () => {
	return (
		<CreateBtnContainer>
			<CreateButton onClick={() => modalStore.getState().openModal()}>
				<CreateButtonIcon></CreateButtonIcon>
				<CreateButtonContent>
					<p>Ajouter un projet</p>
				</CreateButtonContent>
			</CreateButton>
		</CreateBtnContainer>
	);
};

export default CreateBtn;

const CreateBtnContainer = styled.div`
	height: 25rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	@media (max-width: ${breakpoints.md}) {
		height: fit-content;
	}
`;

const CreateButton = styled.div`
	overflow: hidden;
	box-shadow: 0px 2px 3px 2px ${hexToRgba(color.dark, 0.5)};
	display: flex;
	align-items: center;
	border: 0.3rem solid ${color.primary};
	border-radius: 2rem;
	width: 30rem;
	height: 10rem;
	background-color: ${color.light};
	position: relative;

	&::after {
		position: absolute;
		content: '';
		left: 30%;
		width: 80%;
		height: 100%;
		background-color: ${color.primary};
		transform: scaleX(0);
		transform-origin: left;
		transition: all 0.3s ease;
	}

	&:hover {
		div > p {
			color: ${color.light};
		}
		&::after {
			transform: scaleX(1);
		}
	}
`;

const CreateButtonIcon = styled.div`
	position: relative;
	width: 30%;
	height: 100%;
	background-color: ${color.primary};

	&::before,
	&::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: ${color.light};
	}

	&::before {
		width: 0.4rem;
		height: 4.3rem;
	}

	&::after {
		height: 0.4rem;
		width: 4.3rem;
	}
`;

const CreateButtonContent = styled.div`
	width: 70%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	p {
		transition: all 0.3s ease;
		z-index: 2;
		font-family: ${typography.fontPrimary};
		font-size: ${typography.desktop.m};
		font-weight: ${typography.weight.normal};
		color: ${color.primary};

		@media (max-width: ${breakpoints.lg}) {
			font-size: ${typography.mobile.m};
		}
	}
`;
