import { isString, isArray } from '../utils';
import { VNode } from './vnode';
export const h = (tag, data = {}, children = []) => {
    let vnodeChildren;
    if (isArray(children)) {
        vnodeChildren = children.map((child) => {
            return isString(child)
                ? new VNode(undefined, undefined, undefined, child)
                : child;
        }).filter((child) => child);
    }
    else {
        vnodeChildren = [new VNode(undefined, undefined, undefined, children)];
    }
    return new VNode(tag, data, vnodeChildren);
};
//# sourceMappingURL=create-element.js.map