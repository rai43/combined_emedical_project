import { For, Show, createEffect, createSignal, onMount } from 'solid-js';
import toast from 'solid-toast';
import jsPDF from 'jspdf';
import axios from 'axios';
import { createExamsForm } from '../../../schemas/examsSchema';
import { BsPlusLg } from 'solid-icons/bs';
import { closeRightSideBar, rightSidebarState } from '../../../data/rightSidebarState';
import { appStore } from '../../../data/mainStore';
import { refetch as consultationsRefetch } from '../../consultations/components/ManageConsultations';
import { refetch as constantsRefetch } from '../../constants/components/ManageConstants';
import { refetch as consultationsHistoryRefetch } from '../../consultationsHistory/components/ManageConsultationsHistory';
import InputText from '../../../components/Input/InputText';
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';
import Exam from '../../exams/components/Exam';
import logoCnps from '../../../assets/logoCnps.jpeg';

import IndividualPrescription from './IndividualPrescription';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';

const AddInternalPrescriptionForm = () => {
	let internalCertificatePdf;

	const onDownload = () => {
		const doc = new jsPDF();

		doc.html(internalCertificatePdf, {
			callback: function (doc) {
				// Save the PDF
				doc.save('ordonnace-interne.pdf');
			},
			x: 15,
			y: 15,
			width: 170, //target width in the PDF document
			windowWidth: 700, //window width in CSS pixels
		});
	};

	const valueChangeHandler = (id, field, value) => {
		// different fieldtypes: medication, posology, duration, quantity
		setInternalPrescriptionData((prevData) => {
			return { ...prevData, [id]: { ...prevData[id], [field]: value } };
		});
	};

	const [loading, setLoading] = createSignal(false);

	const [internalPrescriptionList, setInternalPrescriptionList] = createSignal([
		<>
			<div class='grid grid-cols-1 gap-x-4 gap-y-1'>
				<IndividualPrescription
					id={0}
					onValueChange={valueChangeHandler}
				/>
			</div>
		</>,
	]);

	const [internalPrescriptionData, setInternalPrescriptionData] = createSignal({
		0: {
			medication: '',
			posology: '',
			duration: '',
			quantity: '',
		},
	});

	createEffect(() => console.log(internalPrescriptionData()));

	const saveExams = async (collectedJsonValues) => {
		console.log('here');
		const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/internal-prescription', collectedJsonValues, {
			headers: {
				'Content-Type': 'application/json',
			},
			authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
		});
		return response;
	};

	const submitForm = () => {
		setLoading(true);

		const values = {
			prescription_list: Object.values(internalPrescriptionData())
				.map((prescription) => {
					console.log(prescription.medication.trim().length === 0, prescription.posology.trim().length === 0, prescription.duration.trim().length === 0);
					if (prescription.medication.trim().length === 0 || prescription.posology.trim().length === 0 || prescription.duration.trim().length === 0) return;

					return prescription;
				})
				.filter((prescription) => prescription !== undefined),
			consultation_id: rightSidebarState.extraObject.data._id,
			consulted_by: localStorage.getItem('userId') || appStore.userLoginInfo.userId,
		};

		console.log(values.prescription_list);
		if (values.prescription_list.length <= 0) return;

		const collectedJsonValues = JSON.stringify(values);

		toast.promise(saveExams(collectedJsonValues), {
			loading: "Enregistrement de l'ordonnance interne ...",
			success: (val) => {
				reloadAppAfterOperation();
				setInternalPrescriptionList(
					<>
						<div class='grid grid-cols-1 gap-x-4 gap-y-1'>
							<div class='md:col-span-3'>
								<IndividualPrescription
									id={0}
									onValueChange={valueChangeHandler}
								/>
							</div>
						</div>
					</>
				);
				setInternalPrescriptionData({
					0: {
						medication: '',
						posology: '',
						duration: '',
						quantity: '',
					},
				});

				closeRightSideBar();
				setLoading(false);
				return <span>Ordonnace enregistrée</span>;
			},
			error: () => {
				setLoading(false);
				return <span>Erreur lors de la création de l'ordonnace interne. Verifier les données et réessayer</span>;
			},
		});
	};

	const onAddExam = () => {
		setInternalPrescriptionList((prevList) => [
			...prevList,
			<>
				<div class='grid grid-cols-1 gap-x-4 gap-y-1'>
					<IndividualPrescription
						id={prevList.length}
						onValueChange={valueChangeHandler}
					/>
				</div>
			</>,
		]);
		setInternalPrescriptionData((prevData) => {
			return {
				...prevData,
				[internalPrescriptionList().length - 1]: {
					medication: '',
					posology: '',
					duration: '',
					quantity: '',
				},
			};
		});
	};

	return (
		<>
			<div class='my-5'>
				<For each={rightSidebarState.extraObject.data.internal_prescriptions}>
					{(exam, idx) => (
						<>
							<div class='divider'>{idx() + 1}</div>
							<IndividualPrescription
								id={idx}
								onValueChange={valueChangeHandler}
								defaultValues={{ ...exam }}
								disabled
							/>
						</>
					)}
				</For>
				{internalPrescriptionList()}
			</div>
			<div class='flex flex-row-reverse'>
				<div>
					<button className='btn btn-sm btn-square btn-outline'>
						<BsPlusLg
							onClick={onAddExam}
							class='h-6 w-6'
						/>
					</button>
				</div>
			</div>
			{/* <div class="divider"></div> */}
			<div class='grid grid-cols-2 gap-x-4 gap-y-1 mt-2'>
				<button
					className='btn btn-primary btn-outline '
					onClick={submitForm}
				>
					Ajouter
				</button>
				<button
					type='button'
					className='btn btn-primary btn-outline '
					onClick={onDownload}
				>
					Imprimer
				</button>
			</div>
			<div>
				<div className='overflow-hidden hidden'>
					<div ref={internalCertificatePdf}>
						<div class='grid grid-cols-1 md:grid-cols-4 gap-x-0 gap-y-1 justify-center my-6  p-2'>
							<div class='border p-2'>
								<img
									src={logoCnps}
									alt='Cnps logo'
									class='w-48 inline-block'
									style={{ 'max-width': '10rem', 'max-height': '10rem' }}
								/>
							</div>
							<div class='col-span-2 border p-2'>
								<div class='grid grid-rows-2 grid-flow-col gap-4'>
									<div class='justify-self-center'>ENREGISTREMENT</div>
									<div class='text-xl font-semibold justify-self-center'>ORDONNANCE INTERNE</div>
								</div>
							</div>
							<div class='border p-2'>
								<div class='grid grid-rows-3 grid-flow-col gap-x-4'>
									<div class='font-semibold'>Réf. : EN-GRH-65</div>
									<div class='font-semibold'>Version: 03</div>
									<div class='font-semibold'>Page: 1/1</div>
								</div>
							</div>
						</div>
						<table className='table table-zebra max-w-4xl mx-auto overflow-hidden w-full mt-5'>
							{/* head */}
							<thead>
								<tr>
									<th></th>
									<th>Médicament</th>
									<th>Posologie</th>
									<th>Durée</th>
									<th>Quantité</th>
								</tr>
							</thead>
							<tbody>
								<For each={rightSidebarState.extraObject.data.internal_prescriptions}>
									{(exam, idx) => (
										<tr>
											<th>{idx() + 1}</th>
											<td>{exam.medication}</td>
											<td>{exam.posology}</td>
											<td>{exam.duration} Jour(s)</td>
											<td>{exam.quantity}</td>
										</tr>
									)}
								</For>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddInternalPrescriptionForm;
