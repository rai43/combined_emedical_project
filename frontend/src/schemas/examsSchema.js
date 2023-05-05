import * as zod from "zod";
import { createForm } from "@felte/solid";
import { validateSchema } from "@felte/validator-zod";

export const INITIAL_EXAM_OBJECT = {
  examName: "",
};

export const examSchema = zod.object({
  examName: zod.string().nonempty(),
});

export const createExamsForm = (submitForm) => {
  const { form, data, errors, reset } = createForm({
    validate: validateSchema(examSchema),
    onSubmit: submitForm,
  });

  return { form, data, errors, reset };
};
