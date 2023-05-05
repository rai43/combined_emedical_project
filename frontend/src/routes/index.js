// All components mapping with path for internal routes

import { lazy } from 'solid-js';

const ManageConsultationsHistory = lazy(() => import('../pages/protected/ConsultationsHistory'));
const Dashboard = lazy(() => import('../pages/protected/Dashboard'));
const Beneficiary = lazy(() => import('../pages/protected/Beneficiary'));
const Constants = lazy(() => import('../pages/protected/Constants'));
const Exams = lazy(() => import('../pages/protected/Exams'));
const MedicalAct = lazy(() => import('../pages/protected/MedicalActs'));
const InternalPrescription = lazy(() => import('../pages/protected/InternalPrescription'));
const Consultations = lazy(() => import('../pages/protected/Consultations'));
const Medications = lazy(() => import('../pages/protected/Medications'));
const AddMedications = lazy(() => import('../pages/protected/AddMedications'));
const CreateUser = lazy(() => import('../pages/protected/CreateUser'));
const UserProfile = lazy(() => import('../pages/protected/UserProfile'));

const routes = [
	{
		path: '/dashboard', // the url
		component: Dashboard, // view rendered
	},
	{
		path: '/beneficiary', // the url
		component: Beneficiary, // view rendered
	},
	{
		path: '/constants', // the url
		component: Constants, // view rendered
	},
	{
		path: '/exams', // the url
		component: Exams, // view rendered
	},
	{
		path: '/medical-acts', // the url
		component: MedicalAct, // view rendered
	},
	{
		path: '/ordonnances', // the url
		component: InternalPrescription, // view rendered
	},
	{
		path: '/medic/ats', // the url
		component: AddMedications, // view rendered
	},
	{
		path: '/medications', // the url
		component: Medications, // view rendered
	},
	{
		path: '/users/info', // the url
		component: UserProfile, // view rendered
	},
	{
		path: '/users/create', // the url
		component: CreateUser, // view rendered
	},
	{
		path: '/consultations/waiting',
		component: Consultations,
	},
	{
		path: '/consultations/done',
		component: ManageConsultationsHistory,
	},
];

export default routes;
