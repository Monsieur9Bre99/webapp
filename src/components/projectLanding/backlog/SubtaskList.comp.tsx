import styled from 'styled-components';
import { breakpoints, color, typography } from '../../../style/variable.style';
import { Check, Pencil, X } from 'lucide-react';

interface Props {
	subtasks: { subtask: string; onUpdate: boolean }[];
	setSubtasks: React.Dispatch<
		React.SetStateAction<{ subtask: string; onUpdate: boolean }[]>
	>;
}

const SubtaskList = ({ subtasks, setSubtasks }: Props) => {
	const toggleUpdate = (update: boolean, subtask: string) => {
		setSubtasks((prev) =>
			prev.map((s: { subtask: string; onUpdate: boolean }) =>
				s.subtask === subtask ? { ...s, onUpdate: update } : s,
			),
		);
	};

	const deleteSubtask = (subtask: string) => {
		setSubtasks((prev) => prev.filter((s) => s.subtask !== subtask));
	};

	const updateSubtask = (subtask: string, newSubtask: string) => {
		if (subtask === newSubtask) return;
		if (subtasks.find((s) => s.subtask === newSubtask)) return;
		if (newSubtask === '') return;
		
		setSubtasks((prev) =>
			prev.map((s: { subtask: string; onUpdate: boolean }) =>
				s.subtask === subtask ? { ...s, subtask: newSubtask } : s,
			),
		);
	};

	return (
		<List>
			{subtasks.map((subtask, index) => (
				<ListItem key={index}>
					{subtask.onUpdate ? (
						<input
							type='text'
							placeholder={subtask.subtask}
						/>
					) : (
						<p>{subtask.subtask}</p>
					)}
					<div>
						{subtask.onUpdate ? (
							<EditBtn
								$color={color.success}
								type='button'
								onClick={() => {
									toggleUpdate(false, subtask.subtask);
									updateSubtask(
										subtask.subtask,
										(
											document.querySelector(
												'input',
											) as HTMLInputElement
										).value,
									);
								}}>
								<Check />
							</EditBtn>
						) : (
							<EditBtn
								$color={color.primary}
								type='button'
								onClick={() => {
									toggleUpdate(true, subtask.subtask);
								}}>
								<Pencil />
							</EditBtn>
						)}
						<EditBtn
							onClick={() => deleteSubtask(subtask.subtask)}
							$color={color.error}
							type='button'>
							<X />
						</EditBtn>
					</div>
				</ListItem>
			))}
		</List>
	);
};

export default SubtaskList;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	list-style: none;
`;

const ListItem = styled.li`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	color: ${color.dark};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xs};
	font-weight: ${typography.weight.thin};

	@media (max-width: ${breakpoints.md}) {
		font-size: ${typography.mobile.xs};

		p {
			width: 85%;
		}

		input {
			width: 85%;
		}

		div {
			width: 15%;
		}
	}

	p {
		width: 90%;
	}

	input {
		outline: none;
		width: 90%;
		padding: 0.1rem 0.5rem;
		border: none;
		border-bottom: 0.2rem solid ${color.primary};
		background-color: ${color.light};
	}

	div {
		width: 10%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
`;

const EditBtn = styled.button<{ $color: string }>`
	svg {
		width: 2rem;
		height: 2rem;
		color: ${({ $color }) => $color};
	}
`;
