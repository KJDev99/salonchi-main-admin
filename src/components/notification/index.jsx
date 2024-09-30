import { notification } from 'antd';

export const Notification = ({ type, message, description }) => {
  const [api] = notification.useNotification();

  return api[type]({
    message: message,
    description: description,
  });
};
