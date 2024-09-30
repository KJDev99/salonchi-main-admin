import { CustomTextArea } from '@/components/textarea';
import { Modal } from 'antd';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

export const CancelFromCourier = ({
  isnotDeliveryOpen,
  handleDeliveryOk,
  handleDeliveryCancel,
}) => {
  const form = useFormContext();

  return (
    <>
      {isnotDeliveryOpen && (
        <Modal
          title="Kuryerdan qaytarish"
          open={isnotDeliveryOpen}
          onOk={handleDeliveryOk}
          onCancel={handleDeliveryCancel}
          cancelText="Bekor qilish"
          okText="Rad etish"
        >
          <CustomTextArea
            name="comment"
            placeholder="Izoh qoldiring..."
            control={form.control}
          />
        </Modal>
      )}
    </>
  );
};

CancelFromCourier.propTypes = {
  isnotDeliveryOpen: PropTypes.bool.isRequired,
  handleDeliveryOk: PropTypes.func,
  handleDeliveryCancel: PropTypes.func,
};
