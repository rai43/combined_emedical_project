import { Select, createAsyncOptions } from '@thisbeyond/solid-select';
import InputText from '../../../components/Input/InputTextWithOnChange';
import { TbLayoutDashboard } from 'solid-icons/tb';
import axios from 'axios';
import { Show, onMount } from 'solid-js';

import '@thisbeyond/solid-select/style.css';

const fetchData = async (inputValue) => {
	return await new Promise(async (resolve) => {
		const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/medication`);
		console.log(response);
		resolve(response.data.medications.map((medication) => medication.commercial_name).filter((option) => option.startsWith(inputValue)));
	});
};

const IndividualMedicalAct = (props) => {
	const selectProps = createAsyncOptions(fetchData);
	onMount(() => console.log('IndividualMedicalAct', props));
	return (
		<>
			<div class='grid md:grid-cols-4 gap-x-4 gap-y-1'>
				<div class='col-span-2'>
					<div class={`inline-block w-full ${props.containerStyle}`}>
						<label class={`label  ${props.labelStyle}`}>
							<div class='label-text'>Acte médical</div>
						</label>

						<select
							class={'select select-bordered w-full mt-1'}
							value={props.defaultValue?.medical_act_name || ''}
							name={'act_name' + props.name}
							disabled={props.disabled || false}
							onChange={(e) => props.onValueChange(props.id, 'medical_act_name', e.target.value)}
						>
							<option
								disabled
								selected
								value='PLACEHOLDER'
							>
								{props.placeholder}
							</option>
							{(props.options || []).map((o, _) => {
								return (
									<option
										value={o.value || o.name}
										selected={o.value === props.value}
									>
										{o.name}
									</option>
								);
							})}
						</select>
					</div>
				</div>

				<div class='col-span-2'>
					<div class={`form-control w-full mt-1`}>
						<label class='label'>
							<span class={'label-text text-base-content ' + props.labelStyle}>Médicament</span>
						</label>
						<Show
							when={!props.disabled}
							fallback={
								<input
									type='text'
									value={props.defaultValue?.medication?.join(' || ') || ''}
									name={'medoc' + props.id}
									placeholder='Médicament'
									class={'input overflow-auto input-bordered w-full ' + props.inputStyle}
									disabled={props.disabled || false}
								/>
							}
						>
							<Select
								multiple
								onChange={(value) => props.onValueChange(props.id, 'medication', value)}
								class='custom'
								{...selectProps}
							/>
						</Show>
					</div>
				</div>

				<div class='col-span-3'>
					<div class={`form-control w-full mt-1`}>
						<label class='label'>
							<span class={'label-text text-base-content ' + props.labelStyle}>Posologie</span>
						</label>
						<input
							type='text'
							value={props.defaultValue?.posology || ''}
							name={'posology' + props.id}
							placeholder='Posologie'
							class={'input overflow-auto input-bordered w-full ' + props.inputStyle}
							disabled={props.disabled || false}
							onChange={(e) => props.onValueChange(props.id, 'posology', e.target.value)}
						/>
					</div>
				</div>

				<div class='col-span-1'>
					<div class={`form-control w-full mt-1`}>
						<label class='label'>
							<span class={'label-text text-base-content ' + props.labelStyle}>Quantité</span>
						</label>
						<input
							type='number'
							value={props.defaultValue?.quantity || ''}
							name={'qty' + props.id}
							placeholder='Quantité'
							class={'input overflow-auto input-bordered w-full ' + props.inputStyle}
							disabled={props.disabled || false}
							onChange={(e) => props.onValueChange(props.id, 'quantity', e.target.value)}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default IndividualMedicalAct;
