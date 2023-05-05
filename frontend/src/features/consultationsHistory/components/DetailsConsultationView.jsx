import moment from 'moment';
import InputText from '../../../components/Input/InputText';
import { modalState } from '../../../data/modalState';

const DetailsConsultationView = () => {
	return (
		<>
			<div class='mb-4'>
				<div className='divider'>CONSTANTES</div>
				<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
					<div>
						<InputText
							type='text'
							placeholder='Numéro de la Carte'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.constant.card_number}
							containerStyle='mt-1'
							labelTitle='Numéro de la Carte'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							placeholder='Témperature'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.constant.temperature}
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
					<div class='md:col-span-3 h-full'>
						<InputText
							type='text'
							placeholder='Autres remarques'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data.constant.other : constantsObj().other}
							containerStyle='mt-1'
							labelTitle='Autres remarquesddd'
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
				</div>
				<div className='divider'>CONSULTATION</div>
				<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
					<div>
						<InputText
							type='text'
							name='constant_id'
							placeholder='Numéro de la Carte'
							defaultValue={modalState.extraObject?.data ? modalState.extraObject.data._id : constantsObj().constant_id}
							containerStyle='mt-1'
							labelTitle='Identifiant constante'
							disabled={true}
						/>
					</div>
					<div class='md:col-span-2'>
						<InputText
							type='text'
							name='sickness'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.sickness}
							placeholder='Pathologie'
							containerStyle='mt-1'
							labelTitle='Pathologie'
							disabled={true}
						/>
					</div>
					<div class='md:col-span-3'>
						<div class={`form-control w-full mt-1`}>
							<label className='label'>
								<span className='label-text'>Commentaire</span>
							</label>
							<div class='w-full bg-gray-50 rounded-sm p-4'>{modalState.extraObject?.data && modalState.extraObject.data.comments}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DetailsConsultationView;
