export const numberFormatMoney = (str: string) => {
  if (str === '') str = '0';
  const value = (parseInt(str.replace(/[^\d]+/gi, ''), 10) / 100).toFixed(2);

  const getCurrencyFormat = () => {
    if (!value) {
      return '';
    }

    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
      .format(Number(value))
      .replace('R$ ', '');
  };

  return getCurrencyFormat();
};

export const moneyMask = (value: string) => {
  return numberFormatMoney(value.replace(/[^\d]+/gi, ''));
};
