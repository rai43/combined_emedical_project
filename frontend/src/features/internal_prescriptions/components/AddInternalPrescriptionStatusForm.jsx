import moment from 'moment';
import InputText from '../../../components/Input/InputText';
import { modalState, setModalState } from '../../../data/modalState';
import { For, Show, createEffect, createSignal } from 'solid-js';
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';
import SelectBoxWithFunc from '../../../components/Input/SelectBoxWithFunc';
import SelectBox from '../../../components/Input/SelectBox';
import FileUpload from '../../../components/Input/FileUpload';
import toast from 'solid-toast';
import axios from 'axios';

import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';
import { userException } from '../../../../helpers/helperFunctions';

const AddInternalPrescriptionStatusForm = (props) => {
	const saveExamResult = async (collectedJsonValues) => {
		const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/internal-prescription/ptc/mipas`, collectedJsonValues, {
			headers: {
				'Content-Type': 'application/json',
			},
			authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
		});
		return response;
	};

	const onSave = (pid, event) => {
		const collectedJsonValues = JSON.stringify({ pid, served_quantity: document.getElementById(pid).value });

		toast.promise(saveExamResult(collectedJsonValues, pid), {
			loading: "Enregistrement de resultats d'examen ...",
			success: (val) => {
				if (val.data?.error && val.data?.error?.code === -2) {
					throw new userException(val.data?.error?.message, val.data?.error?.code || -1);
				}
				reloadAppAfterOperation();
				event.target.remove();
				return <span>Résultats enregistré</span>;
			},
			error: (err) => {
				console.log(err?.code);
				if (err?.code === -2) {
					return <span>{err?.message || 'Une erreur est survénue'}</span>;
				}
				return <span>Erreur lors de la création. Verifier vos données</span>;
			},
		});
	};

	return (
		<>
			<div class='mb-4'>
				<div className='divider'>CONSTANTES</div>
				<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
					<div>
						<InputText
							type='text'
							placeholder='Numéro de la Carte'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.constant_info.card_number : constantsObj().card_number}
							containerStyle='mt-1'
							labelTitle='Numéro de la Carte'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Témperature'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.constant_info.temperature : constantsObj().temperature}
							containerStyle='mt-1'
							labelTitle='Témperature'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='number'
							placeholder='Taille (cm)'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.constant_info.height : constantsObj().height}
							containerStyle='mt-1'
							labelTitle='Taille (cm)'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='number'
							placeholder='Poids (cm)'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.constant_info.weight}
							containerStyle='mt-1'
							labelTitle='Poids (cm)'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='number'
							placeholder='Pouls (bpm)'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.constant_info.pulse}
							containerStyle='mt-1'
							labelTitle='Pouls (bpm)'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='number'
							placeholder='Tension Arterielle'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.constant_info.blood_pressure}
							containerStyle='mt-1'
							labelTitle='Tension Arterielle'
							disabled={true}
						/>
					</div>
					<div class='md:col-span-3 h-full'>
						<InputText
							type='text'
							placeholder='Autres remarques'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.constant_info.other}
							containerStyle='mt-1'
							labelTitle='Autres remarques'
							disabled={true}
						/>
					</div>
					<div class='md:col-span-1'>
						<InputText
							type='text'
							defaultValue={modalState.extraObject?.data?.constant_info?.imc ? modalState.extraObject.data.constant_info.imc : 'N.A'}
							containerStyle='mt-1'
							labelTitle='IMC'
							disabled={true}
						/>
					</div>
					<div class='md:col-span-2'>
						<InputText
							type='text'
							defaultValue={modalState.extraObject?.data?.constant_info?.imc_interpretation ? modalState.extraObject.data.constant_info?.imc_interpretation : 'N.A'}
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
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary_info.family_name}
							containerStyle='mt-1'
							labelTitle='Nom'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Prénom(s)'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary_info.first_name}
							containerStyle='mt-1'
							labelTitle='Prénom(s)'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Date de naissance'
							defaultValue={modalState.extraObject?.data && moment(modalState.extraObject.data.beneficiary_info.dob).format('DD-MM-YYYY')}
							containerStyle='mt-1'
							labelTitle='Date de naissance'
							disabled={true}
						/>
					</div>

					<div>
						<SelectBox
							containerStyle='mt-1'
							labelTitle='Groupe sanguin'
							value={modalState.extraObject?.data && modalState.extraObject.data.beneficiary_info.blood_group}
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
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary_info.id_number}
							containerStyle='mt-1'
							labelTitle='Matricule'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Direction'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary_info.direction}
							containerStyle='mt-1'
							labelTitle='Direction'
							disabled={true}
						/>
					</div>
					<div class='col-span-2'>
						<InputText
							type='text'
							placeholder='Fonction'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary_info.job_title}
							containerStyle='mt-1'
							labelTitle='Fonction'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Genre'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.beneficiary_info.gender}
							containerStyle='mt-1'
							labelTitle='Genre'
							disabled={true}
						/>
					</div>
				</div>
				<div class='divider'>ORDONNANCE INTERNE</div>
				<For each={modalState.extraObject?.data?.internal_prescriptions}>
					{(ip) => (
						<>
							<>
								<div class='grid grid-cols-6 gap-x-4 gap-y-1'>
									<div class='col-span-3'>
										<div class={`form-control w-full mt-1`}>
											<label class='label'>
												<span class={'label-text text-base-content ' + props.labelStyle}>Médicament</span>
											</label>
											<input
												type='text'
												value={ip.medication || ''}
												class={'input input-bordered w-full'}
												disabled={true}
											/>
										</div>
									</div>

									<div class='col-span-3'>
										<div class={`form-control w-full mt-1`}>
											<label class='label'>
												<span class={'label-text text-base-content'}>Durée (Jours)</span>
											</label>
											<input
												type='number'
												value={ip.duration || ''}
												class={'input input-bordered w-full'}
												disabled={true}
											/>
										</div>
									</div>

									<div class='col-span-4'>
										<div class={`form-control w-full mt-1`}>
											<label class='label'>
												<span class={'label-text text-base-content'}>Posologie</span>
											</label>
											<input
												type='text'
												value={ip.posology || ''}
												placeholder='Posologie'
												class={'input input-bordered w-full '}
												disabled={true}
											/>
										</div>
									</div>

									<div class='col-span-1'>
										<div class={`form-control w-full mt-1`}>
											<label class='label'>
												<span class={'label-text text-base-content'}>Quantité préscrite</span>
											</label>
											<input
												type='number'
												value={ip?.quantity || ''}
												name={'qty'}
												placeholder='Quantité'
												class={'input input-bordered w-full '}
												disabled={true}
											/>
										</div>
									</div>
									<div class='col-span-1'>
										<div class={`form-control w-full mt-1`}>
											<label class='label'>
												<span class={'label-text text-base-content'}>Quantité servie</span>
											</label>
											<input
												type='number'
												value={ip?.quantity || ''}
												name={'qty'}
												placeholder='Quantité'
												class={'input input-bordered w-full'}
												disabled={false}
												max={ip?.quantity}
												min={0}
												id={ip?._id}
												onChange={(e) => {
													console.log(e.target.value);
												}}
											/>
										</div>
									</div>
									<div class='md:col-span-6 mt-4 mx-auto'>
										<button
											class='btn btn-outline btn-primary'
											onClick={(e) => {
												console.log(e);
												onSave(ip?._id, e);
											}}
										>
											Effectué
										</button>
									</div>
								</div>
								<div class='divider'>----</div>
							</>
						</>
					)}
				</For>
			</div>
		</>
	);
};

export default AddInternalPrescriptionStatusForm;
