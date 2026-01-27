import { useFormContext } from 'react-hook-form';
import Separator from '../../prefab/Separator.prefab';
import {
	LoginCard,
	LoginCardHeader,
	LoginCardTitle,
	LoginCardText,
	LoginCardForm,
} from '../../style/card.styledComp';
import { color } from '../../style/variable.style';
import { hexWithAlpha } from '../../utils/colorFunc';

interface Props {
	title: string;
	text: string;
	children: React.ReactNode;
	onSubmit?: (data: any) => void;
}

const LogCard = ({ title, text, children, onSubmit }: Props) => {
	const { handleSubmit } = useFormContext<any>();

	const colorExt = hexWithAlpha(color.primary, 0.0);
	const colorInt = hexWithAlpha(color.primary, 1.0);

	return (
		<LoginCard>
			<LoginCardHeader>
				<LoginCardTitle>{title}</LoginCardTitle>
				<LoginCardText>{text}</LoginCardText>
			</LoginCardHeader>
			<Separator
				width='75%'
				height='0.4rem'
				color={[colorExt, colorInt, colorInt, colorExt]}
				$degree='90deg'
			/>
			<LoginCardForm
				onSubmit={handleSubmit(
					onSubmit ||
						((_data: any) => console.log('Submit sans callback')),
				)}>
				{children}
			</LoginCardForm>
		</LoginCard>
	);
};

export default LogCard;
