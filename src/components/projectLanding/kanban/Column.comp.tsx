import { useDroppable } from '@dnd-kit/core';
import styled from 'styled-components';
import { color, typography } from '../../../style/variable.style';

interface Props {
	id: string;
	title: string;
	children?: React.ReactNode;
}

const Column = ({ id, title, children }: Props) => {
	const { setNodeRef } = useDroppable({
		id: id,
		data: { accept: ['TODO', 'ON_GOING', 'ON_TEST', 'FINISHED'] },
	});

	return (
		<Container ref={setNodeRef}>
			<ColumnName>{title}</ColumnName>
			{children}
		</Container>
	);
};

export default Column;

const Container = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 2rem;
	background-color: ${color.light};
	padding: 1rem 0 2rem 0;
	border-left: 0.2rem solid ${color.primary};
	border-right: 0.2rem solid ${color.primary};
`;

const ColumnName = styled.h2`
	color: ${color.secondary};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xl};
	font-weight: ${typography.weight.bold};
	text-align: center;
`;
