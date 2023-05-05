import AgGridSolid from 'ag-grid-solid';
import TitleCard from '../../../components/Cards/TitleCard';
import ElementViewer from '../../../components/ElementViewer/ElementViewer';
import { makeFakeData } from '../../../data/devData/beneficiary';
import { openBeneficiaryModal } from '../../../data/modalState/beneficiarySlice';
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';
import { containFilterParams } from '../../../../helpers/helperFunctions';
import { Show, createEffect, createResource, createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';
import { appStore } from '../../../data/mainStore';
import { setBeneficiariesList } from '../../../data/mainStoreFunctions';
import axios from 'axios';
import { isUserLoggedIn } from '../../../components/helpers/AuthenticationService';
import toast from 'solid-toast';

const beneficiaryModalConfig = {
	title: 'Modifier un Utilisateur',
	size: 'lg',
	bodyType: GLOBAL_CONSTANTS.MODAL_BODY_TYPES.USER_NEW,
	extraObject: {},
};

const onSelectionChanged = () => {
	const selectedRows = gridOptions.api.getSelectedRows();
	console.log(selectedRows.length === 1 ? selectedRows[0].athlete : '');
};

const cellClass = (_) => {
	// _: here represents the params
	return 'hover:bg-primary hover:text-white hover:cursor-pointer';
};

const TopSideButtons = () => {
	return (
		<div class='inline-block float-right'>
			<button
				class='btn px-6 btn-sm normal-case btn-primary'
				onClick={() => openBeneficiaryModal(beneficiaryModalConfig)}
			>
				Ajouter Utilisateur
			</button>
		</div>
	);
};

const fetchBeneficiaries = async () => {
	let response;
	try {
		response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`);
	} catch (err) {
		console.log('In error');
		console.log(err);
	}
	console.log(response);
	return response;
};

const [fetcherSignal, setFetcherSignal] = createSignal(1);
export const [usersRessource, { mutate, refetch }] = createResource(fetcherSignal(), fetchBeneficiaries);

const ManageUsers = (props) => {
	const navigate = useNavigate();

	createEffect(() => {
		console.log(usersRessource.loading ? 'LOADING' : 'NOT LOADING');
		if (usersRessource.error) {
			if (!isUserLoggedIn()) {
				toast.error('Oops! il semble que votre session a expiré. Reconnectez-vous.');
				setTimeout(() => {
					return navigate('/login', { replace: true });
				}, 3000);
			}
		}
		if (!usersRessource.loading) {
			setBeneficiariesList(usersRessource().data.beneficiaries);
			console.log(appStore);
		}
	});

	const containFilterParams = {
		filterOptions: ['contains', 'notContains'],
		debounceMs: 200,
		maxNumConditions: 1,
	};

	createEffect(() => console.log(usersRessource()));
	const columnsDefs = [
		{
			field: 'id_number',
			headerName: 'Matricule',
			width: 150,
			pinned: true,
			filterParams: containFilterParams,
			rowSelection: 'single',
			onSelectionChanged: onSelectionChanged,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-bold'>{cellValue}</span>;
			},
			// onCellClicked: (params) => cellClickedHandler(params.data),
		},
		{
			field: 'family_name',
			headerName: 'Nom',
			width: 160,
			filter: 'agDateColumnFilter',
		},
		{
			field: 'first_name',
			headerName: 'Prénom(s)',
			width: 160,
			filter: 'agDateColumnFilter',
		},
		{
			field: 'dob',
			headerName: 'Date de naissance',
			width: 150,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : props.value;
				return <span class='font-bold'>{moment(cellValue).format('LL')}</span>;
			},
		},
		{
			field: 'job_title',
			headerName: 'Fonction',
			width: 160,
			filter: 'agDateColumnFilter',
		},
		{
			field: 'contract_type',
			headerName: 'Type de contrat',
			width: 160,
			filter: 'agDateColumnFilter',
		},
		{
			field: 'gender',
			headerName: 'Genre',
			pinned: 'right',
			width: 120,
			filterParams: containFilterParams,
		},
		{
			field: 'blood_group',
			headerName: 'Groupe sanguin',
			pinned: 'right',
			// cellRenderer: AgTablePriceComponent,
			width: 120,
			filterParams: containFilterParams,
		},
	];

	return (
		<>
			<Show
				when={
					!usersRessource.loading
					//  &&
					// appStore.beneficiariesList.length > 0
				}
			>
				<TitleCard
					title={'Liste des bénéficiaires'}
					topMargin='mt-1'
					TopSideButtons={TopSideButtons}
				>
					<div
						class={'ag-theme-alpine'}
						style={{ height: '32rem' }}
					>
						<AgGridSolid
							columnDefs={columnsDefs}
							// rowData={appStore.beneficiariesList}
							rowData={usersRessource().data.users}
							defaultColDef={GLOBAL_CONSTANTS.BENEFICIARY_DEFAULT_COL_DEF}
							pagination={true}
							paginationPageSize={15}
							onSelectionChanged={(val) => {
								const selectedObject = val.api.getSelectedRows()[0];
								console.log(selectedObject);
								openBeneficiaryModal({
									...beneficiaryModalConfig,
									extraObject: {
										data: selectedObject,
										config: { openInReadOnlyMode: true },
									},
								});
							}}
							rowSelection='single'
							// onSelectionChanged: onSelectionChanged,
						/>
					</div>
				</TitleCard>
			</Show>
		</>
	);
};

export default ManageUsers;
