const jwt = require('jsonwebtoken');

export const encodeMessageTypeToEmoji = (type: string) => {
  switch (type) {
    case 'GIFT_STATUS_CHANGED':
      return '🎁';
    case 'ALERT':
      return '⚠️';
    case 'NEWS':
      return '📰';
    case 'THANK_SANTA':
      return '🎅🏻';
    default:
      return 'ℹ️';
  }
};

export const translateDeliverStatus = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'Обрабатывается ⌛';
    case 'DELIVERED':
      return 'Готово к выдаче 📫';
    case 'RECEIVED':
      return 'Выдано ✨';
    default:
      return 'Обрабатывается ⌛';
  }
};

export const generateHeaders = (id: string) => {
  return {
    Authorization: `Bearer ${generateJWT(id)}`,
  };
};

export const generateJWT = (string: string) => {
  const token = jwt.sign(
    {
      id: string,
      date: new Date(),
      role: 'elf',
    },
    process.env.JWT_SECRET,
  );

  return token;
};
