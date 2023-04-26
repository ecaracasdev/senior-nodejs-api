import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmed is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwods do not match",
    path: ["passwordConfirmed"],
  }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">
