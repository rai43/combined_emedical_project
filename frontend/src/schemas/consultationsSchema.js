import * as zod from "zod";
import { createForm } from "@felte/solid";
import { validateSchema } from "@felte/validator-zod";

export const INITIAL_CONSULTATIONS_OBJECT = {
  constant_id: "",
  comment: "",
  sickness: "",
};

export const consultationsSchema = zod.object({
  // constant_id: zod.string().nonempty(),
  comment: zod.string().nonempty(),
  sickness: zod.string().nonempty(),
});

export const createConsultationsForm = (submitForm) => {
  const { form, data, errors, reset } = createForm({
    validate: validateSchema(consultationsSchema),
    onSubmit: submitForm,
  });

  return { form, data, errors, reset };
};
