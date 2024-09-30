import { STATUS } from '@/constants/status';

export const getStatus = (status) => {
  switch (status) {
    case STATUS.NEW:
      return {
        color: '#fff',
        backgroundColor: '#69b1ff',
        label: 'Yangi',
      };
    case STATUS.WAITING:
      return {
        color: '#fff',
        backgroundColor: 'gold',
        label: 'Kutilayotgan',
      };
    case STATUS.ACCEPTED:
      return {
        color: '#fff',
        backgroundColor: '#52c41a',
        label: 'Qabul qilindi',
      };
    case STATUS.ON_THE_WAY:
      return {
        color: '#fff',
        backgroundColor: 'gold',
        label: "Yo'lda",
      };
    case STATUS.DELIVERED:
      return {
        color: '#fff',
        backgroundColor: '#52c41a',
        label: 'Yetkazib berildi',
      };
    case STATUS.CANCELLED:
      return {
        color: '#fff',
        backgroundColor: '#ff4d4f',
        label: 'Bekor qilindi',
      };
    case STATUS.RE_CALL:
      return {
        color: '#fff',
        backgroundColor: '#ff4d4f',
        label: 'Qayta aloqa',
      };
    default:
      return {
        color: '#fff',
        backgroundColor: '#ff4d4f',
        label: 'Kuryerdan qaytgan',
      };
  }
};

export const tagStatus = (status) => {
  switch (status) {
    case STATUS.NEW:
      return 'blue';
    case STATUS.WAITING:
      return 'orange';
    case STATUS.ACCEPTED:
      return 'cyan';
    case STATUS.ON_THE_WAY:
      return 'orange';
    case STATUS.DELIVERED:
      return 'cyan';
    case STATUS.CANCELLED:
      return 'error';
    case STATUS.RE_CALL:
      return 'lime';
    default:
      return 'rgba(0, 0, 0, 0.5)';
  }
};
