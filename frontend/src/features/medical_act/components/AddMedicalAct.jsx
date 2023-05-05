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
import IndividualMedicalAct from './IndividualMedicalAct';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';

const AddMedicalAct = () => {
	const [loading, setLoading] = createSignal(false);

	const valueChangeHandler = (id, field, value) => {
		// different fieldtypes: medication, posology, duration, quantity
		setMedicalActData((prevData) => {
			return { ...prevData, [id]: { ...prevData[id], [field]: value } };
		});
	};

	const [medicalActData, setMedicalActData] = createSignal({
		0: {
			medical_act_name: '',
		},
	});

	createEffect(() => console.log(medicalActData()));

	const [medicalActList, setMedicalActDataList] = createSignal([
		<>
			<div class='grid grid-cols-1 gap-x-4 gap-y-1'>
				<IndividualMedicalAct
					id={0}
					onValueChange={valueChangeHandler}
					options={GLOBAL_CONSTANTS.OPTIONS.ACTES_MEDICAUX}
				/>
			</div>
		</>,
	]);

	const onAdd = () => {
		setMedicalActDataList((prevList) => [
			...prevList,
			<>
				<div class='divider'>Nouveau</div>
				<div class='grid grid-cols-1 gap-x-4 gap-y-1'>
					<IndividualMedicalAct
						id={prevList.length}
						onValueChange={valueChangeHandler}
						options={GLOBAL_CONSTANTS.OPTIONS.ACTES_MEDICAUX}
					/>
				</div>
			</>,
		]);
		setMedicalActData((prevData) => {
			return {
				...prevData,
				[medicalActList().length - 1]: {
					medical_act_name: '',
				},
			};
		});
	};

	const saveMedicalAct = async (collectedJsonValues) => {
		console.log('here');
		const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/medical-act', collectedJsonValues, {
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
			medical_act_list: Object.values(medicalActData())
				.map((ma) => {
					console.log(ma.medical_act_name.trim().length === 0);
					if (ma.medical_act_name.trim().length === 0) return;

					return ma;
				})
				.filter((ma) => ma !== undefined),
			consultation_id: rightSidebarState.extraObject.data._id,
			consulted_by: localStorage.getItem('userId') || appStore.userLoginInfo.userId,
		};

		console.log(values.medical_act_list);
		if (values.medical_act_list.length <= 0) return;

		const collectedJsonValues = JSON.stringify(values);

		toast.promise(saveMedicalAct(collectedJsonValues), {
			loading: "Enregistrement de l'act médical ...",
			success: (val) => {
				reloadAppAfterOperation();
				// consultationsRefetch();
				// constantsRefetch();
				// consultationsHistoryRefetch();
				setMedicalActDataList(
					<>
						<div class='grid grid-cols-1 gap-x-4 gap-y-1'>
							<div class='md:col-span-3'>
								<IndividualMedicalAct
									id={0}
									onValueChange={valueChangeHandler}
									options={GLOBAL_CONSTANTS.OPTIONS.ACTES_MEDICAUX}
								/>
							</div>
						</div>
					</>
				);
				setMedicalActData({
					0: {
						medical_act_name: '',
					},
				});

				closeRightSideBar();
				setLoading(false);
				return <span>Enregistrée</span>;
			},
			error: () => {
				setLoading(false);
				return <span>Erreur lors de la création. Verifier les données et réessayer</span>;
			},
		});
	};

	return (
		<>
			<div class='my-5'>
				<For each={rightSidebarState.extraObject.data.medical_acts}>
					{(medical_act, idx) => (
						<>
							<div class='divider'>{idx() + 1}</div>
							<IndividualMedicalAct
								id={idx}
								onValueChange={valueChangeHandler}
								defaultValue={{ ...medical_act }}
								disabled
								options={GLOBAL_CONSTANTS.OPTIONS.ACTES_MEDICAUX}
							/>
							<div class={`form-control w-full mt-1`}>
								<label className='label'>
									<span className='label-text'>Observation</span>
								</label>
								<textarea
									className={`textarea textarea-bordered h-24`}
									placeholder='Observation ... '
									name='observation'
									disabled
								>
									{medical_act.observation}
								</textarea>
							</div>
						</>
					)}
				</For>
				{medicalActList()}
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
			<div class='grid grid-cols-1 gap-x-4 gap-y-1 mt-2'>
				<button
					className='btn btn-primary btn-outline '
					onClick={submitForm}
				>
					Ajouter
				</button>
			</div>
		</>
	);
};

export default AddMedicalAct;
