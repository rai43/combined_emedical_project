import AgGridSolid from 'ag-grid-solid';
import TitleCard from '../../../components/Cards/TitleCard';

import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';

import 'moment/src/locale/fr';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';
import { openModal } from '../../../data/modalState';

import { Show, createEffect, createResource, createSignal } from 'solid-js';
import { setConstantsList } from '../../../data/mainStoreFunctions';
import axios from 'axios';
import { appStore } from '../../../data/mainStore';

const constantsModalConfig = {
	title: 'Prise des constantes',
	size: 'lg',
	bodyType: GLOBAL_CONSTANTS.MODAL_BODY_TYPES.CONSTANTS_NEW,
	extraObject: {},
};

const onSelectionChanged = () => {
	const selectedRows = gridOptions.api.getSelectedRows();
	console.log(selectedRows.length === 1 ? selectedRows[0].athlete : '');
};

const TopSideButtons = () => {
	return (
		<div class='inline-block float-right'>
			<button
				class='btn px-6 btn-sm normal-case btn-primary'
				onClick={() => openModal(constantsModalConfig)}
			>
				Prise de constantes
			</button>
		</div>
	);
};

const fetchConstants = async () => await axios.get(`${import.meta.env.VITE_BACKEND_URL}/constants`);

const [fetcherSignal, setFetcherSignal] = createSignal(1);
export const [constantsRessource, { mutate, refetch }] = createResource(fetcherSignal(), fetchConstants);

const ManageConstants = (props) => {
	createEffect(() => {
		if (!constantsRessource.loading) {
			setConstantsList(constantsRessource().data.constants);
		}
	});

	const containFilterParams = {
		filterOptions: ['contains', 'notContains'],
		debounceMs: 200,
		maxNumConditions: 1,
	};

	const columnsDefs = [
		{
			field: 'card_number',
			headerName: 'Numéro de la Carte',
			width: 200,
			pinned: true,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-bold'>{cellValue}</span>;
			},
		},
		{
			field: 'imc',
			headerName: 'IMC',
			width: 160,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-bold'>{cellValue !== 0 ? cellValue : 'N.A'}</span>;
			},
		},
		{
			field: 'temperature',
			headerName: 'Temperature',
			width: 160,
			filter: 'Temperature',
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				console.log(value.value);
				return <span>{cellValue} °C</span>;
			},
		},
		{
			field: 'height',
			headerName: 'Taille (cm)',
			width: 160,
			filter: 'agDateColumnFilter',
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				console.log(value.value);
				return <span>{cellValue} cm</span>;
			},
		},
		{
			field: 'weight',
			headerName: 'Poids (Kg)',
			width: 160,
			filter: 'agDateColumnFilter',
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				console.log(value.value);
				return <span>{cellValue} Kg</span>;
			},
		},
		{
			field: 'pulse',
			headerName: 'Pouls',
			width: 120,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				console.log(value.value);
				return <span class='font-semibold'>{cellValue} bpm</span>;
			},
		},
		{
			field: 'blood_pressure',
			headerName: 'Tension Arterielle',
			width: 120,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				console.log(value.value);
				return <span class='font-semibold'>{cellValue} mHg</span>;
			},
		},
		{
			field: 'created_at',
			headerName: 'Date et heure',
			pinned: 'right',
			width: 200,
			filterParams: containFilterParams,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				console.log(value.value);
				return <span class='font-semibold'>{moment(cellValue).locale('fr').format('DD-MM-YYYY à hh:mm:ss')}</span>;
			},
		},
	];

	return (
		<>
			<Show when={!constantsRessource.loading}>
				<TitleCard
					title={'Prise des constantes'}
					topMargin='mt-1'
					TopSideButtons={TopSideButtons}
				>
					<div
						class={'ag-theme-alpine'}
						style={{ height: '32rem' }}
					>
						<AgGridSolid
							columnDefs={columnsDefs}
							rowData={constantsRessource().data.constants}
							defaultColDef={GLOBAL_CONSTANTS.AG_GRID_DEFAULT_COL_DEF}
							pagination={true}
							paginationPageSize={15}
							onSelectionChanged={(val) => {
								const selectedObject = val.api.getSelectedRows()[0];
								console.log(selectedObject);
								openModal({
									...constantsModalConfig,
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

export default ManageConstants;
