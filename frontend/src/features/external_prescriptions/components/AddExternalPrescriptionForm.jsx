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
import moment from 'moment';

const AddExternalPrescriptionForm = () => {
	let bonCertificatePdf;
	let otherCertificatePdf;

	const onDownloadBon = () => {
		const doc = new jsPDF();

		doc.html(bonCertificatePdf, {
			callback: function (doc) {
				// Save the PDF
				doc.save('ordonnace-externe-bon.pdf');
			},
			x: 15,
			y: 15,
			width: 180, //target width in the PDF document
			windowWidth: 850, //window width in CSS pixels
		});
	};
	const onDownloadOthers = () => {
		const doc = new jsPDF();

		doc.html(otherCertificatePdf, {
			callback: function (doc) {
				// Save the PDF
				doc.save('ordonnace-externe-autres.pdf');
			},
			x: 15,
			y: 15,
			width: 180, //target width in the PDF document
			windowWidth: 850, //window width in CSS pixels
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
					options={GLOBAL_CONSTANTS.OPTIONS.EXTERNAL_PRESCRIPTIONS_TYPE_OPTIONS}
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

	const saveExternalPrescription = async (collectedJsonValues) => {
		console.log('here');
		const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/external-prescription', collectedJsonValues, {
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
					if (prescription.medication.trim().length === 0 || prescription.posology.trim().length === 0 || prescription.duration.trim().length === 0 || prescription.type.trim().length === 0)
						return;

					return prescription;
				})
				.filter((prescription) => prescription !== undefined),
			consultation_id: rightSidebarState.extraObject.data._id,
			consulted_by: localStorage.getItem('userId') || appStore.userLoginInfo.userId,
		};

		console.log(values.prescription_list);
		if (values.prescription_list.length <= 0) return;

		const collectedJsonValues = JSON.stringify(values);

		toast.promise(saveExternalPrescription(collectedJsonValues), {
			loading: "Enregistrement de l'ordonnance externe ...",
			success: (val) => {
				reloadAppAfterOperation();
				// consultationsRefetch();
				// constantsRefetch();
				// consultationsHistoryRefetch();
				setInternalPrescriptionList(
					<>
						<div class='grid grid-cols-1 gap-x-4 gap-y-1'>
							<div class='md:col-span-3'>
								<IndividualPrescription
									id={0}
									onValueChange={valueChangeHandler}
									options={GLOBAL_CONSTANTS.OPTIONS.EXTERNAL_PRESCRIPTIONS_TYPE_OPTIONS}
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

	const onAdd = () => {
		setInternalPrescriptionList((prevList) => [
			...prevList,
			<>
				<div class='grid grid-cols-1 gap-x-4 gap-y-1'>
					<IndividualPrescription
						id={prevList.length}
						onValueChange={valueChangeHandler}
						options={GLOBAL_CONSTANTS.OPTIONS.EXTERNAL_PRESCRIPTIONS_TYPE_OPTIONS}
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
				<For each={rightSidebarState.extraObject.data.external_prescriptions}>
					{(prescription, idx) => (
						<>
							{console.log(prescription)}
							<div class='divider'>{idx() + 1}</div>
							<IndividualPrescription
								id={idx}
								onValueChange={valueChangeHandler}
								defaultValues={{ ...prescription }}
								disabled
								options={GLOBAL_CONSTANTS.OPTIONS.EXTERNAL_PRESCRIPTIONS_TYPE_OPTIONS}
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
							onClick={onAdd}
							class='h-6 w-6'
						/>
					</button>
				</div>
			</div>
			{/* <div class="divider"></div> */}
			<div class='grid grid-cols-1 gap-x-4 gap-y-1 mt-2'>
				<button
					className='btn btn-primary btn-outline '
					onClick={submitForm}
				>
					Ajouter
				</button>
			</div>
			<div class='grid md:grid-cols-2 gap-x-4 gap-y-1 mt-2'>
				<button
					className='btn btn-primary btn-outline '
					onClick={onDownloadBon}
				>
					Imprimer le Bon
				</button>
				<button
					type='button'
					className='btn btn-primary btn-outline '
					onClick={onDownloadOthers}
				>
					Imprimer autres
				</button>
			</div>

			{/* Template for BON */}
			<div>
				<div className='overflow-hidden hidden'>
					<div ref={bonCertificatePdf}>
						<div class='flex'>
							<div class='flex items-center'>
								<img
									src={logoCnps}
									alt='Cnps logo'
									class='w-48 inline-block justify-self-center'
									style={{ 'max-width': '10rem', 'max-height': '12rem' }}
								/>
							</div>
							<div class='flex items-center ml-2'>
								<div class='grid grid-rows-3 grid-flow-col gap-x-4 text-[10px]'>
									<div class='font-semibold'>ASSURANCE</div>
									<div class='font-semibold'>MALADIE</div>
									<div class='font-semibold'>DE LA C.N.P.S</div>
								</div>
							</div>
							<div class='grow ml-1'>
								<div class='flex flex-col'>
									<div class='flex-none'>
										<div class='grid grid-cols-1 md:grid-cols-2 justify-center'>
											<div class='font-semibold justify-self-center'>ENREGISTREMENT</div>
											<div class='font-semibold justify-self-center'>Réf. : EN-GRH-65 Version: 01</div>
										</div>
									</div>
									<div class='grid grid-cols-1 justify-center'>
										<div class='font-semibold justify-self-center'>BON DE PRISE EN CHARGE CONSULTATION N°</div>
									</div>
									<div class='grid grid-cols-1 justify-center'>
										<div class='text-[6px] justify-self-center'>
											Tout bon dont la délivrance es supérieur à Sept(7) jours doit être retourné au Service Médical du personnel, à défaut ce bon sera rejeté parle Cabinet
											Conseil.
										</div>
									</div>
									<div class='grow p-2'>
										<div class='grid grid-cols-4 justify-center'>
											<div class='grid grid-rows-4 grid-flow-col gap-x-4'>
												<div class='text-[10px] justify-self-center'>N. MATRICULE</div>
												<div class='text-[10px] justify-self-center'>ADHÉRENT</div>
												<div class='text-[10px] font-bold justify-self-center'>{rightSidebarState.extraObject.data.beneficiary.beneficiary_of.id_number}</div>
											</div>
											<div class='grid grid-rows-4 grid-flow-col gap-x-4'>
												<div class='text-[10px] justify-self-center'>N. CARTE DE SANTE</div>
												<div class='text-[10px] justify-self-center'>MALADE</div>
												<div class='text-[10px] font-bold justify-self-center'>{rightSidebarState.extraObject.data.beneficiary.health_card_id}</div>
											</div>
											<div class='grid grid-rows-4 grid-flow-col gap-x-4'>
												<div class='text-[10px] justify-self-center'>DATE DE NAISSANCE</div>
												<div class='text-[10px] justify-self-center'>MALADE</div>
												<div class='text-[10px] font-bold justify-self-center'>{moment(rightSidebarState.extraObject.data.beneficiary.dob).format('DD/MM/YYYY')}</div>
											</div>
											<div class='grid grid-rows-4 grid-flow-col gap-x-4'>
												<div class='grid grid-cols-3 justify-center'>
													<div class='col-span-2'>
														<div class='text-[10px] justify-self-start'>Adhérent</div>
													</div>
													<div>
														<input
															type='checkbox'
															class='checkbox checkbox-sm'
														/>
													</div>
												</div>
												<div class='grid grid-cols-3 justify-center'>
													<div class='col-span-2'>
														<div class='text-[10px] justify-self-start'>Conjoint</div>
													</div>
													<div>
														<input
															type='checkbox'
															class='checkbox checkbox-sm'
														/>
													</div>
												</div>
												<div class='grid grid-cols-3 justify-center'>
													<div class='col-span-2'>
														<div class='text-[10px] justify-self-start'>Enfant</div>
													</div>
													<div>
														<input
															type='checkbox'
															class='checkbox checkbox-sm'
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class='grid grid-cols-4 justify-center'>
							<div class='col-span-3'>
								<div class='grid grid-rows-1 grid-flow-col gap-x-4'>
									<div class='grid grid-rows-5 grid-flow-col gap-x-4'>
										<div>
											Nom et prénoms de l'Adhérant:{' '}
											<span class='font-semibold'>
												{rightSidebarState.extraObject.data.beneficiary.beneficiary_of.family_name +
													' ' +
													rightSidebarState.extraObject.data.beneficiary.beneficiary_of.first_name}
											</span>
										</div>
										<div>
											Nom et prénoms du Malade:{' '}
											<span class='font-semibold'>
												{rightSidebarState.extraObject.data.beneficiary.family_name + ' ' + rightSidebarState.extraObject.data.beneficiary.first_name}
											</span>
										</div>
										<div class='row-span-3'>
											<div class='grid grid-rows-2 grid-flow-col gap-x-4'>
												<div class='grid grid-cols-3 justify-center'>
													<div class='grid grid-rows-3 grid-flow-col gap-x-4'>
														<div class='text-[10px] justify-self-center'>TICKET MODERATEUR</div>
														<div class='text-[10px] justify-self-center font-bold'>20 %</div>
													</div>
													<div class='grid grid-rows-3 grid-flow-col gap-x-4'>
														<div class='text-[10px] justify-self-center'>COÛT DE L'ACTE</div>
														<div class='text-[10px] justify-self-center font-bold'></div>
													</div>
													<div class='grid grid-rows-3 grid-flow-col gap-x-4'>
														<div class='text-[10px] justify-self-center'>PART C.N.P.S</div>
														<div class='text-[10px] justify-self-center font-bold'></div>
													</div>
												</div>

												<div class='grid grid-rows-3 grid-flow-col gap-x-4'>
													<div class='text-[10px] justify-self-center font-bold underline'>DESIGNATION DE L'ACTE</div>
													<div class='text-[10px] justify-self-center'></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div class='grid grid-rows-3 grid-flow-col gap-x-4'>
									<div class='text-[10px] justify-self-center font-bold underline'>RESERVE AU PRATICIEN</div>
									<div class='row-span-2'>
										<div class='text-[10px] justify-self-start'>N° Ordre</div>
										<div class='text-[10px] justify-self-start'>
											Date: <span class='font-bold'>{moment(new Date()).format('DD/MM/YYYY')}</span>
										</div>
										<div class='text-[10px] justify-self-start'>Cachet et Signature</div>
									</div>
								</div>
							</div>
						</div>

						<table className='table table-zebra mx-auto overflow-hidden w-full mt-5'>
							{/* head */}
							<thead>
								<tr>
									<th></th>
									<th>Médicament</th>
									<th>Posologie</th>
									<th>Durée</th>
									<th>Quantité</th>
									<th>Montant</th>
								</tr>
							</thead>
							<tbody>
								<For each={rightSidebarState.extraObject.data.external_prescriptions.filter((exam) => exam.type === 'BON')}>
									{(exam, idx) => (
										<tr>
											<th>{idx() + 1}</th>
											<td>{exam.medication}</td>
											<td>{exam.posology}</td>
											<td>{exam.duration} Jour(s)</td>
											<td>{exam.quantity}</td>
											<td>
												<span class='font-bold'></span>
												{/* <span class='font-bold'>{exam.type}</span> */}
											</td>
										</tr>
									)}
								</For>
							</tbody>
						</table>
						<div class='divider p-0 m-0'></div>
						<div class='grid grid-cols-1 md:grid-cols-2 justify-center'>
							<div class='grid grid-cols-1 md:grid-cols-3 justify-center'>
								<div class='grid grid-rows-3 grid-flow-col gap-x-4'>
									<div class='text-[10px] justify-self-center'>MONTANT PHARMACIE</div>
									<div class='row-span-2'></div>
								</div>
								<div class='grid grid-rows-3 grid-flow-col gap-x-4'>
									<div class='text-[10px] justify-self-center'>REMISE</div>
									<div class='row-span-2'></div>
								</div>
								<div class='grid grid-rows-3 grid-flow-col gap-x-4'>
									<div class='text-[10px] justify-self-center'>REMISE</div>
									<div class='grid grid-cols-2 justify-center gap-x-1'>
										<div class='text-[7px] justify-self-center'>ASSURE 20%</div>
										<div class='text-[7px] justify-self-center'>CNPS 80%</div>
									</div>
									<div class='row-span-2'></div>
								</div>
							</div>
							<div class='grid grid-rows-3 grid-flow-col gap-x-4'>
								<div class='justify-self-center'>Fourni, le {moment(new Date()).format('DD/MM/YYYY')}. Signature et Cachet</div>
								<div class='row-span-2'></div>
							</div>
						</div>
						<div class='divider m-0 p-0'></div>
						<div class='grid grid-rows-5 grid-flow-col gap-x-4'>
							<div class='text-[7px]'>
								Tout bon non utilisés de la préscription. Délai de présentation des Bons au règlement: un (01) mois ce BON es établi en 3ex. N°1 (blanc) à la CNPS par la pharmacie. N°2
								(jaune) au bénéficaire. N°3 (bleu) au praticier.
							</div>
							<div class='text-[8px] row-span-2'>MALADIE:</div>
							<div class='row-span-2 bg-black border'></div>
						</div>
					</div>
				</div>
			</div>

			{/* Template for OTHERS */}
			<div>
				<div className='overflow-hidden hidden'>
					<div ref={otherCertificatePdf}>
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
									<div class='text-xl font-semibold justify-self-center'>ORDONNANCE EXTERNE</div>
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
								<For each={rightSidebarState.extraObject.data.external_prescriptions.filter((exam) => exam.type === 'AUTRE')}>
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

export default AddExternalPrescriptionForm;
