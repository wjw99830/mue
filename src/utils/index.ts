export const isPlainObject = (target: any) => {
  let flag: boolean = false;
  const str = Object.prototype.toString.call(target);
  if (str.includes('Object') || str.includes('Array')) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
};
