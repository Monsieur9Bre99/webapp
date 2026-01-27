import styled from 'styled-components';
import { breakpoints, color, typography } from '../../style/variable.style';
import { hexToRgba } from '../../utils/colorFunc';
import { useState } from 'react';

interface Props {
	id: string;
	label: string;
	placeholder?: string;
	error?: string;
	acceptedFormat?: string; // e.g. 'image/*,application/pdf'
	multiple?: boolean;
	onChange?: (files: FileList | null) => void;
	name?: string;
	$hideLabel?: boolean;
	$ref?: React.Ref<HTMLInputElement>;
}

export const FileInput = ({
	id,
	label,
	placeholder,
	error,
	acceptedFormat,
	multiple,
	onChange,
	name,
	$hideLabel,
	$ref,
	...props
}: Props) => {
	const [errors, setErrors] = useState<string | undefined>(error);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let format = '';
		if (acceptedFormat) {
			format = acceptedFormat.split('*')[0];
		}

		const files = e.target.files;
		if (files && files.length > 0) {
			const validFiles = Array.from(files).every((file) =>
				file.type.startsWith(format),
			);
			if (!validFiles) {
				setErrors("Le format du fichier n'est pas autorisé");
				return;
			}
			setErrors(undefined);
			onChange && onChange(files);
		}
	};

	return (
		<FileInputContainer>
			<Label
				style={{ display: $hideLabel ? 'none' : 'block' }}
				htmlFor={id}>
				{label}
			</Label>
			<FieldContainer $hideLabel={$hideLabel}>
				<HiddenFileInput
					ref={$ref}
					name={name}
					accept={acceptedFormat}
					multiple={multiple}
					id={id}
					type='file'
					onChange={handleChange}
					{...props}
				/>

				<FakeField htmlFor={id}>
					<FakeFileName>{placeholder}</FakeFileName>
					<FakeButton>Parcourir</FakeButton>
				</FakeField>
			</FieldContainer>
			{errors && <Error>{errors}</Error>}
		</FileInputContainer>
	);
};

const FileInputContainer = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Label = styled.label<{ $isReversed?: boolean }>`
	width: 100%;
	text-align: ${({ $isReversed }) => ($isReversed ? 'right' : 'left')};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.m};
	font-weight: ${typography.weight.normal};
	color: ${color.primary};

	@media (max-width: ${breakpoints.lg}) {
		font-size: ${typography.desktop.xs};
	}

	@media (max-width: ${breakpoints.md}) {
		text-align: left;
		font-size: ${typography.mobile.s};
	}
`;

const Error = styled.span<{ $isReversed?: boolean }>`
	width: 100%;
	text-align: ${({ $isReversed }) => ($isReversed ? 'right' : 'left')};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xxs};
	font-weight: ${typography.weight.normal};
	color: ${color.error};

	@media (max-width: ${breakpoints.lg}) {
		font-size: ${typography.mobile.xxs};
	}
`;

const HiddenFileInput = styled.input`
	position: absolute;
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	z-index: -1;
`;

const FieldContainer = styled.div<{ $hideLabel?: boolean }>`
	margin-top: ${({ $hideLabel }) => ($hideLabel ? '1.5rem' : '0')};
	align-self: ${({ $hideLabel }) => ($hideLabel ? 'flex-end' : 'flex-start')};
	width: ${({ $hideLabel }) => ($hideLabel ? '60%' : '100%')};
	position: relative;
`;

const FakeField = styled.label`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	border: 0.2rem solid ${color.primary};
	border-radius: 0.5rem;
	background-color: ${hexToRgba(color.light, 0.5)};
	cursor: pointer;
`;

const FakeFileName = styled.span`
	padding: 0 0.5rem;
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.s};
	font-weight: ${typography.weight.thin};
	color: ${color.dark};
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const FakeButton = styled.span`
	padding: 0.6rem 1rem;
	background-color: ${color.primary};
	color: ${color.light};
	font-family: ${typography.fontPrimary};
	font-size: ${typography.desktop.xs};
	font-weight: ${typography.weight.normal};
`;
