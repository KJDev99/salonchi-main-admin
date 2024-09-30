import { Error, FormGroupProvider } from "@/styles/global";
import { Checkbox } from "antd";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

export const CheckboxCustom = ({ control, name, label, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <FormGroupProvider>
          <Checkbox
          label={label}
            {...props}
            {...field}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
          >{label}</Checkbox>
          <Error>{errors[name]?.message}</Error>
        </FormGroupProvider>
      )}
    />
  );
};

CheckboxCustom.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
