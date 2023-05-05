import { themeChange } from 'theme-change';
import { FaRegularMoon } from 'solid-icons/fa';
import { WiDaySunny } from 'solid-icons/wi';
import { VsBellDot } from 'solid-icons/vs';
import { AiOutlineReload } from 'solid-icons/ai';
// import BellIcon from "@heroicons/react/24/outline/BellIcon";
// import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
// import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
// import SunIcon from "@heroicons/react/24/outline/SunIcon";

// import { openRightDrawer } from "../features/common/rightDrawerSlice";
// import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";

import { createEffect, createSignal } from 'solid-js';
import { TbLayoutDashboard } from 'solid-icons/tb';
import { Routes, Route, useLocation, A, useNavigate } from '@solidjs/router';
import { appStore } from '../data/mainStore';
import toast from 'solid-toast';

function Header() {
	const [currentTheme, setCurrentTheme] = createSignal(localStorage.getItem('theme'));
	const navigate = useNavigate();

	createEffect(() => {
		themeChange(false);
		if (currentTheme() === null) {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				setCurrentTheme('dark');
			} else {
				setCurrentTheme('light');
			}
		}
		// 👆 false parameter is required for react project
	});

	function logoutUser() {
		toast.error('Nous vous déconnectons, veuillez patienter!');
		setTimeout(() => {
			localStorage.clear();
			navigate('/login', { replace: true });
		}, 2000);
	}

	return (
		<>
			<div class='navbar flex justify-between bg-base-100 z-10 shadow-md'>
				{/* Menu toogle for mobile view or small screen */}
				<div class=''>
					<label
						htmlFor='left-sidebar-drawer'
						class='btn btn-primary drawer-button lg:hidden'
					>
						<TbLayoutDashboard class='h-5 inline-block w-5' />
					</label>
					<h1 class='text-2xl font-semibold ml-2'>{appStore.pageTitle}</h1>
				</div>

				<div class='order-last'>
					{/* Multiple theme selection, uncomment this if you want to enable multiple themes selection,
                also includes corporate and retro themes in tailwind.config file */}

					{/* <select class="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}

					{/* Notification icon */}
					<button
						class='btn btn-ghost ml-4  btn-circle'
						onClick={() => location.reload()}
					>
						<div class='indicator'>
							<AiOutlineReload class='h-6 w-6' />
						</div>
					</button>

					{/* Light and dark theme selection toogle **/}
					<label class='swap '>
						<input type='checkbox' />
						<WiDaySunny
							data-set-theme='light'
							data-act-class='ACTIVECLASS'
							class={'fill-current w-6 h-6 ' + (currentTheme() === 'dark' ? 'swap-on' : 'swap-off')}
						/>
						<FaRegularMoon
							data-set-theme='dark'
							data-act-class='ACTIVECLASS'
							class={'fill-current w-6 h-6 ' + (currentTheme() === 'light' ? 'swap-on' : 'swap-off')}
						/>
					</label>

					{/* Profile icon, opening menu on click */}
					<div class='dropdown dropdown-end ml-4'>
						<label
							tabIndex={0}
							class='btn btn-ghost btn-circle avatar'
						>
							<div class='w-10 rounded-full'>
								<img
									src='https://placeimg.com/80/80/people'
									alt='profile'
								/>
							</div>
						</label>
						<ul
							tabIndex={0}
							class='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
						>
							<li class='justify-between'>
								<A href={'/app/users/info'}>
									Profile Settings
									<span class='badge'>New</span>
								</A>
							</li>
							{/* <li class="">
                <A href={"/app/settings-billing"}>Bill History</A>
              </li> */}
							<div class='divider mt-0 mb-0'></div>
							<li>
								<a onClick={logoutUser}>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
