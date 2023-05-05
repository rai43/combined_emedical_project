import { Show, createEffect, createSignal } from 'solid-js';
import { FaRegularCircleUser } from 'solid-icons/fa';

const FileUpload = (props) => {
	const [file, setFile] = createSignal();
	const [previewUrl, setPreviewUrl] = createSignal(props.defaultValue ? `${import.meta.env.VITE_APP_ASSETS_URL}/${props.defaultValue}` : '');
	const [isValid, setIsValid] = createSignal(false);

	createEffect(() => {
		if (!file()) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file());
	});

	const pickedHandler = (event) => {
		let pickedFile;
		let fileIsValid = isValid();
		if (event.target.files && event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}
		console.log(fileIsValid);
		console.log(pickedFile);
		props.onInput(props.id, pickedFile);
		// props.onInput(props.id, pickedFile, fileIsValid);
	};

	return (
		<>
			<div class='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1'>
				<div class={`${previewUrl() ? 'md:col-span-3' : 'md:col-span-4'} `}>
					<div class={`form-control w-full mt-1`}>
						<label class='label'>
							<span class={'label-text text-base-content ' + props.labelStyle}>Importer les resultats</span>
						</label>
						<input
							id={props.id}
							type='file'
							className='file-input w-full file-input-bordered'
							accept='.pdf'
							// accept=".jpg, .jpeg, .png, .pdf"
							onChange={pickedHandler}
							name={props.name}
						/>
					</div>
				</div>

				<Show when={previewUrl()}>
					<div class={`form-control w-full mt-1`}>
						<label class='label'>
							<span class={'label-text text-base-content ' + props.labelStyle}>Document importé</span>
						</label>
						{/* <img
              class="w-full h-full object-cover border"
              style={{ "max-width": "10rem", "max-height": "10rem" }}
              src={previewUrl()}
              alt="Preview"
            /> */}
						<embed
							src={previewUrl()}
							style={{ 'max-width': '100%', 'max-height': '100%' }}
						></embed>
					</div>
				</Show>
			</div>
		</>
	);
};

export default FileUpload;
