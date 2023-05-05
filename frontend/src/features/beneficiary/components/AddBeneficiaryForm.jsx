import { Show, createEffect, createSignal, onMount } from 'solid-js';
import QRCode from 'qrcode';
import { INITIAL_BENEFICIARY_OBJECT, createBeneficiaryForm } from '../../../schemas/beneficiarySchema';
import { closeModal, modalState } from '../../../data/modalState';

import { TiLockOpenOutline, TiLockClosedOutline } from 'solid-icons/ti';
import InputText from '../../../components/Input/InputText';
import SelectBox from '../../../components/Input/SelectBox';
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';
import moment from 'moment';
import ImageUpload from '../../../components/Input/ImageUpload';
import { appStore } from '../../../data/mainStore';
import axios from 'axios';
import { refetch } from './ManageBeneficiary';
import { openRightSideBar } from '../../../data/rightSidebarState';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';

const AddBeneficiaryForm = (props) => {
	let qrCodeCanvasRef;

	const [readOnly, setReadOnly] = createSignal(modalState?.extraObject?.config?.openInReadOnlyMode || false);

	const [isLocked, setIsLocked] = createSignal(modalState?.extraObject?.config?.openInReadOnlyMode || false);

	const [loading, setLoading] = createSignal(false);
	const [commandOrderObj, setCommandOrderObj] = createSignal(INITIAL_BENEFICIARY_OBJECT);

	createEffect(() => {
		console.log(errors());
		let qrCodeData = { ...data() };
		delete qrCodeData.picture;
		qrCodeData = JSON.stringify(qrCodeData);
		QRCode.toCanvas(
			qrCodeCanvasRef,
			// QR code doesn't work with an empty string
			// so I'm using a blank space as a fallback
			qrCodeData || ' ',
			(error) => error && console.error(error)
		);
	});

	const submitForm = async (values) => {
		console.log('On submit', errors());
		console.log(values);
		console.log('Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token));

		setLoading(true);
		// API call
		let response;
		try {
			const formData = new FormData();
			formData.append('family_name', values.family_name.trim());
			formData.append('first_name', values.first_name.trim());
			formData.append('dob', new Date(values.dob.trim()));
			formData.append('doc', new Date(values.doc.trim()));
			formData.append('doe', new Date(values.doe.trim()));
			formData.append('gender', values.gender.trim());
			formData.append('id_number', values.id_number.trim());
			formData.append('job_title', values.job_title.trim());
			formData.append('direction', values.direction.trim());
			formData.append('contract_type', values.contract_type.trim());
			formData.append('blood_group', values.blood_group.trim());
			formData.append('profil', values.profil.trim());
			formData.append('remark', values.remark.trim());
			formData.append('index', values.index.trim());
			formData.append('agent_type', values.agent_type.trim());
			formData.append('picture', values.picture);
			formData.append('beneficiary_of', values?.beneficiary_of?.trim() || '');
			console.log(import.meta.env.VITE_BACKEND_URL + '/beneficiary');
			response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/beneficiary', formData, {
				authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
			});
			// refetch();
			reloadAppAfterOperation();
			closeModal();
			reset();
			// history.push("/");
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		}

		setLoading(false);
		// addOrderPlan(values);
		// closeModal();
		// reset();
		console.log(response);
	};

	const { form, data, reset, errors, isValid } = createBeneficiaryForm(submitForm);
	onMount(() => console.log(modalState));

	return (
		<>
			<form use:form>
				<div className='divider'>INFORMATIONS AGENT</div>
				<div class='mb-4'>
					<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
						<div>
							<InputText
								type='text'
								name='family_name'
								placeholder='Nom'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.family_name : commandOrderObj().family_name}
								containerStyle='mt-1'
								inputStyle={errors('family_name') ? 'input-bordered input-error' : ''}
								labelTitle='Nom'
								disabled={isLocked()}
							/>
						</div>
						<div class='md:col-span-2'>
							<InputText
								type='text'
								name='first_name'
								placeholder='Prénom(s)'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.first_name : commandOrderObj().first_name}
								containerStyle='mt-1'
								inputStyle={errors('first_name') ? 'input-bordered input-error' : ''}
								labelTitle='Prénom(s)'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='text'
								name='id_number'
								placeholder='Matricule'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.id_number : commandOrderObj().id_number}
								containerStyle='mt-1'
								inputStyle={errors('id_number') ? 'input-bordered input-error' : ''}
								labelTitle='Matricule'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='text'
								name='job_title'
								placeholder='Fonction'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.job_title : commandOrderObj().job_title}
								containerStyle='mt-1'
								inputStyle={errors('job_title') ? 'input-bordered input-error' : ''}
								labelTitle='Fonction'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='text'
								name='direction'
								placeholder='Direction'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.direction : commandOrderObj().direction}
								containerStyle='mt-1'
								inputStyle={errors('direction') ? 'input-bordered input-error' : ''}
								labelTitle='Direction'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='text'
								name='profil'
								placeholder='Profil'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.profil : commandOrderObj().profil}
								containerStyle='mt-1'
								inputStyle={errors('profil') ? 'input-bordered input-error' : ''}
								labelTitle='Profil'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='text'
								name='index'
								placeholder='Index'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.index : commandOrderObj().index}
								containerStyle='mt-1'
								inputStyle={errors('index') ? 'input-bordered input-error' : ''}
								labelTitle='Index'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								type='text'
								name='remark'
								placeholder='Remarque'
								defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.remark : commandOrderObj().remark}
								containerStyle='mt-1'
								labelTitle='Remarque'
								disabled={isLocked()}
							/>
						</div>

						<div>
							<SelectBox
								containerStyle='mt-1'
								selectStyle={errors('contract_type') ? 'select-error' : ''}
								labelTitle='Type de contrat'
								value={modalState.extraObject?.data ? modalState.extraObject.data.contract_type : commandOrderObj().contract_type}
								name='contract_type'
								placeholder='Type de contrat'
								options={GLOBAL_CONSTANTS.OPTIONS.CONTRACT_TYPE_OPTIONS}
								disabled={isLocked()}
							/>
						</div>
						<div>
							<SelectBox
								containerStyle='mt-1'
								selectStyle={errors('blood_group') ? 'select-error' : ''}
								labelTitle='Groupe sanguin'
								value={modalState.extraObject?.data ? modalState.extraObject.data.blood_group : commandOrderObj().blood_group}
								name='blood_group'
								placeholder='Groupe sanguin'
								options={GLOBAL_CONSTANTS.OPTIONS.BLOOD_GROUP_OPTIONS}
								disabled={isLocked()}
							/>
						</div>
						<div>
							<SelectBox
								containerStyle='mt-1'
								selectStyle={errors('gender') ? 'select-error' : ''}
								labelTitle='Genre'
								value={modalState.extraObject?.data ? modalState.extraObject.data.gender : commandOrderObj().gender}
								name='gender'
								placeholder='Genre'
								options={GLOBAL_CONSTANTS.OPTIONS.GENDER_OPTIONS}
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								defaultValue={modalState.extraObject?.data ? moment(modalState.extraObject.data.dob).format('YYYY-MM-DD') : moment(commandOrderObj().dob).format('YYYY-MM-DD')}
								type='date'
								name='dob'
								placeholder='Date de naissance'
								containerStyle='mt-1'
								inputStyle={errors('dob') ? 'input-bordered input-error' : ''}
								labelTitle='Date de naissance'
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								defaultValue={modalState.extraObject?.data ? moment(modalState.extraObject.data.doc).format('YYYY-MM-DD') : moment(commandOrderObj().doc).format('YYYY-MM-DD')}
								type='date'
								name='doc'
								placeholder="Date d'incorporation"
								containerStyle='mt-1'
								inputStyle={errors('doc') ? 'input-bordered input-error' : ''}
								labelTitle="Date d'incorporation"
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								defaultValue={modalState.extraObject?.data ? moment(modalState.extraObject.data.doe).format('YYYY-MM-DD') : moment(commandOrderObj().doe).format('YYYY-MM-DD')}
								type='date'
								name='doe'
								placeholder="Date d'expiration"
								containerStyle='mt-1'
								inputStyle={errors('doe') ? 'input-bordered input-error' : ''}
								labelTitle="Date d'expiration"
								disabled={isLocked()}
							/>
						</div>
						<div class={data().agent_type === 'AGENT' ? 'md:col-span-3' : ''}>
							<SelectBox
								containerStyle='mt-1'
								selectStyle={errors('agent_type') ? 'select-error' : ''}
								labelTitle="Type d'agent"
								value={modalState.extraObject?.data ? modalState.extraObject.data.agent_type : commandOrderObj().agent_type}
								name='agent_type'
								placeholder="Type d'agent"
								options={GLOBAL_CONSTANTS.OPTIONS.AGENT_TYPE_OPTIONS}
								disabled={isLocked()}
							/>
						</div>
						<Show
							when={modalState.extraObject?.data ? modalState.extraObject.data.agent_type !== 'AGENT' : data().agent_type !== 'AGENT'}
							fallback={<>{modalState.extraObject.data}</>}
						>
							<div class='md:col-span-2'>
								<InputText
									defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.beneficiary_of : commandOrderObj().beneficiary_of}
									type='text'
									name='beneficiary_of'
									placeholder="Numéro de l'agent"
									containerStyle='mt-1'
									inputStyle={errors('doe') ? 'input-bordered input-error' : ''}
									labelTitle="Numéro de l'agent"
									disabled={isLocked()}
								/>
							</div>
						</Show>
					</div>

					<div class='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 justify-items-center'>
						<ImageUpload
							id='image'
							name='picture'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.picture : commandOrderObj().picture}
							// onInput={inputHandler}
							disabled={isLocked()}
							errorText='Choisir une image'
						/>
						<canvas
							class='mt-3'
							style={{ 'max-width': '13rem', 'max-height': '13rem' }}
							ref={qrCodeCanvasRef}
						/>
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
			<Show when={Object.keys(modalState.extraObject?.data || {}).length > 0}>
				<div className='divider'>BÉNÉFICIAIRES</div>
				<div class='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1'>
					<button
						onClick={() =>
							openRightSideBar({
								header: 'BENEFICIAIRES',
								bodyType: GLOBAL_CONSTANTS.RIGHT_SIDE_DRAWER.BENEFICIARY_INFO,
								extraObject: { ...modalState.extraObject },
							})
						}
						class={'btn mt-2 btn-outline btn-neutral md:col-span-' + (loading() ? ' loading' : '')}
					>
						Liste des bénéficiaires
					</button>
					<button
						onClick={() =>
							openRightSideBar({
								header: 'MA CARTE BENEFICIAIRE',
								bodyType: GLOBAL_CONSTANTS.RIGHT_SIDE_DRAWER.BENEFICIARY_CARD,
								extraObject: { ...modalState.extraObject },
							})
						}
						class={'btn mt-2 btn-outline btn-neutral md:col-span-' + (loading() ? ' loading' : '')}
					>
						Générer la carte bénéficiaire
					</button>
				</div>
			</Show>
		</>
	);
};

export default AddBeneficiaryForm;
