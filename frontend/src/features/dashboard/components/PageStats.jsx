// import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
// import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import { TbLayoutDashboard } from 'solid-icons/tb';

function PageStats({}) {
	return (
		<div class='stats bg-base-100 shadow'>
			<div class='stat'>
				<div class='stat-figure invisible md:visible'>
					<TbLayoutDashboard class='w-8 h-8' />
				</div>
				<div class='stat-title'>Total Likes</div>
				<div class='stat-value'>25.6K</div>
				<div class='stat-desc'>21% more than last month</div>
			</div>

			<div class='stat'>
				<div class='stat-figure invisible md:visible'>
					<TbLayoutDashboard class='w-8 h-8' />
				</div>
				<div class='stat-title'>Page Views</div>
				<div class='stat-value'>2.6M</div>
				<div class='stat-desc'>14% more than last month</div>
			</div>
		</div>
	);
}

export default PageStats;
