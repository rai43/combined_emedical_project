import { createEffect, createResource, createSignal } from 'solid-js';
import TitleCard from '../../../components/Cards/TitleCard';
import CreateNewUserForm from './CreateNewUserForm';
import { setUserGeneralInfo } from '../../../data/mainStoreFunctions';
import toast from 'solid-toast';
import { appStore } from '../../../data/mainStore';
import axios from 'axios';

const fetchUserInfo = async () => {
	let response;
	try {
		response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/info/${localStorage.getItem('userId')}`);
		console.log(response);
	} catch (err) {
		console.log('In error');
		console.log(err);
	}
	console.log(response);
	return response;
};

const [fetcherSignal, setFetcherSignal] = createSignal(1);
export const [userRessource, { mutate, refetch }] = createResource(fetcherSignal(), fetchUserInfo);

const User = () => {
	// setUserGeneralInfo
	createEffect(() => {
		if (userRessource.error) {
			if (!isUserLoggedIn()) {
				toast.error('Oops! il semble que votre session a expiré. Reconnectez-vous.');
				setTimeout(() => {
					return navigate('/login', { replace: true });
				}, 3000);
			}
		}
		if (!userRessource.loading) {
			setUserGeneralInfo(userRessource().data.user);
			console.log(appStore);
		}
	});

	return (
		<>
			<TitleCard
				title={'Liste des bénéficiaires'}
				topMargin='mt-1'
			>
				<CreateNewUserForm fromUserProile={true} />
			</TitleCard>
		</>
	);
};

export default User;
