// const CreateNewUserForm = () => {
//   return (
//     <div>
//       <h2>CreateNewUserForm</h2>
//     </div>
//   );
// };

// export default CreateNewUserForm;

import { Show, createSignal, onMount } from 'solid-js';
import { closeModal, modalState } from '../../../data/modalState';

import { TiLockOpenOutline, TiLockClosedOutline } from 'solid-icons/ti';
import InputText from '../../../components/Input/InputText';
import SelectBox from '../../../components/Input/SelectBox';
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';
import moment from 'moment';
import { appStore } from '../../../data/mainStore';
import axios from 'axios';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';
import { createUserForm, INITIAL_USER_OBJECT } from '../../../schemas/UserSchema';

const CreateNewUserForm = (props) => {
	const [readOnly, setReadOnly] = createSignal(props.fromUserProile ? true : modalState?.extraObject?.config?.openInReadOnlyMode || false);

	const [isLocked, setIsLocked] = createSignal(props.fromUserProile ? true : modalState?.extraObject?.config?.openInReadOnlyMode || false);

	const [loading, setLoading] = createSignal(false);
	const [commandOrderObj, setCommandOrderObj] = createSignal(INITIAL_USER_OBJECT);

	const submitForm = async (values) => {
		setLoading(true);
		// API call
		const stringifiedValues = JSON.stringify(values);
		let response;
		try {
			response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/users', stringifiedValues, {
				headers: {
					'Content-Type': 'application/json',
				},
				authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
			});
			// refetch();
			reloadAppAfterOperation();
			closeModal();
			reset();
			// history.push("/");
		} catch (error) {
			console.log(error);
		}

		setLoading(false);
	};

	const { form, data, reset, errors } = createUserForm(submitForm);

	return (
		<>
			<form use:form>
				<div className='divider'>INFORMATIONS DE CONNECTION</div>
				<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
					<div>
						<InputText
							type='email'
							name='email'
							placeholder='Email'
							defaultValue={props.fromUserProile ? appStore.userGeneralInfo?.email : modalState.extraObject?.data ? modalState.extraObject.data.email : commandOrderObj().email}
							containerStyle='mt-1'
							inputStyle={errors('email') ? 'input-bordered input-error' : ''}
							labelTitle='Email'
							disabled={isLocked()}
						/>
					</div>
					<Show when={!readOnly()}>
						<div>
							<InputText
								type='password'
								name='password'
								placeholder='Mot de passe'
								defaultValue={
									props.fromUserProile ? appStore.userGeneralInfo?.password : modalState.extraObject?.data ? modalState.extraObject.data.password : commandOrderObj().password
								}
								containerStyle='mt-1'
								inputStyle={errors('password') ? 'input-bordered input-error' : ''}
								labelTitle='Mot de passe'
								disabled={isLocked()}
							/>
						</div>
					</Show>
					<div class={`${readOnly() && 'col-span-2'}`}>
						<SelectBox
							containerStyle='mt-1'
							selectStyle={errors('profil_type') ? 'select-error' : ''}
							labelTitle='Type de profil'
							value={
								props.fromUserProile ? appStore.userGeneralInfo?.profil_type : modalState.extraObject?.data ? modalState.extraObject.data.profil_type : commandOrderObj().profil_type
							}
							name='profil_type'
							placeholder='Type de profil'
							options={GLOBAL_CONSTANTS.OPTIONS.PROFIL_TYPE_OPTIONS}
							disabled={isLocked()}
						/>
					</div>
				</div>
				<div className='divider'>INFORMATIONS GÉNÉRALES</div>
				<div class='mb-4'>
					<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
						<div>
							<InputText
								type='text'
								name='family_name'
								placeholder='Nom'
								defaultValue={
									props.fromUserProile
										? appStore.userGeneralInfo?.family_name
										: modalState.extraObject?.data
										? modalState.extraObject.data.family_name
										: commandOrderObj().family_name
								}
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
								defaultValue={
									props.fromUserProile ? appStore.userGeneralInfo?.first_name : modalState.extraObject?.data ? modalState.extraObject.data.first_name : commandOrderObj().first_name
								}
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
								defaultValue={
									props.fromUserProile ? appStore.userGeneralInfo?.id_number : modalState.extraObject?.data ? modalState.extraObject.data.id_number : commandOrderObj().id_number
								}
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
								defaultValue={
									props.fromUserProile ? appStore.userGeneralInfo?.job_title : modalState.extraObject?.data ? modalState.extraObject.data.job_title : commandOrderObj().job_title
								}
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
								defaultValue={
									props.fromUserProile ? appStore.userGeneralInfo?.direction : modalState.extraObject?.data ? modalState.extraObject.data.direction : commandOrderObj().direction
								}
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
								defaultValue={props.fromUserProile ? appStore.userGeneralInfo?.profil : modalState.extraObject?.data ? modalState.extraObject.data.profil : commandOrderObj().profil}
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
								defaultValue={props.fromUserProile ? appStore.userGeneralInfo?.index : modalState.extraObject?.data ? modalState.extraObject.data.index : commandOrderObj().index}
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
								defaultValue={props.fromUserProile ? appStore.userGeneralInfo?.remark : modalState.extraObject?.data ? modalState.extraObject.data.remark : commandOrderObj().remark}
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
								value={
									props.fromUserProile
										? appStore.userGeneralInfo?.contract_type
										: modalState.extraObject?.data
										? modalState.extraObject.data.contract_type
										: commandOrderObj().contract_type
								}
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
								value={
									props.fromUserProile
										? appStore.userGeneralInfo?.blood_group
										: modalState.extraObject?.data
										? modalState.extraObject.data.blood_group
										: commandOrderObj().blood_group
								}
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
								value={props.fromUserProile ? appStore.userGeneralInfo?.gender : modalState.extraObject?.data ? modalState.extraObject.data.gender : commandOrderObj().gender}
								name='gender'
								placeholder='Genre'
								options={GLOBAL_CONSTANTS.OPTIONS.GENDER_OPTIONS}
								disabled={isLocked()}
							/>
						</div>
						<div>
							<InputText
								defaultValue={
									props.fromUserProile
										? moment(appStore.userGeneralInfo?.dob).format('YYYY-MM-DD')
										: modalState.extraObject?.data
										? moment(modalState.extraObject.data.dob).format('YYYY-MM-DD')
										: moment(commandOrderObj().dob).format('YYYY-MM-DD')
								}
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
								defaultValue={
									props.fromUserProile
										? moment(appStore.userGeneralInfo?.doc).format('YYYY-MM-DD')
										: modalState.extraObject?.data
										? moment(modalState.extraObject.data.doc).format('YYYY-MM-DD')
										: moment(commandOrderObj().doc).format('YYYY-MM-DD')
								}
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
								defaultValue={
									props.fromUserProile
										? moment(appStore.userGeneralInfo?.doe).format('YYYY-MM-DD')
										: modalState.extraObject?.data
										? moment(modalState.extraObject.data.doe).format('YYYY-MM-DD')
										: moment(commandOrderObj().doe).format('YYYY-MM-DD')
								}
								type='date'
								name='doe'
								placeholder="Date d'expiration"
								containerStyle='mt-1'
								inputStyle={errors('doe') ? 'input-bordered input-error' : ''}
								labelTitle="Date d'expiration"
								disabled={isLocked()}
							/>
						</div>
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

export default CreateNewUserForm;
