// import PageContent from "./PageContent"
import toast, { Toaster } from 'solid-toast';
// import { useSelector, useDispatch } from 'react-redux'
import RightSidebar from './RightSidebar';
// import { useEffect } from "react"
// import  {  removeNotificationMessage } from "../features/common/headerSlice"
// import {NotificationContainer, NotificationManager} from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
// import ModalLayout from "./ModalLayout"

// import { Show } from "solid-js";
import { modalState } from '../data/modalState';
import LeftSidebar from './LeftSidebar';
import ModalLayout from './ModalLayout';
import PageContent from './PageContent';
import { isTokenValid } from '../components/helpers/AuthenticationService';
import { isUserLoggedIn } from '../components/helpers/AuthenticationService';
import { onMount } from 'solid-js';

const Layout = () => {
	onMount(() => {
		if (!isTokenValid()) {
			toast.error('Oops! il semble que votre session a expiré. Reconnectez-vous.');
			setTimeout(() => {
				return navigate('/login', { replace: true });
			}, 2000);
		}
	});

	return (
		<>
			{/* Left drawer - containing page content and side bar (always open) */}
			<div class='drawer drawer-mobile'>
				<input
					id='left-sidebar-drawer'
					type='checkbox'
					class='drawer-toggle'
				/>
				<PageContent />
				<LeftSidebar />
			</div>

			{/* Right drawer - containing secondary content like notifications list etc.. */}
			<RightSidebar />

			{/** Notification layout container */}
			{/* <NotificationContainer /> */}

			{/* Modal layout container */}
			<Show when={modalState.isOpen}>
				<ModalLayout />
			</Show>
			<Toaster />
		</>
	);
};

export default Layout;
