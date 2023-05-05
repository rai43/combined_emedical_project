/** Icons are imported separatly to reduce build time */
import { IoGridOutline, IoSettingsOutline } from 'solid-icons/io';
import { AiOutlineSchedule } from 'solid-icons/ai';
import { RiEditorListUnordered, RiSystemListSettingsFill } from 'solid-icons/ri';
import { FaSolidUserGear } from 'solid-icons/fa';
import { BiRegularUserPlus } from 'solid-icons/bi';

import { CgListTree } from 'solid-icons/cg';
import { BsUiChecks } from 'solid-icons/bs';
import { FaSolidUserDoctor } from 'solid-icons/fa';
import { HiSolidClipboardList } from 'solid-icons/hi';
import { VsHistory } from 'solid-icons/vs';
import { BsHeartPulse } from 'solid-icons/bs';
import { FaSolidCommentMedical } from 'solid-icons/fa';
import { BsFileEarmarkMedical } from 'solid-icons/bs';
import { getUserJobTitle } from '../services/users-services';
import { BsJournalMedical } from 'solid-icons/bs';
import { FaSolidHouseMedicalCircleCheck } from 'solid-icons/fa';
import { BiRegularPlusMedical } from 'solid-icons/bi';
import { FaSolidFileMedical } from 'solid-icons/fa';

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

// const profil_type = getUserJobTitle(localStorage.getItem('userId'));
const profil_type = localStorage.getItem('profilType');

let routes = [];

if (profil_type === 'MEDECIN') {
	routes = [
		{
			path: '/app/dashboard',
			icon: <IoGridOutline class={iconClasses} />,
			name: 'Tableau de Bord',
		},
		{
			path: '/app/beneficiary',
			icon: <CgListTree class={submenuIconClasses} />,
			name: 'Bénéficiaire',
		},
		{
			path: '/app/constants',
			icon: <BsUiChecks class={submenuIconClasses} />,
			name: 'Constantes',
		},
		{
			path: '/app/exams',
			icon: <BsHeartPulse class={submenuIconClasses} />,
			name: 'Examens',
		},
		{
			path: '/app/medical-acts',
			icon: <BsFileEarmarkMedical class={submenuIconClasses} />,
			name: 'Act Médical',
		},
		{
			path: '/app/ordonnances',
			icon: <FaSolidFileMedical class={submenuIconClasses} />,
			name: 'Ordonnances',
		},
		{
			path: '', //no url needed as this has submenu
			icon: <FaSolidUserDoctor class={`${iconClasses} inline`} />, // icon component
			name: 'Consultations', // name that appear in Sidebar
			submenu: [
				{
					path: '/app/consultations/waiting', // url
					icon: <HiSolidClipboardList class={submenuIconClasses} />, // icon component
					name: 'En attende', // name that appear in Sidebar
				},
				{
					path: '/app/consultations/done',
					icon: <VsHistory class={submenuIconClasses} />,
					name: 'Consultations précédentes',
				},
			],
		},
		{
			path: '', //no url needed as this has submenu
			icon: <FaSolidHouseMedicalCircleCheck class={`${iconClasses} inline`} />, // icon component
			name: 'Pharmacie', // name that appear in Sidebar
			submenu: [
				{
					path: '/app/medications',
					icon: <FaSolidCommentMedical class={submenuIconClasses} />,
					name: 'Médicaments',
				},
				{
					path: '/app/medic/ats',
					icon: <BiRegularPlusMedical class={submenuIconClasses} />,
					name: 'Alimenter le stock',
				},
			],
		},
		{
			path: '', //no url needed as this has submenu
			icon: <IoSettingsOutline class={`${iconClasses} inline`} />, // icon component
			name: 'Paramètres', // name that appear in Sidebar
			submenu: [
				{
					path: '/app/users/info', //url
					icon: <FaSolidUserGear class={submenuIconClasses} />, // icon component
					name: 'Utilisateur', // name that appear in Sidebar
				},
				{
					path: '/app/users/create',
					icon: <BiRegularUserPlus class={submenuIconClasses} />,
					name: 'Creer un utilisateur',
				},
			],
		},
	];
} else if (profil_type === 'MANAGER_DE_SECTION_ASSURANCE_MALADIE') {
	routes = [
		{
			path: '/app/dashboard',
			icon: <IoGridOutline class={iconClasses} />,
			name: 'Tableau de Bord',
		},
		{
			path: '/app/beneficiary',
			icon: <CgListTree class={submenuIconClasses} />,
			name: 'Bénéficiaire',
		},
		{
			path: '', //no url needed as this has submenu
			icon: <IoSettingsOutline class={`${iconClasses} inline`} />, // icon component
			name: 'Paramètres', // name that appear in Sidebar
			submenu: [
				{
					path: '/app/users/info', //url
					icon: <FaSolidUserGear class={submenuIconClasses} />, // icon component
					name: 'Utilisateur', // name that appear in Sidebar
				},
				{
					path: '/app/users/create',
					icon: <BiRegularUserPlus class={submenuIconClasses} />,
					name: 'Creer un utilisateur',
				},
			],
		},
	];
} else if (profil_type === 'GESTIONNAIRE') {
	routes = [
		{
			path: '/app/dashboard',
			icon: <IoGridOutline class={iconClasses} />,
			name: 'Tableau de Bord',
		},
		{
			path: '/app/beneficiary',
			icon: <CgListTree class={submenuIconClasses} />,
			name: 'Bénéficiaire',
		},
		{
			path: '', //no url needed as this has submenu
			icon: <IoSettingsOutline class={`${iconClasses} inline`} />, // icon component
			name: 'Paramètres', // name that appear in Sidebar
			submenu: [
				{
					path: '/app/users/info', //url
					icon: <FaSolidUserGear class={submenuIconClasses} />, // icon component
					name: 'Utilisateur', // name that appear in Sidebar
				},
				{
					path: '/app/users/create',
					icon: <BiRegularUserPlus class={submenuIconClasses} />,
					name: 'Creer un utilisateur',
				},
			],
		},
	];
} else if (profil_type === 'AIDE_SOIGNANT_E') {
	routes = [
		{
			path: '/app/dashboard',
			icon: <IoGridOutline class={iconClasses} />,
			name: 'Tableau de Bord',
		},
		{
			path: '/app/constants',
			icon: <BsUiChecks class={submenuIconClasses} />,
			name: 'Constantes',
		},
		{
			path: '/app/exams',
			icon: <BsHeartPulse class={submenuIconClasses} />,
			name: 'Examens',
		},
		{
			path: '/app/users/info', //url
			icon: <FaSolidUserGear class={submenuIconClasses} />, // icon component
			name: 'Utilisateur', // name that appear in Sidebar
		},
	];
} else if (profil_type === 'INFIRMIER_E') {
	routes = [
		{
			path: '/app/dashboard',
			icon: <IoGridOutline class={iconClasses} />,
			name: 'Tableau de Bord',
		},
		{
			path: '/app/constants',
			icon: <BsUiChecks class={submenuIconClasses} />,
			name: 'Constantes',
		},
		{
			path: '/app/exams',
			icon: <BsHeartPulse class={submenuIconClasses} />,
			name: 'Examens',
		},
		{
			path: '/app/users/info', //url
			icon: <FaSolidUserGear class={submenuIconClasses} />, // icon component
			name: 'Utilisateur', // name that appear in Sidebar
		},
	];
} else if (profil_type === 'TECHNICIEN_DE_LABORATOIRE') {
	routes = [
		{
			path: '/app/dashboard',
			icon: <IoGridOutline class={iconClasses} />,
			name: 'Tableau de Bord',
		},
		{
			path: '/app/exams',
			icon: <BsHeartPulse class={submenuIconClasses} />,
			name: 'Examens',
		},
		{
			path: '/app/users/info', //url
			icon: <FaSolidUserGear class={submenuIconClasses} />, // icon component
			name: 'Utilisateur', // name that appear in Sidebar
		},
	];
}

export default routes;
