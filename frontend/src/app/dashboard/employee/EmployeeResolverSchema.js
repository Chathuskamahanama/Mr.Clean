import * as yup from "yup";

const EmployeeResolverSchema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
  email: yup.string().required("You must enter a email"),
  phone: yup.string(),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(3, "Password is too short - must be at least 3 chars."),
  serviceType: yup.string().required("Service type required"),
});

export default EmployeeResolverSchema;
