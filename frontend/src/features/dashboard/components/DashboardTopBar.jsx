import SelectBox from '../../../components/Input/SelectBox';

import { BiRegularRefresh } from 'solid-icons/bi';
import { BsShare } from 'solid-icons/bs';
import { FiChevronDown } from 'solid-icons/fi';
import { SiMinutemailer } from 'solid-icons/si';
import { FiDownloadCloud } from 'solid-icons/fi';
import InputText from '../../../components/Input/InputText';

const periodOptions = [
	{ name: 'Today', value: 'TODAY' },
	{ name: 'Yesterday', value: 'YESTERDAY' },
	{ name: 'Cette Semaine', value: 'THIS_WEEK' },
	{ name: 'Last Week', value: 'LAST_WEEK' },
	{ name: 'This Month', value: 'THIS_MONTH' },
	{ name: 'Last Month', value: 'LAST_MONTH' },
];

// function DashboardTopBar({ updateDashboardPeriod }) {
function DashboardTopBar() {
	//   const updateSelectBoxValue = ({ updateVar, value }) => {
	//     updateDashboardPeriod(value);
	//   };

	return (
		<div class='grid grid-cols-1 sm:grid-cols-2 gap-4'>
			<div class=''>
				{/* <SelectBox
					options={periodOptions}
					labelTitle='Period'
					placeholder='Select date range'
					containerStyle='w-72'
					labelStyle='hidden'
					defaultValue='TODAY'
					updateFormValue={() => {
						console.log('select box');
					}}
					disabled
					// updateFormValue={updateSelectBoxValue}
				/> */}
				<input
					type={'text'}
					value='Cette Semaine'
					class={'input input-bordered w-full'}
					disabled={true}
				/>
			</div>
			<div class='text-right '>
				<button
					onClick={() => location.reload()}
					class='btn btn-ghost btn-sm normal-case'
				>
					<BiRegularRefresh class='w-4 mr-2' />
					Actualiser les données
				</button>
				<button class='btn btn-ghost btn-sm normal-case  ml-2'>
					<BsShare class='w-4 mr-2' />
					Partager
				</button>

				<div class='dropdown dropdown-bottom dropdown-end  ml-2'>
					<label
						tabIndex={0}
						class='btn btn-ghost btn-sm normal-case btn-square '
					>
						<FiChevronDown class='w-5' />
					</label>
					<ul
						tabIndex={0}
						class='dropdown-content menu menu-compact  p-2 shadow bg-base-100 rounded-box w-52'
					>
						<li>
							<a>
								<SiMinutemailer class='w-4' />
								Email
							</a>
						</li>
						<li>
							<a>
								<FiDownloadCloud class='w-4' />
								Télécharger
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default DashboardTopBar;
