import { For, Show, createEffect, createSignal, onMount } from 'solid-js';
import toast from 'solid-toast';
import axios from 'axios';
import { createExamsForm } from '../../../schemas/examsSchema';
import Exam from './Exam';
import { BsPlusLg } from 'solid-icons/bs';
import { closeRightSideBar, rightSidebarState } from '../../../data/rightSidebarState';
import { appStore } from '../../../data/mainStore';
import { refetch as consultationsRefetch } from '../../consultations/components/ManageConsultations';
import { refetch as constantsRefetch } from '../../constants/components/ManageConstants';
import { refetch as consultationsHistoryRefetch } from '../../consultationsHistory/components/ManageConsultationsHistory';
import InputText from '../../../components/Input/InputText';
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';
import SelectBoxWithFunc from '../../../components/Input/SelectBoxWithFunc';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';

const AddExamsForm = () => {
	const valueChangeHandler = (id, value, type) => {
		setExamData((prevData) => {
			return { ...prevData, [id]: { ...prevData[id], [type]: value } };
		});
	};

	const [loading, setLoading] = createSignal(false);
	const [examList, setExamList] = createSignal([
		<>
			<div class='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1'>
				<div class='md:col-span-3'>
					<Exam
						id={0}
						onValueChange={valueChangeHandler}
					/>
				</div>
				<div class='md:col-span-1'>
					<SelectBoxWithFunc
						id={0}
						containerStyle='mt-1'
						labelTitle="Type d'examen"
						placeholder="Type d'examen"
						options={GLOBAL_CONSTANTS.OPTIONS.EXAM_TYPE_OPTIONS}
						onChange={valueChangeHandler}
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
							name='diagnostic'
							// id={exam._id}
							onChange={(e) => valueChangeHandler(0, e.target.value, 'diagnostic')}
						></textarea>
					</div>
				</div>
			</div>
		</>,
	]);
	const [examData, setExamData] = createSignal({
		0: {
			value: '',
			type: '',
			diagnostic: '',
		},
	});

	const saveExams = async (collectedJsonValues) => {
		console.log('here');
		const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/exams', collectedJsonValues, {
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
			exams_list: Object.values(examData())
				.map((obj) => {
					if (obj.value.trim().length > 0 && ['INTERNAL', 'EXTERNAL'].includes(obj.type.trim()) && obj.diagnostic.trim().length > 0)
						return {
							examName: obj.value,
							examType: obj.type,
							diagnostic: obj.diagnostic,
						};
				})
				.filter((obj) => obj !== undefined),
			constant_id: rightSidebarState.extraObject.data.constant._id,
			consultation_id: rightSidebarState.extraObject.data._id,
			consulted_by: localStorage.getItem('userId') || appStore.userLoginInfo.userId,
		};

		if (values.exams_list.length <= 0) return;

		const collectedJsonValues = JSON.stringify(values);

		toast.promise(saveExams(collectedJsonValues), {
			loading: 'Enregistrement des examens ...',
			success: (val) => {
				// consultationsRefetch();
				// constantsRefetch();
				// consultationsHistoryRefetch();
				reloadAppAfterOperation();

				setExamList(
					<>
						<div class='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1'>
							<div class='md:col-span-3'>
								<Exam
									id={0}
									onValueChange={valueChangeHandler}
								/>
							</div>
							<div class='md:col-span-1'>
								<SelectBoxWithFunc
									id={0}
									containerStyle='mt-1'
									labelTitle="Type d'examen"
									placeholder="Type d'examen"
									options={GLOBAL_CONSTANTS.OPTIONS.EXAM_TYPE_OPTIONS}
									onChange={valueChangeHandler}
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
										name='diagnostic'
										// id={exam._id}
										onChange={(e) => valueChangeHandler(0, e.target.value, 'diagnostic')}
									></textarea>
								</div>
							</div>
						</div>
					</>
				);
				setExamData({
					0: {
						value: '',
						type: '',
						diagnostic: '',
					},
				});

				closeRightSideBar();
				setLoading(false);
				return <span>Consultation enregistrée</span>;
			},
			error: () => {
				setLoading(false);
				return <span>Erreur lors de la création. Verifier les données et réessayer</span>;
			},
		});
	};

	const onAddExam = () => {
		setExamList((prevList) => [
			...prevList,
			<>
				<div class='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1'>
					<div class='md:col-span-3'>
						<Exam
							id={prevList.length}
							onValueChange={valueChangeHandler}
						/>
					</div>
					<div class='md:col-span-1'>
						<SelectBoxWithFunc
							id={prevList.length}
							containerStyle='mt-1'
							labelTitle="Type d'examen"
							placeholder="Type d'examen"
							options={GLOBAL_CONSTANTS.OPTIONS.EXAM_TYPE_OPTIONS}
							onChange={valueChangeHandler}
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
								name='diagnostic'
								// id={exam._id}
								onChange={(e) => valueChangeHandler(prevList.length, e.target.value, 'diagnostic')}
							></textarea>
						</div>
					</div>
				</div>
			</>,
		]);
		setExamData((prevData) => {
			return {
				...prevData,
				[examList().length - 1]: {
					value: '',
					type: '',
					diagnostic: '',
				},
			};
		});
	};

	return (
		<>
			<div class='my-5'>
				<For each={rightSidebarState.extraObject.data.exams}>
					{(exam) => (
						<>
							<div class='divider'>{exam.examName}</div>
							<div class='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1'>
								<div class='md:col-span-3'>
									<InputText
										type='text'
										defaultValue={exam.examName}
										name={exam.examName}
										containerStyle='mt-1'
										labelTitle="Nom de l'examen"
										id={exam.examName}
										disabled
									/>
								</div>
								<div class='md:col-span-1'>
									<SelectBoxWithFunc
										id={prevList.length}
										containerStyle='mt-1'
										labelTitle="Type d'examen"
										placeholder="Type d'examen"
										value={exam.examType}
										options={GLOBAL_CONSTANTS.OPTIONS.EXAM_TYPE_OPTIONS}
										onChange={valueChangeHandler}
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
											disabled
										>
											{exam.diagnostic}
										</textarea>
									</div>
								</div>
								<Show when={exam.examType === 'INTERNAL' && exam.internalResult}>
									<div class='md:col-span-4'>
										<div class={`form-control w-full mt-1`}>
											<label className='label'>
												<span className='label-text'>Résultats des examens internes</span>
											</label>
											<textarea
												className={`textarea textarea-bordered h-24`}
												placeholder='Résultats des examens internes'
												disabled
											>
												{exam.internalResult}
											</textarea>
										</div>
									</div>
								</Show>
								<Show when={exam.examType === 'EXTERNAL' && exam.externalResultPDF}>
									<div class='md:col-span-4'>
										<div class={`form-control w-full mt-1`}>
											<label className='label'>
												<span className='label-text'>Résultats des examens externes</span>
											</label>
											<embed
												type='application/pdf'
												// width="800"
												// height="400"

												src={`${import.meta.env.VITE_APP_ASSETS_URL}/${exam.externalResultPDF}`}
												style={{ 'max-width': '100%', 'min-height': '30rem' }}
											></embed>
										</div>
									</div>
								</Show>
							</div>
						</>
					)}
				</For>
				{examList()}
			</div>
			<div class='flex flex-row-reverse'>
				<div>
					<button className='btn btn-sm btn-square btn-outline'>
						<BsPlusLg
							onClick={onAddExam}
							class='h-6 w-6'
						/>
					</button>
				</div>
			</div>
			<div class='divider'></div>
			<button
				className='btn btn-primary btn-square btn-outline w-1/2 mx-auto'
				onClick={submitForm}
			>
				Ajouter
			</button>
		</>
	);
};

export default AddExamsForm;
