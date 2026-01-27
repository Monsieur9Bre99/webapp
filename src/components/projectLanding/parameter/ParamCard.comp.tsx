import { useState } from 'react';
import {
	ParamCardButton,
	ParamCardContainer,
	ParamCardContent,
	ParamCardHeader,
	ParamCardHeaderSide,
	ParamCardTitle,
} from '../../../style/paramCard.styledComp';
import { Check, Settings, X } from 'lucide-react';
import { color } from '../../../style/variable.style';

interface Props {
	$form?: string;
	title: string;
	children: (params: {
		isOnUpdate: boolean;
		setIsOnUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
	}) => React.ReactNode;
}

const ParamCard = ({ $form, title, children }: Props) => {
	const [isOnUpdate, setIsOnUpdate] = useState<boolean>(false);

	return (
		<ParamCardContainer>
			<ParamCardHeader>
				<ParamCardTitle>{title}</ParamCardTitle>
				<ParamCardHeaderSide>
					{!isOnUpdate ? (
						<ParamCardButton
							type='button'
							onClick={() => setIsOnUpdate(true)}
							$color={color.primary}>
							<Settings />
						</ParamCardButton>
					) : (
						<>
							<ParamCardButton
								form={$form}
								onClick={$form ? undefined : () => setIsOnUpdate(false)}
								type='submit'
								$color={color.success}>
								<Check />
							</ParamCardButton>
							<ParamCardButton
								onClick={() => setIsOnUpdate(false)}
								$color={color.error}>
								<X />
							</ParamCardButton>
						</>
					)}
				</ParamCardHeaderSide>
			</ParamCardHeader>
			<ParamCardContent>
				{children({ isOnUpdate, setIsOnUpdate })}
			</ParamCardContent>
		</ParamCardContainer>
	);
};

export default ParamCard;
