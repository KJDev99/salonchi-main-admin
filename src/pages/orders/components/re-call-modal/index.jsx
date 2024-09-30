import { CustomTextArea } from '@/components/textarea';
import { Modal } from 'antd';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

export const ReCallModal = ({
  isreCallOpen,
  handleReCallOk,
  handleReCallCancel,
}) => {
  const form = useFormContext();

  return (
    <>
      {isreCallOpen && (
        <Modal
          title="Qayta aloqa"
          open={isreCallOpen}
          onOk={handleReCallOk}
          onCancel={handleReCallCancel}
          cancelText="Bekor qilish"
          okText="Qayta aloqa"
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

ReCallModal.propTypes = {
  isreCallOpen: PropTypes.bool.isRequired,
  handleReCallOk: PropTypes.func,
  handleReCallCancel: PropTypes.func,
};
