import * as Yup from "yup";

export type LoginFormData = Yup.InferType<typeof LoginSchema>;
export const RegistrationSchema = Yup.object().shape({
  email: Yup.string().trim().email().required("Email is required"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(10)
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    ),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirm password is required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email().required("Email is required"),
  password: Yup.string().trim().required(),
});
