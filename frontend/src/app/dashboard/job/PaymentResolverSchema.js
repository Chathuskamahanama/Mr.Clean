import * as yup from "yup";

const PaymentResolverSchema = yup.object().shape({
  remark: yup.string().required("You must enter a remark"),
  rate: yup.number().required("You must enter a rate").min(0).max(5),
});

export default PaymentResolverSchema;
