import { createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import toast from 'solid-toast';
import Beneficiary from '../../features/beneficiary';
import { setPageTitle } from '../../data/mainStoreFunctions';
import { isUserLoggedIn } from '../../components/helpers/AuthenticationService';
import Protected from '../../components/helpers/Protected';
import AddToStock from '../../features/medications/components/AddToStock';

function InternalPage() {
	const navigate = useNavigate();
	createEffect(() => {
		setPageTitle('Ajouter au stock de médicaments');
		if (!isUserLoggedIn()) {
			toast.error('Oops! il semble que votre session a expiré. Reconnectez-vous.');
			setTimeout(() => {
				return navigate('/login', { replace: true });
			}, 3000);
		}
	});

	return (
		<Protected>
			<AddToStock />
		</Protected>
	);
}

export default InternalPage;
