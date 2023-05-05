import { Show, createEffect, createSignal } from 'solid-js';
import moment from 'moment';
import toast from 'solid-toast';
import axios from 'axios';

import { INITIAL_CONSTANTS_OBJECT } from '../../../schemas/constantsSchema';
import { closeModal, modalState, setModalState } from '../../../data/modalState';
import InputText from '../../../components/Input/InputText';
import { createConsultationsForm } from '../../../schemas/consultationsSchema';
import { refetch } from './ManageConsultations';
import { refetch as consultationHistoryRefetch } from '../../consultationsHistory/components/ManageConsultationsHistory';
import { refetch as constantRefetch } from '../../constants/components/ManageConstants';
import { VsHistory } from 'solid-icons/vs';
import { TbReportSearch } from 'solid-icons/tb';
import { FaSolidFileMedical } from 'solid-icons/fa';
import { RiHealthHeartPulseLine } from 'solid-icons/ri';
import { BsPostcardHeart } from 'solid-icons/bs';
import { openRightSideBar } from '../../../data/rightSidebarState';
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';
import SelectBox from '../../../components/Input/SelectBox';

const AddConsultationForm = (props) => {
	const [loading, setLoading] = createSignal(false);
	const [constantsObj, setConstantsObj] = createSignal(INITIAL_CONSTANTS_OBJECT);

	const saveConsultation = async (collectedJsonValues) => {
		const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/consultations', collectedJsonValues, {
			headers: {
				'Content-Type': 'application/json',
			},
			authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
		});
		return response;
	};

	const submitForm = (values) => {
		setLoading(true);
		console.log('here');
		const collectedJsonValues = JSON.stringify({
			...values,
			consultation_id: modalState.extraObject.data._id,
			consulted_by: localStorage.getItem('userId') || appStore.userLoginInfo.userId,
		});
		// console.log(collectedJsonValues);
		// return;

		toast.promise(saveConsultation(collectedJsonValues), {
			loading: 'Enregistrement de la nouvelle consultation ...',
			success: (val) => {
				reloadAppAfterOperation();
				// refetch();
				// consultationHistoryRefetch();
				// constantRefetch();
				closeModal();
				reset();
				setLoading(false);
				return <span>Consultation enregistrée</span>;
			},
			error: () => {
				setLoading(false);
				return <span>Erreur lors de la création. Verifier les données et réessayer</span>;
			},
		});
	};

	const { form, data, reset, errors } = createConsultationsForm(submitForm);
	createEffect(() => console.log(data()));

	return (
		<>
			{/* <form use:form> */}
			<div class='mb-4'>
				<div className='divider'>CONSTANTES</div>
				<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
					<div>
						<InputText
							type='text'
							placeholder='Numéro de la Carte'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.constant.card_number : constantsObj().card_number}
							containerStyle='mt-1'
							labelTitle='Numéro de la Carte'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Témperature'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.constant.temperature : constantsObj().temperature}
							containerStyle='mt-1'
							labelTitle='Témperature'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='number'
							placeholder='Taille (cm)'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.constant.height : constantsObj().height}
							containerStyle='mt-1'
							labelTitle='Taille (cm)'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='number'
							placeholder='Poids (cm)'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.constant.weight : constantsObj().weight}
							containerStyle='mt-1'
							labelTitle='Poids (cm)'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='number'
							placeholder='Pouls (bpm)'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.constant.pulse : constantsObj().pulse}
							containerStyle='mt-1'
							labelTitle='Pouls (bpm)'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='number'
							placeholder='Tension Arterielle'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.constant.blood_pressure : constantsObj().blood_pressure}
							containerStyle='mt-1'
							labelTitle='Tension Arterielle'
							disabled={true}
						/>
					</div>
					<div class='md:col-span-2 h-full'>
						<InputText
							type='text'
							placeholder='Autres remarques'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.constant.other : constantsObj().other}
							containerStyle='mt-1'
							labelTitle='Autres remarques'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Date de price des constantes'
							defaultValue={modalState.extraObject?.data && moment(modalState.extraObject.data.constant.created_at).format('DD-MM-YYYY')}
							containerStyle='mt-1'
							labelTitle='Date de price des constantes'
							disabled={true}
						/>
					</div>
					<div class='md:col-span-1'>
						<InputText
							type='text'
							defaultValue={modalState.extraObject?.data?.constant?.constant?.imc ? modalState.extraObject.data?.constant?.imc : 'N.A'}
							containerStyle='mt-1'
							labelTitle='IMC'
							disabled={true}
						/>
					</div>
					<div class='md:col-span-2'>
						<InputText
							type='text'
							defaultValue={modalState.extraObject?.data?.constant?.constant?.imc_interpretation ? modalState.extraObject.data.constant.imc_interpretation : 'N.A'}
							containerStyle='mt-1'
							labelTitle="Signification de l'IMC"
							disabled={true}
						/>
					</div>
				</div>
				<div className='divider'>BÉNÉFICIAIRE</div>
				<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
					<div>
						<InputText
							type='text'
							placeholder='Nom'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary.family_name}
							containerStyle='mt-1'
							labelTitle='Nom'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Prénom(s)'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary.first_name}
							containerStyle='mt-1'
							labelTitle='Prénom(s)'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Date de naissance'
							defaultValue={modalState.extraObject?.data && moment(modalState.extraObject.data.beneficiary.dob).format('DD-MM-YYYY')}
							containerStyle='mt-1'
							labelTitle='Date de naissance'
							disabled={true}
						/>
					</div>
					<div>
						<SelectBox
							containerStyle='mt-1'
							selectStyle={errors('blood_group') ? 'select-error' : ''}
							labelTitle='Groupe sanguin'
							value={modalState.extraObject?.data && modalState.extraObject.data.beneficiary.blood_group}
							name='blood_group'
							placeholder='Groupe sanguin'
							options={GLOBAL_CONSTANTS.OPTIONS.BLOOD_GROUP_OPTIONS}
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Matricule'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary.id_number}
							containerStyle='mt-1'
							labelTitle='Matricule'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Direction'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary.direction}
							containerStyle='mt-1'
							labelTitle='Direction'
							disabled={true}
						/>
					</div>
					<div class='col-span-2'>
						<InputText
							type='text'
							placeholder='Fonction'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary.job_title}
							containerStyle='mt-1'
							labelTitle='Fonction'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Genre'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary.gender}
							containerStyle='mt-1'
							labelTitle='Genre'
							disabled={true}
						/>
					</div>
				</div>
				<div className='divider'>CONSULTATION</div>
				<form use:form>
					<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
						<div class='md:col-span-3'>
							<InputText
								type='text'
								name='sickness'
								placeholder='Pathologie'
								containerStyle='mt-1'
								defaultValue={modalState.extraObject.data.sickness || ''}
								inputStyle={errors('sickness') ? 'input-bordered input-error' : ''}
								labelTitle='Pathologie'
								disabled={!!modalState.extraObject.data.sickness}
							/>
						</div>
						<div class='md:col-span-3'>
							<div class={`form-control w-full mt-1`}>
								<label className='label'>
									<span className='label-text'>Commentaire</span>
								</label>
								<textarea
									className={`textarea textarea-bordered h-24 ${errors('comment') && 'textarea-error'}`}
									placeholder={modalState.extraObject.data.comments || 'Commentaire'}
									name='comment'
									disabled={!!modalState.extraObject.data.comments}
								></textarea>
							</div>
						</div>
					</div>
					<Show when={modalState.extraObject.data.status !== 'done'}>
						<button class={'btn mt-2 btn-primary md:col-span-7 w-full' + (loading() ? ' loading' : '')}>Consulter</button>
					</Show>
				</form>
				<div className='divider'>ACTIONS</div>
				<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
					<button
						type='button'
						className='btn btn-primary btn-outline gap-2 mx-1'
						onClick={() =>
							openRightSideBar({
								header: 'HISTORIQUE',
								bodyType: GLOBAL_CONSTANTS.RIGHT_SIDE_DRAWER.BENEFICIARY_HISTORY,
								extraObject: { ...modalState.extraObject },
							})
						}
					>
						<VsHistory />
						Historique
					</button>
					<button
						type='button'
						className='btn btn-primary btn-outline gap-2 mx-1'
						onClick={() =>
							openRightSideBar({
								header: 'EXAMENS',
								bodyType: GLOBAL_CONSTANTS.RIGHT_SIDE_DRAWER.EXAMENS_NEW,
								extraObject: { ...modalState.extraObject },
							})
						}
					>
						<TbReportSearch />
						Examens
					</button>
					<button
						type='button'
						className='btn btn-primary btn-outline gap-2 mx-1'
						onClick={() =>
							openRightSideBar({
								header: 'CERTIFICAT MEDICAL',
								bodyType: GLOBAL_CONSTANTS.RIGHT_SIDE_DRAWER.MEDICAL_CERTIFICAT_NEW,
								extraObject: { ...modalState.extraObject },
							})
						}
					>
						<FaSolidFileMedical />
						Certificat Medical
					</button>
					<button
						type='button'
						className='btn btn-primary btn-outline gap-2 mx-1'
						onClick={() =>
							openRightSideBar({
								header: 'ACTE MÉDICAL',
								bodyType: GLOBAL_CONSTANTS.RIGHT_SIDE_DRAWER.MEDICAL_ACT_NEW,
								extraObject: { ...modalState.extraObject },
							})
						}
					>
						<RiHealthHeartPulseLine />
						Acte Médical
					</button>
					<button
						type='button'
						className='btn btn-primary btn-outline gap-2 mx-1'
						onClick={() =>
							openRightSideBar({
								header: 'ORDONNANCE INTERNE',
								bodyType: GLOBAL_CONSTANTS.RIGHT_SIDE_DRAWER.INTERNAL_PRESCRIPTION_NEW,
								extraObject: { ...modalState.extraObject },
							})
						}
					>
						<BsPostcardHeart />
						Ordonnance Interne
					</button>
					<button
						type='button'
						className='btn btn-accent btn-outline gap-2 mx-1'
						onClick={() =>
							openRightSideBar({
								header: 'ORDONNANCE EXTERNE',
								bodyType: GLOBAL_CONSTANTS.RIGHT_SIDE_DRAWER.EXTERNAL_PRESCRIPTION_NEW,
								extraObject: { ...modalState.extraObject },
							})
						}
					>
						<BsPostcardHeart />
						Ordonnance Externe
					</button>
				</div>
			</div>
		</>
	);
};

export default AddConsultationForm;
