import axios from 'axios';

export const getUserJobTitle = async (uid) => {
	let response;
	try {
		response = awaitaxios.get(`${import.meta.env.VITE_BACKEND_URL}/users/gjt/${uid}`);
	} catch (err) {
		console.log('In error');
		console.log(err);
	}
	return response.data.job_title;
};
