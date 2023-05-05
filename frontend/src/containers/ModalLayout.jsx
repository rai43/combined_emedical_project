import { Show } from 'solid-js';
import { GLOBAL_CONSTANTS } from '../utils/globalConstantUtil';
import { closeModal, modalState } from '../data/modalState';
import AddBeneficiaryForm from '../features/beneficiary/components/AddBeneficiaryForm';
import AddConstantsForm from '../features/constants/components/AddConstantsForm';
import AddConsultationForm from '../features/consultations/components/AddConsultationsForm';
import DetailsConsultationView from '../features/consultationsHistory/components/DetailsConsultationView';
import AddExamDiagnosticForm from '../features/exams/components/AddExamDiagnosticForm';
import AddMedicationsForm from '../features/medications/components/AddMedicationsForm';
import AddMedicalActObservation from '../features/medical_act/components/AddMedicalActObservation';
import CreateNewUserForm from '../features/user/components/CreateNewUserForm';
import AddInternalPrescriptionStatusForm from '../features/internal_prescriptions/components/AddInternalPrescriptionStatusForm';

// import AddLeadModalBody from "../features/leads/components/AddLeadModalBody";

function ModalLayout() {
	const close = (e) => {
		closeModal(e);
	};

	return (
		<>
			{/* The button to open modal */}

			{/* Put this part before </body> tag */}
			<div class={`modal ${modalState.isOpen ? 'modal-open' : ''}`}>
				<div class={`modal-box  ${modalState.size === 'lg' ? 'max-w-5xl' : ''}`}>
					<button
						class='btn btn-sm btn-circle absolute right-2 top-2'
						onClick={() => close()}
					>
						✕
					</button>
					<h3 class='font-semibold text-2xl pb-6 text-center'>{modalState.title}</h3>
					<Show when={modalState.bodyType === GLOBAL_CONSTANTS.MODAL_BODY_TYPES.BENEFICIARY_NEW}>
						<AddBeneficiaryForm onCloseModal={close} />
					</Show>
					<Show when={modalState.bodyType === GLOBAL_CONSTANTS.MODAL_BODY_TYPES.USER_NEW}>
						<CreateNewUserForm onCloseModal={close} />
					</Show>
					<Show when={modalState.bodyType === GLOBAL_CONSTANTS.MODAL_BODY_TYPES.CONSTANTS_NEW}>
						<AddConstantsForm onCloseModal={close} />
					</Show>
					<Show when={modalState.bodyType === GLOBAL_CONSTANTS.MODAL_BODY_TYPES.CONSULTATIONS_NEW}>
						<AddConsultationForm onCloseModal={close} />
					</Show>
					<Show when={modalState.bodyType === GLOBAL_CONSTANTS.MODAL_BODY_TYPES.CONSULTATIONS_DONE_DETAILS}>
						<DetailsConsultationView onCloseModal={close} />
					</Show>
					<Show when={modalState.bodyType === GLOBAL_CONSTANTS.MODAL_BODY_TYPES.EXAMS_NEW}>
						<AddExamDiagnosticForm onCloseModal={close} />
					</Show>
					<Show when={modalState.bodyType === GLOBAL_CONSTANTS.MODAL_BODY_TYPES.INTERNAL_PRESCRIPTIONS_NEW}>
						<AddInternalPrescriptionStatusForm onCloseModal={close} />
					</Show>
					<Show when={modalState.bodyType === GLOBAL_CONSTANTS.MODAL_BODY_TYPES.MEDICATION_NEW}>
						<AddMedicationsForm onCloseModal={close} />
					</Show>
					<Show when={modalState.bodyType === GLOBAL_CONSTANTS.MODAL_BODY_TYPES.MEDICAL_ACT_NEW}>
						<AddMedicalActObservation onCloseModal={close} />
					</Show>
				</div>
			</div>
		</>
	);
}

export default ModalLayout;
