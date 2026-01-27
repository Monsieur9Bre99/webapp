import styled from 'styled-components';
import { breakpoints, color, typography } from '../style/variable.style';
import { hexToRgba } from '../utils/colorFunc';
import { useState } from 'react';

interface Props {
	title: string;
	children: React.ReactNode;
}

const Accordion = ({ title, children }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<AccordionCard>
			<AccordionHeader>
				<AccordionTitle>{title}</AccordionTitle>
				<AccordionOpenBtn
					type='button'
					onClick={() => setIsOpen(!isOpen)}
					className={isOpen ? '' : 'open'}></AccordionOpenBtn>
			</AccordionHeader>
			{isOpen && <AccordionContent>{children}</AccordionContent>}
		</AccordionCard>
	);
};

export default Accordion;

const AccordionCard = styled.div`
	margin: 2rem auto 0rem auto;
	padding: 1rem;
	background-color: ${color.light};
	display: flex;
	flex-direction: column;
	border: 0.2rem solid ${color.primary};
	border-radius: 1rem;
	box-shadow: 0px 3px 2px 1px ${hexToRgba(color.dark, 0.5)};
	width: 75%;

	@media (max-width: ${breakpoints.lg}) {
		width: 85%;
	}

	@media (max-width: ${breakpoints.md}) {
		width: 95%;
	}
`;

const AccordionHeader = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const AccordionTitle = styled.h2`
	color: ${color.primary};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xl};
	font-weight: ${typography.weight.bold};
	line-height: ${typography.desktop.xl};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.l};
		line-height: ${typography.mobile.l};
	}
`;

const AccordionOpenBtn = styled.button`
	position: relative;
	width: 3rem;
	height: 3rem;

	&::after {
		position: absolute;
		content: '';
		width: 2rem;
		height: 2rem;
		top: 65%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(-135deg);
		border-right: 0.3rem solid ${color.primary};
		border-bottom: 0.3rem solid ${color.primary};

		@media (max-width: ${breakpoints.md}) {
			width: 2rem;
			height: 2rem;
		}

		transition: all 0.3s ease-in-out;
	}

	&.open::after {
		top: 45%;
		transform: translate(-50%, -50%) rotate(45deg);
	}
`;

const AccordionContent = styled.div`
	margin: 1rem;
	height: fit-content;
	transition: height 0.3s ease-in-out;
`;
