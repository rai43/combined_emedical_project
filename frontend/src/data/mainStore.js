import { createStore, produce } from 'solid-js/store';

export const [appStore, setAppStore] = createStore({
	userLoginInfo: {},
	userGeneralInfo: {},
	beneficiariesList: [],
	constantsList: [],
	consultationsList: [],
	consultationsListDone: [],
	examsList: [],
	medicationsList: [],
	medicalActsList: [],
	pageTitle: '',
});
