export const pick = (obj: any, keys: string[] = []) => {
  return keys.reduce((result, key) => {
    if (key in obj) Object.assign(result, { [key]: obj[key] });
    return result;
  }, {});
};
