import * as zod from 'zod';
import { createForm } from '@felte/solid';
import { Show, createEffect } from 'solid-js';
import { validateSchema } from '@felte/validator-zod';
import InputText from '../../../components/Input/InputText';
import { rightSidebarState } from '../../../data/rightSidebarState';
import { appStore } from '../../../data/mainStore';
import logoCnps from '../../../assets/logoCnps.jpeg';
import toast from 'solid-toast';
import axios from 'axios';
import moment from 'moment';
import jsPDF from 'jspdf';
import Medical_certificate_pdf from './Medical_certificate_pdf';
import { refetch as consultationRefetch } from '../../consultations/components/ManageConsultations';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';

const INITIAL_MEDICAL_CERTIFICATE_OBJECT = {
	days_number: '',
	stop_work_extended_from: '',
	extention_needed_for: '',
	extention_extended_from: '',
	back_on: '',
};

const medicalCertificateSchema = zod.object({
	days_number: zod.number().positive(),
	// stop_work_extended_from: zod.preprocess((arg) => {
	//   if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
	// }, zod.date()),
	// extention_needed_for: zod.preprocess((arg) => {
	//   if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
	// }, zod.date()),
	// extention_extended_from: zod.preprocess((arg) => {
	//   if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
	// }, zod.date()),
	back_on: zod.preprocess((arg) => {
		if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
	}, zod.date()),
});

const createGenerateMedicalForm = (submitForm) => {
	const { form, data, errors, reset } = createForm({
		validate: validateSchema(medicalCertificateSchema),
		onSubmit: submitForm,
	});

	return { form, data, errors, reset };
};

const GenerateMedicalCertificate = (props) => {
	let elementHTML;
	const onDownload = () => {
		const doc = new jsPDF();
		console.log('here');

		doc.html(elementHTML, {
			callback: function (doc) {
				// Save the PDF
				doc.save('medical-report.pdf');
			},
			x: 15,
			y: 15,
			width: 170, //target width in the PDF document
			windowWidth: 650, //window width in CSS pixels
		});
	};

	const saveMedicalCertificate = async (collectedJsonValues) => {
		console.log('colle : ', collectedJsonValues);
		const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/medical-certificate', collectedJsonValues, {
			headers: {
				'Content-Type': 'application/json',
			},
			authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
		});
		return response;
	};

	const submitForm = async (values) => {
		console.log(values);

		values = {
			...values,
			consultation: rightSidebarState.extraObject.data._id,
			patient: rightSidebarState.extraObject.data.beneficiary._id,
			doctor: localStorage.getItem('userId'),
		};

		const collectedJsonValues = JSON.stringify(values);
		toast.promise(saveMedicalCertificate(collectedJsonValues), {
			loading: 'Enregistrement du certificat médical ...',
			success: (val) => {
				reloadAppAfterOperation();
				// consultationRefetch();
				// refetch();
				// consultationRefetch();
				// closeModal();
				// reset();
				return <span>Constante enregistrée</span>;
			},
			error: () => {
				return <span>Erreur lors de la création.</span>;
			},
		});
	};

	const { form, data, reset, errors, isValid } = createGenerateMedicalForm(submitForm);

	createEffect(() => console.log(data()));

	return (
		<>
			<form use:form>
				<div className='divider my-2'>Arrêt de travail</div>
				<div class='mb-4'>
					<div class='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1'>
						<div>
							<InputText
								defaultValue={rightSidebarState.extraObject?.data ? rightSidebarState.extraObject?.data?.medical_report?.days_number : ''}
								type='number'
								name='days_number'
								placeholder='Arret de travail - Nombre de jours'
								containerStyle='mt-1'
								// inputStyle={errors("dob") ? "input-bordered input-error" : ""}
								labelTitle='Arret de travail'
								// disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								defaultValue={
									rightSidebarState.extraObject?.data?.medical_report ? moment(rightSidebarState.extraObject?.data?.medical_report?.stop_work_extended_from).format('YYYY-MM-DD') : ''
								}
								type='date'
								name='stop_work_extended_from'
								placeholder='Complication a dater du'
								containerStyle='mt-1'
								// inputStyle={errors("dob") ? "input-bordered input-error" : ""}
								labelTitle='Complication a dater du'
								// disabled={isLocked()}
							/>
						</div>
					</div>
				</div>
				<div className='divider my-2'>Prolongation d'arrêt de travail</div>
				<div class='mb-4'>
					<div class='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1'>
						<div>
							<InputText
								defaultValue={rightSidebarState.extraObject?.data?.medical_report ? rightSidebarState.extraObject?.data?.medical_report?.extention_needed_for : ''}
								type='number'
								name='extention_needed_for'
								placeholder='Nombre de jours'
								containerStyle='mt-1'
								// inputStyle={errors("dob") ? "input-bordered input-error" : ""}
								labelTitle='Arret de travail'
								// disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								defaultValue={
									rightSidebarState.extraObject?.data?.medical_report ? moment(rightSidebarState.extraObject?.data?.medical_report?.extention_extended_from).format('YYYY-MM-DD') : ''
								}
								type='date'
								name='extention_extended_from'
								placeholder='Sauf complication a dater du'
								containerStyle='mt-1'
								// inputStyle={errors("dob") ? "input-bordered input-error" : ""}
								labelTitle='Complication a dater du'
								// disabled={isLocked()}
							/>
						</div>
					</div>
				</div>
				<div className='divider my-2'>Reprise du travail</div>
				<div class='mb-4'>
					<div class='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1'>
						<div class='col-span-2'>
							<InputText
								defaultValue={rightSidebarState.extraObject?.data ? moment(rightSidebarState.extraObject?.data?.medical_report?.back_on).format('YYYY-MM-DD') : ''}
								type='date'
								name='back_on'
								placeholder='Date de reprise'
								containerStyle='mt-1'
								// inputStyle={errors("dob") ? "input-bordered input-error" : ""}
								labelTitle='Date de reprise'
								// disabled={isLocked()}
							/>
						</div>
					</div>
					{/* <Show when={!readOnly()}> */}
					<div class={`grid grid-cols-1 ${rightSidebarState.extraObject?.data?.medical_report ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-x-4 gap-y-1 mt-2`}>
						<button
							class={'btn btn-primary w-full '}
							// (loading() ? " loading" : "")
						>
							Sauvegarder
						</button>
						<Show when={rightSidebarState.extraObject?.data?.medical_report}>
							<button
								type='button'
								class='btn btn-outline btn-primary'
								onClick={onDownload}
							>
								Télécharger
							</button>
						</Show>
					</div>
					{/* </Show> */}
				</div>
			</form>
			{/* <Medical_certificate_pdf /> */}

			<>
				<div class='m-4 p-4 mt-6 card shadow-xl hidden'>
					<div ref={elementHTML}>
						<div class='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1 justify-center'>
							<div class=''>
								<img
									src={logoCnps}
									alt='Cnps logo'
									class='w-48 inline-block'
									style={{ 'max-width': '10rem', 'max-height': '10rem' }}
								/>
							</div>
							<div class='col-span-2'>
								<div class='grid grid-rows-2 grid-flow-col gap-4'>
									<div class='justify-self-center'>ENREGISTREMENT</div>
									<div class='text-xl font-semibold justify-self-center'>CERTIFICAT MEDICAL</div>
								</div>
							</div>
							<div>
								<div class='grid grid-rows-3 grid-flow-col gap-x-4'>
									<div class='font-semibold'>Réf. : EN-GRH-65</div>
									<div class='font-semibold'>Version: 03</div>
									<div class='font-semibold'>Page: 1/1</div>
								</div>
							</div>
						</div>
						<div class='m-5 p-3 text-lg text-justify'>
							<span>Je soussigné, Docteur en Médecine certifie que l'état de santé de: </span>
							<br />
							<span class='font-semibold'>{rightSidebarState.extraObject?.data?.beneficiary?.family_name + ' ' + rightSidebarState.extraObject?.data?.beneficiary?.first_name}</span>
							<br />
							<br />
							<span class='font-bold'>1. Nécessite un traitement avec arrêt de travail </span>
							<span class='font-semibold ml-2 text-primary'>de {rightSidebarState.extraObject?.data?.medical_report?.days_number} Jours</span>
							<br />

							<span class='font-bold ml-4'>
								sauf complication à dater du{' '}
								<span class='font-semibold ml-2 text-primary'>{rightSidebarState.extraObject?.data?.medical_report?.stop_work_extended_from || '...'}</span>
							</span>
							<br />

							<br />
							<br />
							<span class='font-bold'>2. Nécessite une prolongation d'arrêt de travail </span>
							<span class='font-semibold ml-2 text-primary'>
								<Show
									when={rightSidebarState.extraObject?.data?.medical_report?.stop_work_extended_from}
									fallback={'...'}
								>
									{'de ' + rightSidebarState.extraObject?.data?.medical_report?.stop_work_extended_from + ' Jours'}
								</Show>
							</span>
							<br />

							<span class='font-bold ml-4'>
								sauf complication à dater du <span class='font-semibold ml-2 text-primary'>{rightSidebarState.extraObject?.data.medical_report?.extention_extended_from || '...'}</span>
							</span>
							<br />
							<br />
							<br />
							<span class='font-bold'>3. Lui permettant de reprendre le travail à dater </span>
							<span class='font-semibold ml-2 text-primary'>du {moment(rightSidebarState.extraObject?.data?.medical_report?.back_on).format('DD/MM/YYYY')}</span>
						</div>
					</div>
				</div>
			</>
		</>
	);
};

export default GenerateMedicalCertificate;
