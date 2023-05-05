import { createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import toast from 'solid-toast';
import { setPageTitle } from '../../data/mainStoreFunctions';

import { isUserLoggedIn } from '../../components/helpers/AuthenticationService';
import UserProfile from '../../features/user/components/UserProfile';

function InternalPage() {
	const navigate = useNavigate();
	createEffect(() => {
		setPageTitle("Profile de l'utilisateur");
		if (!isUserLoggedIn()) {
			toast.error('Oops! il semble que votre session a expiré. Reconnectez-vous.');
			setTimeout(() => {
				return navigate('/login', { replace: true });
			}, 3000);
		}
	});

	return <UserProfile />;
}

export default InternalPage;
