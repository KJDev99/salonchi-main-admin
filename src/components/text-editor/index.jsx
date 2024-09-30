import React from "react";
import { Error, FormGroupProvider, Label } from "@/styles/global";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { Reactquill } from "./style";

function TextEditorController({ control, name, ...props }) {
  return (
    <Controller
      name={name}
      control={control}
      //   rules={{
      //     pattern: /^[a-zA-Z0-9_.,-@'`"?! ]*$/,
      //   }}
      render={({ field, formState: { errors } }) => (
        <FormGroupProvider>
          <Label htmlFor={name}>{props.label}</Label>
          <Reactquill
            {...props}
            {...field}
            theme="snow"
            className={errors[name] ? "area-error" : ""}
            status={errors[name] ? "error" : ""}
            rows={5}
          />
          <Error>{errors[name]?.message}</Error>
        </FormGroupProvider>
      )}
    />
  );
}

export default TextEditorController;

TextEditorController.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};
