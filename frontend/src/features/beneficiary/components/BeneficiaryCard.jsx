import { createEffect, onMount } from 'solid-js';
import QRCode from 'qrcode';
import logoCnps from '../../../assets/logoCnps.jpeg';
import jsPDF from 'jspdf';
import { rightSidebarState } from '../../../data/rightSidebarState';

const BeneficiaryCard = () => {
	let cardPdf;
	const onDownload = () => {
		const doc = new jsPDF();
		console.log('here');

		doc.html(cardPdf, {
			callback: function (doc) {
				// Save the PDF
				doc.save('card.pdf');
			},
			x: 15,
			y: 15,
			width: 170, //target width in the PDF document
			windowWidth: 650, //window width in CSS pixels
		});
	};

	let qrCodeCanvasRef;
	onMount(() => console.log(rightSidebarState.extraObject?.data));

	createEffect(() => {
		let qrCodeData = {
			family_name: rightSidebarState.extraObject?.data?.family_name?.toLocaleUpperCase(),
			first_name: rightSidebarState.extraObject?.data?.first_name?.toLocaleUpperCase(),
			matricule: rightSidebarState.extraObject?.data?.id_number?.toLocaleUpperCase(),
			health_card_id: rightSidebarState.extraObject?.data?.health_card_id?.toLocaleUpperCase(),
			blood_group: rightSidebarState.extraObject?.data?.blood_group?.toLocaleUpperCase(),
		};
		qrCodeData = JSON.stringify(qrCodeData);
		QRCode.toCanvas(
			qrCodeCanvasRef,
			// QR code doesn't work with an empty string
			// so I'm using a blank space as a fallback
			qrCodeData || ' ',
			(error) => error && console.error(error)
		);
	});

	return (
		<>
			<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1 my-7'>
				<div
					class='col-start-2 mx-auto'
					ref={cardPdf}
				>
					<div class='w-[18rem] h-[27rem] rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
						<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1 mt-7 p-3 justify-items-center'>
							<div class='col-start-2'>
								<img
									src={logoCnps}
									alt='LinqSC Admin'
									class='w-48 inline-block'
									style={{ 'max-width': '120px', 'max-height': '120px' }}
								></img>
							</div>
						</div>
						<div class='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1 p-3 justify-self-center '>
							<div class='font-bold col-span-2'>Nom</div>
							<div class='col-span-2 font-semibold'>{rightSidebarState.extraObject?.data?.family_name?.toLocaleUpperCase()}</div>
							<div class='font-bold col-span-2'>Prénoms</div>
							<div class='col-span-2 font-semibold'>{rightSidebarState.extraObject?.data?.first_name?.toLocaleUpperCase()}</div>
							<div class='font-bold col-span-2'>Matricule</div>
							<div class='col-span-2 font-semibold'>{rightSidebarState.extraObject?.data?.id_number?.toLocaleUpperCase()}</div>
							<div class='font-bold col-span-2'>N carte de santé</div>
							<div class='col-span-2 font-semibold'>{rightSidebarState.extraObject?.data?.health_card_id?.toLocaleUpperCase()}</div>
							<div class='font-bold col-span-2'>Groupe sanguin</div>
							<div class='col-span-2 font-semibold'>{rightSidebarState.extraObject?.data?.blood_group?.toLocaleUpperCase()}</div>
						</div>
						<div class='grid grid-rows-3 grid-flow-col gap-4'>
							<div class='row-span-3'>
								<img
									class='w-full h-full object-cover'
									src={`${import.meta.env.VITE_APP_ASSETS_URL}/${rightSidebarState.extraObject?.data?.picture}`}
									alt='Preview'
									style={{ 'max-width': '120px', 'max-height': '120px' }}
								/>
							</div>
							<div class='col-span-2'>
								<canvas
									style={{ 'max-width': '80px', 'max-height': '80px' }}
									class=''
									ref={qrCodeCanvasRef}
								/>
							</div>
							<div class='row-span-2 col-span-2'>
								<span class='text-xs w-full'>Signature et cachet</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button
				class='btn btn-outline btn-primary'
				onClick={onDownload}
				type='button'
			>
				Télécharger
			</button>
		</>
	);
};

export default BeneficiaryCard;
