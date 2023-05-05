import { Show, createEffect, createSignal } from 'solid-js';
import { FaRegularCircleUser } from 'solid-icons/fa';

const ImageUpload = (props) => {
	const [file, setFile] = createSignal();
	const [previewUrl, setPreviewUrl] = createSignal(props.defaultValue ? `${import.meta.env.VITE_APP_ASSETS_URL}/${props.defaultValue}` : '');
	const [isValid, setIsValid] = createSignal(false);

	let filePickerRef;

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
		// console.log(event.target);
		let pickedFile;
		let fileIsValid = isValid();
		console.log(event.target.files[0]);
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
		// props.onInput(props.id, pickedFile, fileIsValid);
	};

	const pickImageHandler = () => {
		console.log(filePickerRef);
		filePickerRef.click();
	};

	return (
		<>
			<div class='form-control mt-3'>
				<input
					id={props.id}
					ref={filePickerRef}
					style={{ display: 'none' }}
					type='file'
					accept='.jpg,.png,.jpeg'
					onChange={pickedHandler}
					name={props.name}
				/>
				<div class={`flex justify-center items-center flex-col image-upload ${props.center && 'center'}`}>
					<div class='w-52 h-52 flex justify-center items-center text-center mb-4 border-b-2 border-primary rounded-md'>
						<Show
							when={previewUrl()}
							fallback={<FaRegularCircleUser class='h-12 w-12' />}
						>
							<img
								class='w-full h-full object-cover'
								style={{ 'max-width': '13rem', 'max-height': '13rem' }}
								src={previewUrl()}
								alt='Preview'
							/>
						</Show>
					</div>
					<Show when={!props.disabled}>
						<button
							type='button'
							onClick={pickImageHandler}
							class='btn btn-outline btn-primary'
						>
							CHOISIR UNE IMAGE
						</button>
					</Show>
				</div>
				{/* {!isValid() && <p>{props.errorText}</p>} */}
			</div>
		</>
	);
};

export default ImageUpload;
