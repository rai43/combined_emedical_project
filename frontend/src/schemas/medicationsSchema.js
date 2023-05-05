import * as zod from "zod";
import { createForm } from "@felte/solid";
import { validateSchema } from "@felte/validator-zod";

export const INITIAL_MEDICATION_OBJECT = {
  commercial_name: "",
  price: "",
  dci: "",
  therapeutic_class: "",
  presentation: "",
};

export const medicationSchema = zod.object({
  commercial_name: zod.string().nonempty(),
  price: zod.number().positive(),
  dci: zod.string().nonempty(),
  therapeutic_class: zod.string().nonempty(),
  presentation: zod.string().nonempty(),
});

export const createMedicationForm = (submitForm) => {
  const { form, data, errors, reset } = createForm({
    validate: validateSchema(medicationSchema),
    onSubmit: submitForm,
  });

  return { form, data, errors, reset };
};
