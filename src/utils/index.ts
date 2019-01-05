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
export const isUndef = (v: any): boolean => typeof v === 'undefined';
export const isDef = (v: any): boolean => typeof v !== 'undefined';
export const isString = (v: any): boolean => typeof v === 'string';
export const hasOwn = (obj: object, key: string) => obj.hasOwnProperty(key);
export const has = (obj: Record<string, any>, key: string) => isDef(obj[key]);
export const noop = () => void(0);
