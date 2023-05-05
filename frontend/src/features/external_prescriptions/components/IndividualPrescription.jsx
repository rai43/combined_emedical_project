import { Select, createAsyncOptions } from '@thisbeyond/solid-select';
import InputText from '../../../components/Input/InputTextWithOnChange';

// Import default styles. (All examples use this via a global import)
import '@thisbeyond/solid-select/style.css';
import axios from 'axios';
import { Show } from 'solid-js';

const fetchData = async (inputValue) => {
	return await new Promise(async (resolve) => {
		const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/medication`);
		console.log(response);
		resolve(response.data.medications.map((medication) => medication.commercial_name).filter((option) => option.startsWith(inputValue)));
	});
};

const IndividualPrescription = (props) => {
	const selectProps = createAsyncOptions(fetchData);
	return (
		<>
			<div class='grid grid-cols-4 gap-x-4 gap-y-1'>
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
									value={props.defaultValues?.medication || ''}
									name={'medoc' + props.id}
									placeholder='Médicament'
									class={'input input-bordered w-full ' + props.inputStyle}
									disabled={props.disabled || false}
								/>
							}
						>
							<Select
								onChange={(value) => props.onValueChange(props.id, 'medication', value)}
								class='custom'
								{...selectProps}
							/>
						</Show>
					</div>
				</div>

				<div class='col-span-1'>
					<div class={`form-control w-full mt-1`}>
						<label class='label'>
							<span class={'label-text text-base-content ' + props.labelStyle}>Durée (Jours)</span>
						</label>
						<input
							type='number'
							value={props.defaultValues?.duration || ''}
							name={'duration' + props.id}
							placeholder='Durée (Jours)'
							class={'input input-bordered w-full ' + props.inputStyle}
							disabled={props.disabled || false}
							onChange={(e) => props.onValueChange(props.id, 'duration', e.target.value)}
						/>
					</div>
				</div>

				<div class='col-span-1'>
					<div class={`inline-block w-full mt-1 ${props.containerStyle}`}>
						<label class={`label  ${props.labelStyle}`}>
							<div class='label-text'>Type</div>
						</label>

						<select
							class={'select select-bordered w-full'}
							value={props.defaultValues?.type || ''}
							name={'act_name' + props.name}
							disabled={props.disabled || false}
							onChange={(e) => props.onValueChange(props.id, 'type', e.target.value)}
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
										selected={o.value === props.defaultValues?.type}
									>
										{o.name}
									</option>
								);
							})}
						</select>
					</div>
				</div>

				<div class='col-span-3'>
					<div class={`form-control w-full mt-1`}>
						<label class='label'>
							<span class={'label-text text-base-content ' + props.labelStyle}>Posologie</span>
						</label>
						<input
							type='text'
							value={props.defaultValues?.posology || ''}
							name={'posology' + props.id}
							placeholder='Posologie'
							class={'input input-bordered w-full ' + props.inputStyle}
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
							value={props.defaultValues?.quantity || ''}
							name={'qty' + props.id}
							placeholder='Quantité'
							class={'input input-bordered w-full ' + props.inputStyle}
							disabled={props.disabled || false}
							onChange={(e) => props.onValueChange(props.id, 'quantity', e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div class='divider'></div>
		</>
	);
};

export default IndividualPrescription;
