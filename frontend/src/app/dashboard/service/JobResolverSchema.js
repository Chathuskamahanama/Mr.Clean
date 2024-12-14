import * as yup from "yup";

const JobResolverSchema = yup.object().shape({
  description: yup.string().required("You must enter a description"),
  address: yup.string().required("You must enter a address"),
});

export default JobResolverSchema;
