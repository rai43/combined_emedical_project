import { FiUploadCloud } from 'solid-icons/fi';
import dragDrop from 'drag-drop';
import readXlsxFile from 'read-excel-file';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Show, createSignal, onMount } from 'solid-js';
import TitleCard from '../../../components/Cards/TitleCard';
import axios from 'axios';
import toast from 'solid-toast';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';
import { closeModal } from '../../../data/modalState';

const AddToStock = () => {
	const [showUploadButton, setShowUploadButton] = createSignal(false);
	const [info, setInfo] = createSignal('');
	const [data, setData] = createSignal([]);

	const onDownloadMedecinList = () => {
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/medication`)
			.then((response) => {
				const header = ['Nom du Medicament', 'Quantité'];
				const medicationsName = response.data.medications.map((med) => {
					return { 'NOM DU MEDICAMENT': med.commercial_name, QUANTITE: '' };
				});
				console.log([header, ...medicationsName]);
				const data = [...medicationsName];
				const workSheet = XLSX.utils.json_to_sheet(data);
				const workBook = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
				XLSX.writeFile(workBook, 'Liste_complete_des_medicaments.xlsx');
			})
			.catch((err) => console.log('Erreur lors de la generation des données.', err));
	};

	const TopSideButtons = () => {
		return (
			<div class='inline-block float-right'>
				<button
					class='btn px-6 btn-sm normal-case btn-primary'
					onClick={onDownloadMedecinList}
				>
					Télécharger la liste des médicaments
				</button>
			</div>
		);
	};

	const manageFileDrop = () => {
		readXlsxFile(input.files[0]).then((rows) => {
			let finalRows;
			if (rows.length > 1) {
				finalRows = rows
					.map((row) => {
						if (row[0].length > 0 && row[1] > 0) {
							console.log(row);
							return row;
						}
					})
					.filter((elt) => elt != undefined);
				if (finalRows.length < 2) return;
				setShowUploadButton(true);
				setData(finalRows.slice(1));
			} else {
				setShowUploadButton(false);
				return;
			}
			setInfo(`${finalRows.length} ligne(s) téléchargées`);
		});
	};

	const saveMedications = async (collectedJsonValues) => {
		const response = await axios.patch(import.meta.env.VITE_BACKEND_URL + '/medication/ats', collectedJsonValues, {
			headers: {
				'Content-Type': 'application/json',
			},
			authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
		});
		return response;
	};

	const onSubmit = async () => {
		const collectedJsonValues = JSON.stringify({ medications: data() });

		toast.promise(saveMedications(collectedJsonValues), {
			loading: 'Enregistrement des médicaments ...',
			success: (val) => {
				reloadAppAfterOperation();
				closeModal();
				setData([]);
				setInfo('');
				setShowUploadButton(false);
				return <span>Medicaments enregistrés</span>;
			},
			error: () => {
				return <span>Erreur lors de la création. Verifier l'existence du bénéficiaire et réessayer</span>;
			},
		});
	};

	return (
		<>
			<TitleCard
				title={'Approvisionner'}
				topMargin='mt-1'
				TopSideButtons={TopSideButtons}
			>
				<div
					class='max-w-xl mx-auto'
					id='dropTarget'
				>
					<label class='flex justify-center w-full h-32 px-4 transition bg-transparent border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'>
						<span class='flex items-center space-x-2'>
							<FiUploadCloud class='h-6 w-6' />
							<span class='font-medium text-gray-600'>Déposer les fichiers à joindre</span>
						</span>
						<input
							type='file'
							id='input'
							onChange={manageFileDrop}
							hidden
						/>
					</label>
				</div>
				<div class='container mx-auto my-5'>{info()}</div>
				<Show when={showUploadButton()}>
					<button
						class='btn btn-outline btn-primary w-full'
						onClick={onSubmit}
					>
						Enregistrer
					</button>
				</Show>
			</TitleCard>
		</>
	);
};

export default AddToStock;
