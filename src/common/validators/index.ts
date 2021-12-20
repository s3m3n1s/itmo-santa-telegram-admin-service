export const validateGiftCode = (giftCode: number) => {
  if (Number.isNaN(+giftCode)) {
    return {
      status: false,
      msg: 'Код подарка должен быть числом',
    };
  }
  if (giftCode.toString().length !== 6) {
    return {
      status: false,
      msg: 'Длина кода подарка должна составлять 4 цифры',
    };
  }

  return { status: true };
};
