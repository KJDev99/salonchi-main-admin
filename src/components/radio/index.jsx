import { Error, FormGroupProvider } from "@/styles/global";
import { Radio } from "antd";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

export const RadioCustom = ({ control, name, options, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <FormGroupProvider>
          <Radio.Group
            {...props}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
            value={field.value}
          >
            {options?.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
          <Error>{errors[name]?.message}</Error>
        </FormGroupProvider>
      )}
    />
  );
};

RadioCustom.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
};
