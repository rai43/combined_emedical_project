import { For, Show, createEffect, onMount } from 'solid-js';
import QRCode from 'qrcode';
import { appStore } from '../../../data/mainStore';
import { rightSidebarState } from '../../../data/rightSidebarState';
import moment from 'moment';
import InputText from '../../../components/Input/InputText';

const BeneficiairiesInfo = () => {
	let qrCodeCanvasRef;
	onMount(() => console.log(rightSidebarState.extraObject?.data?.beneficiaries));

	// createEffect(() => {
	//   let qrCodeData = {
	//     family_name:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner
	//         ?.family_name,
	//     first_name:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner?.first_name,
	//     id_number:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner?.id_number,
	//     blood_group:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner
	//         ?.blood_group,
	//     gender:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner?.gender,
	//     dob: moment(
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner.dob
	//     ).format("DD/MM/YYYY"),
	//     doc: moment(
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner.doc
	//     ).format("DD/MM/YYYY"),
	//     doe: moment(
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner.doe
	//     ).format("DD/MM/YYYY"),
	//     health_card_id:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner
	//         .health_card_id,
	//   };
	//   qrCodeData = JSON.stringify(qrCodeData);
	//   QRCode.toCanvas(
	//     qrCodeCanvasRef,
	//     // QR code doesn't work with an empty string
	//     // so I'm using a blank space as a fallback
	//     qrCodeData || " ",
	//     (error) => error && console.error(error)
	//   );
	// });) => {
	//   let qrCodeData = {
	//     family_name:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner
	//         ?.family_name,
	//     first_name:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner?.first_name,
	//     id_number:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner?.id_number,
	//     blood_group:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner
	//         ?.blood_group,
	//     gender:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner?.gender,
	//     dob: moment(
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner.dob
	//     ).format("DD/MM/YYYY"),
	//     doc: moment(
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner.doc
	//     ).format("DD/MM/YYYY"),
	//     doe: moment(
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner.doe
	//     ).format("DD/MM/YYYY"),
	//     health_card_id:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner
	//         .health_card_id,
	//   };
	//   qrCodeData = JSON.stringify(qrCodeData);
	//   QRCode.toCanvas(
	//     qrCodeCanvasRef,
	//     // QR code doesn't work with an empty string
	//     // so I'm using a blank space as a fallback
	//     qrCodeData || " ",
	//     (error) => error && console.error(error)
	//   );
	// });) => {
	//   let qrCodeData = {
	//     family_name:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner
	//         ?.family_name,
	//     first_name:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner?.first_name,
	//     id_number:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner?.id_number,
	//     blood_group:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner
	//         ?.blood_group,
	//     gender:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner?.gender,
	//     dob: moment(
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner.dob
	//     ).format("DD/MM/YYYY"),
	//     doc: moment(
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner.doc
	//     ).format("DD/MM/YYYY"),
	//     doe: moment(
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner.doe
	//     ).format("DD/MM/YYYY"),
	//     health_card_id:
	//       rightSidebarState.extraObject?.data?.beneficiaries?.partner
	//         .health_card_id,
	//   };
	//   qrCodeData = JSON.stringify(qrCodeData);
	//   QRCode.toCanvas(
	//     qrCodeCanvasRef,
	//     // QR code doesn't work with an empty string
	//     // so I'm using a blank space as a fallback
	//     qrCodeData || " ",
	//     (error) => error && console.error(error)
	//   );
	// });

	return (
		<Show
			when={!!rightSidebarState.extraObject?.data?.beneficiaries?.partner || !!rightSidebarState.extraObject?.data?.beneficiaries?.children?.length > 0}
			fallback={<h3 class='mx-auto mt-5 font-semibold'>Cet agent n'a pas de bénéficiaire</h3>}
		>
			<Show when={rightSidebarState.extraObject?.data?.beneficiaries?.partner}>
				<div class='grid grid-cols-1 gap-y-1 justify-items-center'>
					{/* rightSidebarState.extraObject */}
					<h2 class='text-2xl font-semibold my-2 col-span-3'>Partenaire</h2>
				</div>
				<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
					<div>
						<InputText
							type='text'
							name='family_name'
							placeholder='Nom'
							defaultValue={rightSidebarState.extraObject?.data?.beneficiaries?.partner?.family_name}
							containerStyle='mt-1'
							labelTitle='Nom'
							disabled={true}
						/>
					</div>
					<div class='col-span-2'>
						<InputText
							type='text'
							name='first_name'
							placeholder='Prénom(s)'
							defaultValue={rightSidebarState.extraObject?.data?.beneficiaries?.partner.first_name}
							containerStyle='mt-1'
							labelTitle='Prénom(s)'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							name='id_number'
							placeholder='Matricule'
							defaultValue={rightSidebarState.extraObject?.data?.beneficiaries?.partner.id_number}
							containerStyle='mt-1'
							labelTitle='Matricule'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							name='blood_group'
							placeholder='Groupe sanguin'
							defaultValue={rightSidebarState.extraObject?.data?.beneficiaries?.partner.blood_group}
							containerStyle='mt-1'
							labelTitle='Groupe sanguin'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							name='gender'
							placeholder='Genre'
							defaultValue={rightSidebarState.extraObject?.data?.beneficiaries?.partner.gender}
							containerStyle='mt-1'
							labelTitle='Genre'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							name='dob'
							placeholder='Date de naissance'
							defaultValue={moment(rightSidebarState.extraObject?.data?.beneficiaries?.partner.dob).format('DD/MM/YYYY')}
							containerStyle='mt-1'
							labelTitle='Date de naissance'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							name='dob'
							placeholder='N. Carte Santé'
							defaultValue={rightSidebarState.extraObject?.data?.beneficiaries?.partner.health_card_id}
							containerStyle='mt-1'
							labelTitle='N. Carte Santé'
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							name='doc'
							placeholder="Date d'incorporation"
							defaultValue={moment(rightSidebarState.extraObject?.data?.beneficiaries?.partner.doc).format('DD/MM/YYYY')}
							containerStyle='mt-1'
							labelTitle="Date d'incorporation"
							disabled={true}
						/>
					</div>
					<div>
						<InputText
							type='text'
							name='doe'
							placeholder="Date d'expiration"
							defaultValue={moment(rightSidebarState.extraObject?.data?.beneficiaries?.partner.doe).format('DD/MM/YYYY')}
							containerStyle='mt-1'
							labelTitle="Date d'expiration"
							disabled={true}
						/>
					</div>

					<div class='col-start-3 col-span-2 mt-2'>
						<img
							class='w-full h-full object-cover'
							src={`${import.meta.env.VITE_APP_ASSETS_URL}/${rightSidebarState.extraObject?.data?.beneficiaries?.partner.picture}`}
							alt='Preview'
							style={{ 'max-width': '120px', 'max-height': '120px' }}
						/>
					</div>
					{/* <div>
            <canvas
              style={{ "max-width": "120px", "max-height": "120px" }}
              class="mt-2"
              ref={qrCodeCanvasRef}
            />
          </div> */}
				</div>
			</Show>
			<div class='divider mt-5'></div>
			<Show when={rightSidebarState.extraObject?.data?.beneficiaries?.children?.length > 0}>
				<div class='grid grid-cols-3 gap-y-1 justify-items-center'>
					{/* rightSidebarState.extraObject */}
					<h2 class='text-2xl font-semibold my-2 col-span-3'>
						Enfant
						{rightSidebarState.extraObject?.data?.beneficiaries?.children?.length > 0 && 's'}
					</h2>
				</div>
				<For each={rightSidebarState.extraObject?.data?.beneficiaries?.children}>
					{(child) => (
						<>
							<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
								<div>
									<InputText
										type='text'
										name='family_name'
										placeholder='Nom'
										defaultValue={child.family_name}
										containerStyle='mt-1'
										labelTitle='Nom'
										disabled={true}
									/>
								</div>
								<div class='col-span-2'>
									<InputText
										type='text'
										name='first_name'
										placeholder='Prénom(s)'
										defaultValue={child.first_name}
										containerStyle='mt-1'
										labelTitle='Prénom(s)'
										disabled={true}
									/>
								</div>
								<div>
									<InputText
										type='text'
										name='id_number'
										placeholder='Matricule'
										defaultValue={child.id_number}
										containerStyle='mt-1'
										labelTitle='Matricule'
										disabled={true}
									/>
								</div>
								<div>
									<InputText
										type='text'
										name='blood_group'
										placeholder='Groupe sanguin'
										defaultValue={child.blood_group}
										containerStyle='mt-1'
										labelTitle='Groupe sanguin'
										disabled={true}
									/>
								</div>
								<div>
									<InputText
										type='text'
										name='gender'
										placeholder='Genre'
										defaultValue={child.gender}
										containerStyle='mt-1'
										labelTitle='Genre'
										disabled={true}
									/>
								</div>
								<div>
									<InputText
										type='text'
										name='dob'
										placeholder='Date de naissance'
										defaultValue={moment(child.dob).format('DD/MM/YYYY')}
										containerStyle='mt-1'
										labelTitle='Date de naissance'
										disabled={true}
									/>
								</div>
								<div>
									<InputText
										type='text'
										name='dob'
										placeholder='N. Carte Santé'
										defaultValue={child.health_card_id}
										containerStyle='mt-1'
										labelTitle='N. Carte Santé'
										disabled={true}
									/>
								</div>
								<div>
									<InputText
										type='text'
										name='doc'
										placeholder="Date d'incorporation"
										defaultValue={moment(child.doc).format('DD/MM/YYYY')}
										containerStyle='mt-1'
										labelTitle="Date d'incorporation"
										disabled={true}
									/>
								</div>
								<div>
									<InputText
										type='text'
										name='doe'
										placeholder="Date d'expiration"
										defaultValue={moment(child.doe).format('DD/MM/YYYY')}
										containerStyle='mt-1'
										labelTitle="Date d'expiration"
										disabled={true}
									/>
								</div>
								<div class='col-start-3 col-span-2 mt-2'>
									<img
										class='w-full h-full object-cover'
										src={`${import.meta.env.VITE_APP_ASSETS_URL}/${child.picture}`}
										alt='Preview'
										style={{ 'max-width': '120px', 'max-height': '120px' }}
									/>
								</div>{' '}
								{/**/}
								{/* <div>
            <canvas
              style={{ "max-width": "120px", "max-height": "120px" }}
              class="mt-2"
              ref={qrCodeCanvasRef}
            />
          </div> */}
							</div>
							<div class='divider'></div>
						</>
					)}
				</For>
			</Show>
		</Show>
	);
};

export default BeneficiairiesInfo;
