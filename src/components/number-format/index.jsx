import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';

export const NumberFormat = ({ value }) => {
  return (
    <NumericFormat
      value={value}
      allowLeadingZeros
      thousandSeparator=" "
      className="number-price"
      displayType="text"
    />
  );
};

NumberFormat.propTypes = {
  value: PropTypes.number,
};
