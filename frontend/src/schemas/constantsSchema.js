import * as zod from "zod";
import { createForm } from "@felte/solid";
import { validateSchema } from "@felte/validator-zod";

export const INITIAL_CONSTANTS_OBJECT = {
  card_number: "",
  temperature: "",
  height: "",
  weight: "",
  pulse: "",
  blood_pressure: "",
  other: "",
};

export const constantsSchema = zod.object({
  card_number: zod.string().nonempty(),
  temperature: zod.number().positive(),
  height: zod.number().positive(),
  weight: zod.number().positive(),
  pulse: zod.number().positive(),
  blood_pressure: zod.number().positive(),
  other: zod.string().nonempty(),
});

export const createConstantsForm = (submitForm) => {
  const { form, data, errors, reset } = createForm({
    validate: validateSchema(constantsSchema),
    onSubmit: submitForm,
  });

  return { form, data, errors, reset };
};
