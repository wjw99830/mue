import { StateResetor } from '../component';

export const isUndef = (v: any): v is undefined => typeof v === 'undefined';
export const isDef = (v: any): boolean => typeof v !== 'undefined';
export const isString = (v: any): v is string => typeof v === 'string';
export const hasOwn = (obj: object, key: string) => obj.hasOwnProperty(key);
export const has = (obj: Record<string, any>, key: string) => isDef(obj[key]);
export const noop = () => void(0);
export const safeString = (str: string) => str.replace('<', '&lt;').replace('>', '&gt;');
export const isPrivateField = (fieldName: string | number): boolean => {
  return fieldName.toString().match(/^\$/g) !== null;
};
export const isFunction = (v: any): boolean => typeof v === 'function';
export const isArray = (v: any): v is any[] => Array.isArray(v);
export const isStateResetor = (reset: any): reset is StateResetor => reset.$type === 'reset';
export const warn = console.warn;
export const log = console.log;
export const lastItem = <T>(arr: T[]): T => arr[arr.length - 1];
export const deleteItem = <T>(arr: T[], item: T) => arr.splice(arr.indexOf(item), 1);
export const easyCopy = (source: any): any => {
  let result;
  if (typeof source !== 'object'
  || source === null
  || !Object.prototype.toString.call(source).includes('Object')) {
    result = source;
  } else {
    const stack: Array<{ data: any, key: string | void, parent: any }> = [{
      data: source,
      key: undefined,
      parent: undefined,
    }];
    let ectype: any;
    while (stack.length > 0) {
      const target: any = stack.pop();
      const { data, key: dataKey, parent } = target;
      ectype = isArray(data) ? [] : {};
      Object.keys(data).forEach((key) => {
        if (typeof data[key] !== 'object'
        || data[key] === null
        || !Object.prototype.toString.call(data[key]).includes('Object')) {
          ectype[key] = data[key];
        } else {
          stack.push({
            data: data[key],
            key,
            parent: ectype,
          });
        }
      });
      parent ? (parent[dataKey] = ectype) : (result = ectype);
    }
  }
  return result;
};
