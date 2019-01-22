export const isUndef = (v) => typeof v === 'undefined';
export const isDef = (v) => typeof v !== 'undefined';
export const isString = (v) => typeof v === 'string';
export const hasOwn = (obj, key) => obj.hasOwnProperty(key);
export const has = (obj, key) => isDef(obj[key]);
export const noop = () => void (0);
export const safeString = (str) => str.replace('<', '&lt;').replace('>', '&gt;');
export const isPrivateField = (fieldName) => {
    return fieldName.toString().match(/^\$/g) !== null;
};
export const isFunction = (v) => typeof v === 'function';
export const isArray = (v) => Array.isArray(v);
export const isResetState = (reset) => reset.$type === 'reset';
export const isOuterState = (comp) => comp.$type === 'outerstate';
export const warn = console.warn;
export const log = console.log;
export const lastItem = (arr) => arr[arr.length - 1];
export const deleteItem = (arr, item) => arr.splice(arr.indexOf(item), 1);
export const easyCopy = (source) => {
    let result;
    if (typeof source !== 'object'
        || source === null
        || !Object.prototype.toString.call(source).includes('Object')) {
        result = source;
    }
    else {
        const stack = [{
                data: source,
                key: undefined,
                parent: undefined,
            }];
        let ectype;
        while (stack.length > 0) {
            const target = stack.pop();
            const { data, key: dataKey, parent } = target;
            ectype = isArray(data) ? [] : {};
            Object.keys(data).forEach((key) => {
                if (typeof data[key] !== 'object'
                    || data[key] === null
                    || !Object.prototype.toString.call(data[key]).includes('Object')) {
                    ectype[key] = data[key];
                }
                else {
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
//# sourceMappingURL=index.js.map