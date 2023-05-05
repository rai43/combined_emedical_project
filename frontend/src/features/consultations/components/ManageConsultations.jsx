import AgGridSolid from 'ag-grid-solid';
import TitleCard from '../../../components/Cards/TitleCard';

import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';

import 'moment/src/locale/fr';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';
import { openModal } from '../../../data/modalState';
import { createEffect, createResource, createSignal, onMount } from 'solid-js';
import { setConsultationsList } from '../../../data/mainStoreFunctions';
import axios from 'axios';

const consultationsModalConfig = {
	title: 'Tableau de consultation',
	size: 'lg',
	bodyType: GLOBAL_CONSTANTS.MODAL_BODY_TYPES.CONSULTATIONS_NEW,
	extraObject: {},
};

const onSelectionChanged = () => {
	const selectedRows = gridOptions.api.getSelectedRows();
};

const fetchConstants = async () => await axios.get(`${import.meta.env.VITE_BACKEND_URL}/consultations`);

const [fetcherSignal, setFetcherSignal] = createSignal(2);

export const [consultationsRessource, { mutate, refetch }] = createResource(fetcherSignal(), fetchConstants);

const ManageConsultations = (props) => {
	createEffect(() => {
		if (!consultationsRessource.loading) {
			setConsultationsList(consultationsRessource().data.consultations);
		}
	});

	const containFilterParams = {
		filterOptions: ['contains', 'notContains'],
		debounceMs: 200,
		maxNumConditions: 1,
	};

	const columnsDefs = [
		{
			field: 'constant.card_number',
			headerName: 'Numéro de la Carte',
			width: 180,
			pinned: true,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-bold'>{cellValue}</span>;
			},
		},
		{
			field: 'constant.temperature',
			headerName: 'Temperature',
			width: 160,
			filter: 'Temperature',
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span>{cellValue} °C</span>;
			},
		},
		{
			field: 'constant.height',
			headerName: 'Taille (cm)',
			width: 160,
			filter: 'agDateColumnFilter',
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span>{cellValue} cm</span>;
			},
		},
		{
			field: 'constant.weight',
			headerName: 'Poids (Kg)',
			width: 160,
			filter: 'agDateColumnFilter',
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span>{cellValue} Kg</span>;
			},
		},
		{
			field: 'constant.pulse',
			headerName: 'Pouls',
			// pinned: "right",
			// cellRenderer: AgTablePriceComponent,
			width: 120,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-semibold'>{cellValue} bpm</span>;
			},
		},
		{
			field: 'constant.blood_pressure',
			headerName: 'Tension Arterielle',
			// pinned: "right",
			// cellRenderer: AgTablePriceComponent,
			width: 120,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-semibold'>{cellValue} mHg</span>;
			},
		},
		{
			field: 'created_at',
			headerName: 'Date et heure',
			pinned: 'right',
			// cellRenderer: AgTablePriceComponent,
			width: 200,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-semibold'>{moment(cellValue).locale('fr').format('DD-MM-YYYY à hh:mm:ss')}</span>;
			},
		},
	];

	return (
		<>
			<Show when={!consultationsRessource.loading}>
				<TitleCard
					title={"Liste d'attente des consultations"}
					topMargin='mt-1'
				>
					<div
						class={'ag-theme-alpine'}
						style={{ height: '32rem' }}
					>
						<AgGridSolid
							columnDefs={columnsDefs}
							rowData={consultationsRessource().data.consultations}
							defaultColDef={GLOBAL_CONSTANTS.AG_GRID_DEFAULT_COL_DEF}
							pagination={true}
							paginationPageSize={15}
							onSelectionChanged={(val) => {
								const selectedObject = val.api.getSelectedRows()[0];
								openModal({
									...consultationsModalConfig,
									extraObject: {
										data: selectedObject,
										config: { openInReadOnlyMode: true },
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

export default ManageConsultations;
