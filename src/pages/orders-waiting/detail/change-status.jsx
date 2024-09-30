import { Space, Button as AntdButton } from 'antd';
import { StatusWrapper } from './style';
import PropTypes from 'prop-types';
import { STATUS } from '@/constants/status';

export const ChangeStatus = ({ status, setOpen, acceptOrder }) => {
  return (
    <StatusWrapper>
      {status === STATUS.NEW ? (
        <Space className="btn-group">
          <AntdButton type="primary" danger onClick={() => setOpen(true)}>
            Rad etish
          </AntdButton>
          <AntdButton
            type="primary"
            ghost
            className="btn-success"
            onClick={acceptOrder}
          >
            Qabul qilish
          </AntdButton>
        </Space>
      ) : null}
    </StatusWrapper>
  );
};

ChangeStatus.propTypes = {
  status: PropTypes.string,
  setOpen: PropTypes.any,
  acceptOrder: PropTypes.func.isRequired,
};
