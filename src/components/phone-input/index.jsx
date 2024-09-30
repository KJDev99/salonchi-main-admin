/* eslint-disable no-nonoctal-decimal-escape */
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { Wrapper } from "./style";
import { Error } from "@/styles/global";
import PropTypes from "prop-types";

export const PhoneInput = ({
  control,
  name,
  placeholder,
  label,
  disabled = false,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { name, onChange, onBlur, value },
        formState: { errors },
      }) => (
        <Wrapper>
          <label htmlFor={name}>{label}</label>
          <InputMask
            onChange={onChange}
            onBlur={onBlur}
            value={value ?? ""}
            name={name}
            placeholder={placeholder}
            className={errors[name] ? "error" : ""}
            mask="+\9\98 99 999 99 99"
            disabled={disabled}
          />
          {errors[name] && <Error>{errors[name]?.message}</Error>}
        </Wrapper>
      )}
    />
  );
};

PhoneInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
