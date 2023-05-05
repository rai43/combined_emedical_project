import * as zod from "zod";
import { createForm } from "@felte/solid";
import { validateSchema } from "@felte/validator-zod";

export const INITIAL_USER_OBJECT = {
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
  email: "",
  password: "",
  profil_type: "",
};

export const userSchema = zod.object({
  family_name: zod.string().nonempty(),
  first_name: zod.string().nonempty(),
  dob: zod.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, zod.date()),
  gender: zod.string().nonempty(),
  id_number: zod.string().nonempty(),
  job_title: zod.string().nonempty(),
  direction: zod.string().nonempty(),
  contract_type: zod.string().nonempty(),
  blood_group: zod.string().nonempty(),
  profil: zod.string().nonempty(),
  index: zod.string().nonempty(),
  doc: zod.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, zod.date()),
  // doe: zod.preprocess((arg) => {
  //   if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  // }, zod.date()),
  email: zod
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: zod.string().nonempty(),
  profil_type: zod.string().nonempty(),
});

export const createUserForm = (submitForm) => {
  const { form, data, errors, reset, isValid } = createForm({
    validate: validateSchema(userSchema),
    onSubmit: submitForm,
  });

  return { form, data, errors, reset, isValid };
};
