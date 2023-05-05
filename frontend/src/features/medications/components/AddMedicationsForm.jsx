import { Show, createEffect, createSignal, onMount } from 'solid-js';
import QRCode from 'qrcode';
import { INITIAL_MEDICATION_OBJECT, createMedicationForm } from '../../../schemas/medicationsSchema';
import { closeModal, modalState } from '../../../data/modalState';

import { TiLockOpenOutline, TiLockClosedOutline } from 'solid-icons/ti';
import InputText from '../../../components/Input/InputText';
import SelectBox from '../../../components/Input/SelectBox';
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';
import moment from 'moment';
import ImageUpload from '../../../components/Input/ImageUpload';
import { appStore } from '../../../data/mainStore';
import axios from 'axios';
import { refetch as medicationRefetch } from './ManageMedications';
import toast from 'solid-toast';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';

function AddMedicationsForm() {
	const [readOnly, setReadOnly] = createSignal(modalState?.extraObject?.config?.openInReadOnlyMode || false);

	const [isLocked, setIsLocked] = createSignal(modalState?.extraObject?.config?.openInReadOnlyMode || false);

	const [loading, setLoading] = createSignal(false);
	const [medicationObj, setMedicationObj] = createSignal(INITIAL_MEDICATION_OBJECT);

	const saveMedication = async (collectedJsonValues) => {
		const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/medication', collectedJsonValues, {
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

		toast.promise(saveMedication(collectedJsonValues), {
			loading: 'Enregistrement du nouveau médicament ...',
			success: (val) => {
				reloadAppAfterOperation();
				closeModal();
				reset();
				return <span>Medicament enregistré</span>;
			},
			error: () => {
				return <span>Erreur lors de la création. Verifier l'existence du bénéficiaire et réessayer</span>;
			},
		});
	};

	const { form, data, reset, errors } = createMedicationForm(submitForm);

	createEffect(() => console.log(errors()));

	return (
		<>
			<form use:form>
				<div class='mb-4'>
					<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
						<div class='col-span-2'>
							<InputText
								type='text'
								name='commercial_name'
								placeholder='Nom commercial'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.commercial_name : medicationObj().commercial_name}
								containerStyle='mt-1'
								inputStyle={errors('commercial_name') ? 'input-bordered input-error' : ''}
								labelTitle='Nom commercial'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='number'
								name='price'
								placeholder='Prix'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.price : medicationObj().price}
								containerStyle='mt-1'
								inputStyle={errors('price') ? 'input-bordered input-error' : ''}
								labelTitle='Prix'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='text'
								name='dci'
								placeholder='DCI'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.dci : medicationObj().dci}
								containerStyle='mt-1'
								inputStyle={errors('dci') ? 'input-bordered input-error' : ''}
								labelTitle='DCI'
								disabled={isLocked()}
							/>
						</div>{' '}
						<div>
							<InputText
								type='text'
								name='therapeutic_class'
								placeholder='Classe thérapeutique'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.therapeutic_class : medicationObj().therapeutic_class}
								containerStyle='mt-1'
								inputStyle={errors('therapeutic_class') ? 'input-bordered input-error' : ''}
								labelTitle='Classe thérapeutique'
								disabled={isLocked()}
							/>
						</div>{' '}
						<div>
							<InputText
								type='text'
								name='presentation'
								placeholder='Présentation'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.presentation : medicationObj().presentation}
								containerStyle='mt-1'
								inputStyle={errors('presentation') ? 'input-bordered input-error' : ''}
								labelTitle='Présentation'
								disabled={isLocked()}
							/>
						</div>
						<div class='col-span-3 mt-2'>
							<Show
								when={!readOnly()}
								fallback={<span class='md:col-span-7'></span>}
							>
								<button class={'btn mt-2 btn-primary md:col-span-7 w-full' + (loading() ? ' loading' : '')}>Modifier</button>
							</Show>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}

export default AddMedicationsForm;
