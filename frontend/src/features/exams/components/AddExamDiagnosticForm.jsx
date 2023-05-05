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
import { produce } from 'solid-js/store';
import { refetch as manageExamsRefetch } from './ManageExams';
import { refetch as consultationRefetch } from '../../consultations/components/ManageConsultations';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';

const AddExamDiagnosticForm = (props) => {
	const [externalImage, setExternalImage] = createSignal({});

	const onInputHandler = (id, value) => {
		setExternalImage((prevData) => {
			return {
				...prevData,
				[id]: value,
			};
		});
	};

	const saveExamResult = async (formData, id) => {
		console.log('here', formData);
		const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/exams/results/${id}`, formData, {
			authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
		});
		console.log(response);
		return response;
	};

	const onSave = (exam_id, exam_type, event) => {
		const doc = document.getElementById(exam_id);
		let value = doc.value;

		const formData = new FormData();
		formData.append('internal_result', value);

		if (exam_type === 'EXTERNAL') {
			console.log('in if', exam_id);
			console.log(externalImage()[exam_id]);
			// value = externalImage()[exam_id];
			formData.append('external_result', externalImage()[exam_id]);
		}
		if (!value) return;
		doc.setAttribute('disabled', 'true');
		event.target.classList.add('loading');
		// console.log("exam_id: ", exam_id);
		// console.log("value: ", value);

		// console.log("here");
		// console.log(formData);

		// const collectedJsonValues = JSON.stringify({ result: value });

		toast.promise(saveExamResult(formData, exam_id), {
			loading: "Enregistrement de resultats d'examen ...",
			success: (val) => {
				// manageExamsRefetch();
				// consultationRefetch();
				reloadAppAfterOperation();
				event.target.remove();
				return <span>Résultats enregistré</span>;
			},
			error: (err) => {
				console.log(err);
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
							defaultValue={modalState.extraObject?.data?.constant_info?.imc ? modalState.extraObject.data.constant_info?.imc : 'N.A'}
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
				<For each={modalState.extraObject.data.examsList}>
					{(exam) => (
						<>
							<div className='divider'>
								{exam.examName.toLocaleUpperCase()} -<span class={`font-semibold ${exam.examType.trim() === 'INTERNAL' ? 'text-success' : 'text-error'}`}>{exam.examType}</span>
							</div>
							<div class='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1'>
								<div class='md:col-span-3'>
									<InputText
										type='text'
										placeholder="Nom de l'examen"
										defaultValue={modalState.extraObject?.data && exam.examName.toLocaleUpperCase() + ' (' + moment(exam.created_at).format('DD-MM-YYYY HH:mm:ss') + ')'}
										containerStyle='mt-1'
										labelTitle="Nom de l'examen"
										disabled={true}
									/>
								</div>
								<div class='md:col-span-1'>
									<SelectBox
										containerStyle='mt-1'
										labelTitle="Type d'examen"
										placeholder="Type d'examen"
										value={exam.examType}
										options={GLOBAL_CONSTANTS.OPTIONS.EXAM_TYPE_OPTIONS}
										disabled
									/>
								</div>
								<div class='md:col-span-4'>
									<div class={`form-control w-full mt-1`}>
										<label className='label'>
											<span className='label-text'>Diagnostiques cliniques</span>
										</label>
										<textarea
											className={`textarea textarea-bordered h-24`}
											placeholder='Diagnostiques cliniques'
											name='comment'
											// id={exam._id}
											value={exam.diagnostic}
											disabled
										></textarea>
									</div>
								</div>
								<Show when={exam.examType === 'INTERNAL'}>
									<div class='md:col-span-4'>
										<div class={`form-control w-full mt-1`}>
											<label className='label'>
												<span className='label-text'>Résultats examen interne</span>
											</label>
											<textarea
												className={`textarea textarea-bordered h-24`}
												placeholder='Résultats examen interne'
												name='internal_result'
												id={exam._id}
											></textarea>
										</div>
									</div>
								</Show>
								<Show when={exam.examType === 'EXTERNAL'}>
									<div class='md:col-span-4'>
										<FileUpload
											id={exam._id}
											name='picture'
											defaultValue={modalState.extraObject?.data && modalState.extraObject.data.picture}
											onInput={onInputHandler}
											errorText='Choisir une image'
										/>
									</div>
								</Show>
								<div class='md:col-span-4 mt-4 mx-auto'>
									<button
										class='btn btn-outline btn-primary'
										onClick={(e) => {
											// console.log(e.target.value);
											onSave(exam._id, exam.examType, e);
										}}
									>
										Sauvegarder
									</button>
								</div>
							</div>
						</>
					)}
				</For>
			</div>
		</>
	);
};

export default AddExamDiagnosticForm;
