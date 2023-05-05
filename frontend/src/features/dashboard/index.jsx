import DashboardStats from './components/DashboardStats';
import AmountStats from './components/AmountStats';
import PageStats from './components/PageStats';
import UserChannels from './components/UserChannels';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import DashboardTopBar from './components/DashboardTopBar';
import DoughnutChart from './components/DoughnutChart';
// import { useDispatch } from "react-redux";
// import { showNotification } from "../common/headerSlice";

import { TbLayoutDashboard } from 'solid-icons/tb';
import { Show, createEffect, createResource, createSignal, onMount } from 'solid-js';
import axios from 'axios';

const countBeneficiaries = async () => {
	const [beneficiaryCount, setBeneficiaryCount] = createSignal(0);
	let response;
	try {
		response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/count/cb`);
	} catch (err) {
		console.log('In error');
		console.log(err);
	}
	console.log(response);
	return response;
};

const [fetcherSignal, setFetcherSignal] = createSignal(1);
export const [beneficiariesCountRessource, { mutate, refetch }] = createResource(fetcherSignal(), countBeneficiaries);

function Dashboard() {
	const [count, setCount] = createSignal(0);
	const statsData = [
		{
			title: 'Total Bénéficiaires',
			value: `${count() / 1000}k`,
			icon: <TbLayoutDashboard class='w-8 h-8' />,
			description: 'Total',
			// description: '↗︎ 2300 (22%)',
		},
		{
			title: 'Total Sales',
			value: '$34,545',
			icon: <TbLayoutDashboard class='w-8 h-8' />,
			description: 'Current month',
		},
		{
			title: 'Pending Leads',
			value: '450',
			icon: <TbLayoutDashboard class='w-8 h-8' />,
			description: '50 in hot leads',
		},
		{
			title: 'Active Users',
			value: '5.6k',
			icon: <TbLayoutDashboard class='w-8 h-8' />,
			description: '↙ 300 (18%)',
		},
	];

	createEffect(() => {
		console.log('here');
		if (!beneficiariesCountRessource.loading) {
			console.log('here', beneficiariesCountRessource().data);
			setCount(beneficiariesCountRessource().data.count);
		}
	});
	return (
		<>
			<Show when={!beneficiariesCountRessource.loading}>
				{/** ---------------------- Select Period Content ------------------------- */}
				<DashboardTopBar />

				{/** ---------------------- Different stats content 1 ------------------------- */}
				<div class='grid lg:grid-cols-4 mt-8 md:grid-cols-2 grid-cols-1 gap-6'>
					{statsData.map((d, k) => {
						return (
							<DashboardStats
								{...d}
								colorIndex={k}
							/>
						);
					})}
				</div>
				{/** ---------------------- Different charts ------------------------- */}
				<div class='grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6'>
					<LineChart />
					<BarChart />
				</div>
				{/** ---------------------- Different stats content 2 ------------------------- */}

				<div class='grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6'>
					<AmountStats />
					<PageStats />
				</div>
				{/** ---------------------- User source channels table  ------------------------- */}
				<div class='grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6'>
					<UserChannels />
					<DoughnutChart />
				</div>
			</Show>
		</>
	);
}

export default Dashboard;
