import { themeChange } from 'theme-change';
import { useNavigate } from '@solidjs/router';
import initializeApp from './app/init';
import { createEffect, createSignal, lazy, onMount } from 'solid-js';
import { Routes, Route, Navigate } from '@solidjs/router';
import checkAuth from './app/auth';
import { Show } from 'solid-js';
import { isUserLoggedIn } from './components/helpers/AuthenticationService';
import toast from 'solid-toast';

// Importing pages
const Login = lazy(() => import('./pages/Login'));
const Layout = lazy(() => import('./containers/Layout'));

// Initializing different libraries
initializeApp();

// Check for login and initialize axios

const App = () => {
	const [token, setToken] = createSignal(checkAuth());
	const navigate = useNavigate();
	createEffect(() => {
		themeChange(false);
	});

	return (
		<>
			<Routes>
				<Show when={token()}>
					<Route
						path='/app/*'
						element={<Layout />}
					/>
				</Show>
				<Route
					path='/login'
					element={<Login />}
				/>
			</Routes>
		</>
	);
};

export default App;
