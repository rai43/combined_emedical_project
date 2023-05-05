import { createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Dashboard from '../../features/dashboard/index';
import { setPageTitle } from '../../data/mainStoreFunctions';
import { isUserLoggedIn } from '../../components/helpers/AuthenticationService';

function InternalPage() {
	const navigate = useNavigate();
	createEffect(() => {
		setPageTitle('Tableau de board');
		if (!isUserLoggedIn()) {
			toast.error('Oops! il semble que votre session a expiré. Reconnectez-vous.');
			setTimeout(() => {
				return navigate('/login', { replace: true });
			}, 3000);
		}
	});

	return <Dashboard />;
}

export default InternalPage;
