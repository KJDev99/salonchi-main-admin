import { CustomTextArea } from '@/components/textarea';
import { Modal } from 'antd';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

export const CancelModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const form = useFormContext();
  return (
    <>
      {isModalOpen && (
        <Modal
          title="Buyurtmani rad etish"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
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

CancelModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
};
