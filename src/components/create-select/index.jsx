import { Error, FormGroupProvider, Label } from "@/styles/global";
import { Select as CustomSelect } from "antd";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

export const CreateSelect = ({ name, control, options, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        pattern: /^[a-zA-Z0-9_.,-@'`"?! ]*$/,
      }}
      render={({ field, formState: { errors } }) => (
        <FormGroupProvider>
          <Label>{props.label}</Label>
          <CustomSelect
            {...field}
            {...props}
            bordered
            mode="tags"
            style={{ width: "100%" }}
            status={errors[name] ? "error" : ""}
            className={errors[name] ? "select-error" : ""}
            options={options}
          />
          <Error>{errors[name]?.message}</Error>
        </FormGroupProvider>
      )}
    />
  );
};

CreateSelect.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array,
};
