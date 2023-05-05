import axios from 'axios';

const initializeApp = () => {
	// Setting base URL for all API request via axios
	axios.defaults.baseURL = import.meta.env.APP_BASE_URL;

	console.log('Initializing');
	if (!import.meta.env.NODE_ENV || import.meta.env.NODE_ENV === 'development') {
		// dev code
		console.log('In developement mode');
	} else {
		// Prod build code
		console.log('In production mode');

		// Removing console.log from prod
		console.log = () => {};

		// init analytics here
	}
};

export default initializeApp;
