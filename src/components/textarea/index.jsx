import { Error, FormGroupProvider, Label } from '@/styles/global';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Textarea } from './style';

export const CustomTextArea = ({ control, name, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        pattern: /^[a-zA-Z0-9_.,-@'`"?! ]*$/,
      }}
      render={({ field, formState: { errors } }) => (
        <FormGroupProvider>
          <Label htmlFor={name}>{props.label}</Label>
          <Textarea
            {...props}
            {...field}
            className={errors[name] ? 'area-error' : ''}
            status={errors[name] ? 'error' : ''}
            rows={5}
          />
          <Error>{errors[name]?.message}</Error>
        </FormGroupProvider>
      )}
    />
  );
};

CustomTextArea.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};
