export const getColor = (data: number | string) => (+data > 0 ? 'green' : 'red');
export const toFix = (data = '') => (+data).toFixed(2);

export const formatNum = (data = '') => {
  if (data.includes('%')) {
    let textNum = data.split('%')[0];
    return toFix(textNum) + '%';
  }
  return toFix(data);
};
