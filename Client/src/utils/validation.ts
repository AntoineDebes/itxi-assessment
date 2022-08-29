const validation = {
  email: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid Email address",
  },
  phone: {
    value: /^\d{3,}-\d{3,}-\d{4,}$/,
    message: "Invalid Phone number",
  },
  apt: {
    value: /^[0-9]*$/,
    message: "Invalid Apt number",
  },
  search: {
    value: /^.{1,}/,
    message: "Minimum of 1 characters",
  },
  minLength: {
    value: /\w{2,}/,
    message: "Minimum of 2 characters",
  },
};
export default validation;
