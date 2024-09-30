import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Error, FormGroupProvider, Label } from '@/styles/global';
import { CustomCalendar } from './style';

export const Calendar = ({ name, control, label, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <FormGroupProvider>
          <Label htmlFor={name}>{label}</Label>
          <CustomCalendar
            {...field}
            {...props}
            status={errors[name] ? 'error' : ''}
          />
          <Error>{errors[name]?.message}</Error>
        </FormGroupProvider>
      )}
    />
  );
};

Calendar.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};
