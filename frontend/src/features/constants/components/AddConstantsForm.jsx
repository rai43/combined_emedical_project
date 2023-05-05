import { Show, createEffect, createSignal } from 'solid-js';
import moment from 'moment';
import axios from 'axios';
import toast from 'solid-toast';

import { TiLockOpenOutline, TiLockClosedOutline } from 'solid-icons/ti';

import { INITIAL_CONSTANTS_OBJECT, createConstantsForm } from '../../../schemas/constantsSchema';
import { closeModal, modalState } from '../../../data/modalState';
import InputText from '../../../components/Input/InputText';
import { appStore } from '../../../data/mainStore';
import { refetch } from './ManageConstants';
import { refetch as consultationRefetch } from '../../consultations/components/ManageConsultations';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';

const AddConstantsForm = (props) => {
	const [readOnly, setReadOnly] = createSignal(modalState?.extraObject?.config?.openInReadOnlyMode || false);
	const [isLocked, setIsLocked] = createSignal(modalState?.extraObject?.config?.openInReadOnlyMode || false);

	const [loading, setLoading] = createSignal(false);
	const [constantsObj, setConstantsObj] = createSignal(INITIAL_CONSTANTS_OBJECT);

	const saveConstant = async (collectedJsonValues) => {
		const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/constants', collectedJsonValues, {
			headers: {
				'Content-Type': 'application/json',
			},
			authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
		});
		return response;
	};

	const submitForm = async (values) => {
		console.log('On submit', errors());
		console.log(values);
		const collectedJsonValues = JSON.stringify(values);

		toast.promise(saveConstant(collectedJsonValues), {
			loading: 'Enregistrement de la nouvelle constante ...',
			success: (val) => {
				reloadAppAfterOperation();
				// refetch();
				// consultationRefetch();
				closeModal();
				reset();
				return <span>Constante enregistrée</span>;
			},
			error: () => {
				return <span>Erreur lors de la création. Verifier l'existence du bénéficiaire et réessayer</span>;
			},
		});
	};

	const { form, data, reset, errors } = createConstantsForm(submitForm);

	createEffect(() => console.log(errors()));

	return (
		<>
			<form use:form>
				<div class='mb-4'>
					<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
						<div>
							<InputText
								type='text'
								name='card_number'
								placeholder='Numéro de la Carte'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.card_number : constantsObj().card_number}
								containerStyle='mt-1'
								inputStyle={errors('card_number') ? 'input-bordered input-error' : ''}
								labelTitle='Numéro de la Carte'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='number'
								name='temperature'
								placeholder='Témperature'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.temperature : constantsObj().temperature}
								containerStyle='mt-1'
								inputStyle={errors('temperature') ? 'input-bordered input-error' : ''}
								labelTitle='Témperature'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='number'
								name='height'
								placeholder='Taille (cm)'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.height : constantsObj().height}
								containerStyle='mt-1'
								inputStyle={errors('height') ? 'input-bordered input-error' : ''}
								labelTitle='Taille (cm)'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='number'
								name='weight'
								placeholder='Poids (kg)'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.weight : constantsObj().weight}
								containerStyle='mt-1'
								inputStyle={errors('weight') ? 'input-bordered input-error' : ''}
								labelTitle='Poids (kg)'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='number'
								name='pulse'
								placeholder='Pouls (bpm)'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.pulse : constantsObj().pulse}
								containerStyle='mt-1'
								inputStyle={errors('pulse') ? 'input-bordered input-error' : ''}
								labelTitle='Pouls (bpm)'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='number'
								name='blood_pressure'
								placeholder='Tension Arterielle'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.blood_pressure : constantsObj().blood_pressure}
								containerStyle='mt-1'
								inputStyle={errors('blood_pressure') ? 'input-bordered input-error' : ''}
								labelTitle='Tension Arterielle'
								disabled={isLocked()}
							/>
						</div>
						<div class='md:col-span-3 h-full'>
							<InputText
								type='text'
								name='other'
								placeholder='Autres remarques'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.other : constantsObj().other}
								containerStyle='mt-1'
								inputStyle={errors('other') ? 'input-bordered input-error' : ''}
								labelTitle='Autres remarques'
								disabled={isLocked()}
							/>
						</div>
						<Show when={isLocked()}>
							<div class='md:col-span-1'>
								<InputText
									type='text'
									defaultValue={modalState.extraObject?.data?.imc ? modalState.extraObject.data.imc : 'N.A'}
									containerStyle='mt-1'
									labelTitle='IMC'
									disabled={isLocked()}
								/>
							</div>
							<div class='md:col-span-2'>
								<InputText
									type='text'
									defaultValue={modalState.extraObject?.data?.imc_interpretation ? modalState.extraObject.data.imc_interpretation : 'N.A'}
									containerStyle='mt-1'
									labelTitle="Signification de l'IMC"
									disabled={isLocked()}
								/>
							</div>
						</Show>
					</div>
				</div>

				<Show when={!readOnly()}>
					<button class={'btn mt-2 btn-primary md:col-span-7 w-full' + (loading() ? ' loading' : '')}>Ajouter</button>
				</Show>

				<div class='grid grid-cols-2 md:grid-cols-8 gap-x-4 gap-y-1 justify-items-center'>
					<Show
						when={readOnly() && !isLocked()}
						fallback={<span class='md:col-span-7'></span>}
					>
						<button class={'btn mt-2 btn-primary md:col-span-7 w-full' + (loading() ? ' loading' : '')}>Modifier</button>
					</Show>
					<Show when={isLocked() || readOnly()}>
						<span
							class={'btn mt-2 btn-circle btn-outline'}
							onClick={() => setIsLocked((prevValue) => !prevValue)}
						>
							{isLocked() ? (
								<span
									class='tooltip tooltip-bottom'
									data-tip='Modifier'
								>
									<TiLockClosedOutline class='h-6 w-6' />
								</span>
							) : (
								<span
									class='tooltip tooltip-bottom'
									data-tip='Voir Seulement'
								>
									<TiLockOpenOutline class='h-6 w-6' />
								</span>
							)}
						</span>
					</Show>
				</div>
			</form>
		</>
	);
};

export default AddConstantsForm;
