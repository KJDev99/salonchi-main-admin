import { Controller } from "react-hook-form";
import { PasswordInput } from "./style";
import PropTypes from "prop-types";
import { Error, FormGroupProvider, Label } from "@/styles/global";

export const InputPassword = ({ control, name, ...props }) => (
  <Controller
    name={name}
    control={control}
    rules={{
      pattern: /^[a-zA-Z0-9_.,-@'`"?! ]*$/,
    }}
    render={({ field, formState: { errors } }) => (
      <FormGroupProvider>
        <Label>{props.label}</Label>
        <PasswordInput
          {...props}
          {...field}
          onChange={(e) => {
            field.onChange(e);
          }}
          value={field.value ?? ""}
          status={errors[name] ? "error" : ""}
        />
        <Error>{errors[name]?.message}</Error>
      </FormGroupProvider>
    )}
  />
);

InputPassword.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
