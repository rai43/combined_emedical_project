import { createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import toast from 'solid-toast';
import { setPageTitle } from '../../data/mainStoreFunctions';
// import Constants from "../../features/constants";
import { isUserLoggedIn } from '../../components/helpers/AuthenticationService';
import InternalPrescriptions from '../../features/internal_prescriptions';

function InternalPage() {
	const navigate = useNavigate();
	createEffect(() => {
		setPageTitle('Ordonnances');
		if (!isUserLoggedIn()) {
			toast.error('Oops! il semble que votre session a expiré. Reconnectez-vous.');
			setTimeout(() => {
				return navigate('/login', { replace: true });
			}, 3000);
		}
	});

	return <InternalPrescriptions />;
}

export default InternalPage;
