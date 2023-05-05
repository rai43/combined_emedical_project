import { Toaster } from 'solid-toast';
import Login from '../features/user/Login';
import { onMount } from 'solid-js';

const ExternalPage = () => {
	return (
		<div>
			<Login />
			<Toaster />
		</div>
	);
};

export default ExternalPage;
