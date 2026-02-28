import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .min(9, "Password must be at least 9 characters")
    .max(50, "Password must not exceed 50 characters"),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object({
  name: yup.string().required("Full name is required").trim(),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .min(9, "Password must be at least 9 characters")
    .max(50, "Password must not exceed 50 characters"),
  phone: yup.string().optional().trim(),
  countryCode: yup.string().optional(),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
