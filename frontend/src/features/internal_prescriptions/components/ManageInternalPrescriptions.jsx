import AgGridSolid from 'ag-grid-solid';
import TitleCard from '../../../components/Cards/TitleCard';

import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';

import 'moment/src/locale/fr';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';
import { openModal } from '../../../data/modalState';
import { createEffect, createResource, createSignal, onMount } from 'solid-js';
import { setExamsList } from '../../../data/mainStoreFunctions';
import axios from 'axios';

const examsModalConfig = {
	title: 'Tableau des ordonnances internes',
	size: 'lg',
	bodyType: GLOBAL_CONSTANTS.MODAL_BODY_TYPES.INTERNAL_PRESCRIPTIONS_NEW,
	extraObject: {},
};

const fetchInternalPrescriptions = async () => await axios.get(`${import.meta.env.VITE_BACKEND_URL}/internal-prescription/g/gip`);

const [fetcherSignal, setFetcherSignal] = createSignal(2);

export const [internalPrescriptionsRessource, { mutate, refetch }] = createResource(fetcherSignal(), fetchInternalPrescriptions);

const ManageInternalPrescriptions = (props) => {
	createEffect(() => {
		if (!internalPrescriptionsRessource.loading) {
			setExamsList(internalPrescriptionsRessource().data.internal_prescriptions);
		}
	});

	const containFilterParams = {
		filterOptions: ['contains', 'notContains'],
		debounceMs: 200,
		maxNumConditions: 1,
	};

	const columnsDefs = [
		{
			field: 'constant_info.created_at',
			headerName: 'Date',
			width: 180,
			pinned: true,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-bold'>{moment(cellValue).format('DD/MM/YYYY HH:mm')}</span>;
			},
		},
		{
			field: 'constant_info.card_number',
			headerName: 'Numéro de la carte',
			width: 180,
			pinned: true,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-bold'>{cellValue}</span>;
			},
		},
		{
			field: 'beneficiary_info.family_name',
			headerName: 'Nom',
			width: 250,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span>{cellValue}</span>;
			},
		},
		{
			field: 'beneficiary_info.first_name',
			headerName: 'Prénom(s)',
			width: 250,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span>{cellValue}</span>;
			},
		},
		{
			field: 'beneficiary_info.gender',
			headerName: 'Genre',
			// pinned: "right",
			// cellRenderer: AgTablePriceComponent,
			width: 250,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-semibold'>{cellValue}</span>;
			},
		},
		{
			field: 'beneficiary_info.blood_group',
			headerName: 'Groupe sanguin',
			width: 250,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span>{cellValue}</span>;
			},
		},
		{
			field: 'internal_prescriptions.doctor_info',
			headerName: 'Docteur',
			width: 250,
			pinned: 'right',
			filterParams: containFilterParams,
			valueGetter: (params) => {
				console.log('params:', params);
				return params.data.internal_prescriptions[0].doctor_info;
			},
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-bold'>{cellValue}</span>;
			},
		},
	];

	return (
		<>
			<Show when={!internalPrescriptionsRessource.loading}>
				<TitleCard
					title={"Liste d'attente des examens"}
					topMargin='mt-1'
				>
					<div
						class={'ag-theme-alpine'}
						style={{ height: '32rem' }}
					>
						<AgGridSolid
							columnDefs={columnsDefs}
							rowData={internalPrescriptionsRessource().data.internal_prescriptions}
							defaultColDef={GLOBAL_CONSTANTS.AG_GRID_DEFAULT_COL_DEF}
							pagination={true}
							paginationPageSize={15}
							onSelectionChanged={(val) => {
								const selectedObject = val.api.getSelectedRows()[0];
								console.log(selectedObject);
								openModal({
									...examsModalConfig,
									extraObject: {
										data: selectedObject,
										// config: { openInReadOnlyMode: true },
									},
								});
							}}
							rowSelection='single'
						/>
					</div>
				</TitleCard>
			</Show>
		</>
	);
};

export default ManageInternalPrescriptions;
