import { InputAdornment, TextField } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { SvgIconComponent } from "@mui/icons-material";

interface CustomIconTextFieldProps {
  reigsterName: string;
  label: string;
  required?: boolean;
  startAdornmentProp?: ReactElement<SvgIconComponent>;
  endAdornmentProp?: ReactElement<SvgIconComponent>;
}

export const CustomIconTextField: React.FC<CustomIconTextFieldProps> = ({
  reigsterName,
  required = false,
  label,
  startAdornmentProp = undefined,
  endAdornmentProp = undefined,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
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
      InputProps={{
        startAdornment: startAdornmentProp && (
          <InputAdornment position="start">{startAdornmentProp}</InputAdornment>
        ),
        endAdornment: endAdornmentProp && (
          <InputAdornment position="end">{endAdornmentProp}</InputAdornment>
        ),
      }}
    />
  );
};

export default CustomIconTextField;
