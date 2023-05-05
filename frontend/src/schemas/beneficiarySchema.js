import * as zod from "zod";
import { createForm } from "@felte/solid";
import { validateSchema } from "@felte/validator-zod";

export const INITIAL_BENEFICIARY_OBJECT = {
  family_name: "",
  first_name: "",
  dob: "",
  agent_typegender: "",
  id_number: "",
  job_title: "",
  direction: "",
  contract_type: "",
  blood_group: "",
  profil: "",
  remark: "",
  index: "",
  doc: "", // date of creation
  doe: "", // date of expiration, expiry date
  picture: "",
  agent_type: "",
  beneficiary_of: "",
  qr_code: "",
};

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const beneficiarySchema = zod.object({
  family_name: zod.string().nonempty(),
  first_name: zod.string().nonempty(),
  dob: zod.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, zod.date()),
  gender: zod.string().nonempty(),
  id_number: zod.string().nonempty(),
  // job_title: zod.string().nonempty(),
  // direction: zod.string().nonempty(),
  // contract_type: zod.string().nonempty(),
  blood_group: zod.string().nonempty(),
  // profil: zod.string().nonempty(),
  // index: zod.string().nonempty(),
  doc: zod.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, zod.date()),
  doe: zod.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, zod.date()),
  picture: zod
    .any()
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `La taille maximale de l'image est de 5 Mo.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Seuls les formats .jpg, .jpeg, .png et .webp sont pris en charge."
    ),
  agent_type: zod.string().nonempty(),
  // beneficiary_of
  // qr_code
});

export const createBeneficiaryForm = (submitForm) => {
  const { form, data, errors, reset, isValid } = createForm({
    validate: validateSchema(beneficiarySchema),
    onSubmit: submitForm,
  });

  return { form, data, errors, reset, isValid };
};
