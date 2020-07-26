import React from "react";
import { Field, ErrorMessage } from "formik";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

interface InputFormFieldProps {
  name: string;
  label: string;
  icon: React.ReactElement;
  autoComplete?: string;
  type?: string;
}

export const InputFormField: React.FC<InputFormFieldProps> = ({
  name,
  label,
  icon,
  autoComplete = "off",
  type = "text",
}) => {
  return (
    <Field
      name={name}
      as={TextField}
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      autoComplete={autoComplete}
      type={type}
      helperText={<ErrorMessage name={name} />}
      id="input-with-icon-textfield"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );
};
