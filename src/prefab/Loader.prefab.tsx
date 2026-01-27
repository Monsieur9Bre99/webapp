import styled from 'styled-components';
import { color } from '../style/variable.style';
import { hexWithAlpha } from '../utils/colorFunc';

const Loader = () => {
	return <LoaderContainer></LoaderContainer>;
};

export default Loader;

const LoaderContainer = styled.div`
	width: 8rem;
	height: 8rem;
	border-radius: 50%;
	border-bottom: 1rem solid ${hexWithAlpha(color.primary, 0.0)};
	border-left: 1rem solid ${hexWithAlpha(color.primary, 0.3)};
	border-top: 1rem solid ${hexWithAlpha(color.primary, 0.6)};
	border-right: 1rem solid ${hexWithAlpha(color.primary, 0.9)};
	display: flex;
	justify-content: center;
	align-items: center;

	animation: spin 0.8s infinite linear;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
