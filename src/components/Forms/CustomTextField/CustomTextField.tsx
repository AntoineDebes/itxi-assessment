import { TextField } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface CustomTextFieldProps {
  reigsterName: string;
  label: string;
  required?: boolean;
  type?: React.InputHTMLAttributes<unknown>["type"];
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  reigsterName,
  required = false,
  label,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<any>();
  const helperTextMessage = "This field is required";

  return (
    <TextField
      label={label}
      helperText={errors[reigsterName]?.message as ReactNode}
      {...register(reigsterName, {
        required: {
          value: required,
          message: helperTextMessage,
        },
      })}
      type={type}
    />
  );
};

export default CustomTextField;
