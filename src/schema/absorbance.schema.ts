import { object, number, string, TypeOf, array } from "zod";

const payload = {
  body: object({
    temperature: string({
      required_error: "temperature is required",
    }),
    dayOfStudy: string({
      required_error: "Description is required",
    }),
    absorbances: array(
      string({
        required_error: "Absorbance is required",
      })
    ),
  }),
};

const maxIntensityPayload = {
  body: object({
    _id: object({
      temperature: string({
        required_error: "temperature is required",
      }),
      concentration: string({
        required_error: "concentration is required",
      }),
      dayOfStudy: string({
        required_error: "Absorbance is required",
      }),
    }),
    maxIntensity: number({
      required_error: "se requieren",
    }),
  }),
};

const params = {
  params: object({
    userId: string({
      required_error: "userId is required",
    }),
  }),
};

export const createAbsorbanceSchema = object({
  ...payload,
});

export const updateAbsorbanceSchema = object({
  ...payload,
  ...params,
});

export const updateMaxIntensitiesSchema = object({
  ...maxIntensityPayload,
});

export type CreateAbsorbanceInput = TypeOf<typeof createAbsorbanceSchema>;
export type UpdateAbsorbanceInput = TypeOf<typeof updateAbsorbanceSchema>;
export type UpdateMaxIntensitiesInput = TypeOf<
  typeof updateMaxIntensitiesSchema
>;
