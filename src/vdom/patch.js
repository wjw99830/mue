import { has, isDef, isUndef } from '../utils';
import { diff } from './diff';
import * as dom from '../utils/domapi';
export const equalVNode = (n1, n2) => n1.tag === n2.tag;
export const patch = (oldVNode, newVNode) => {
    if (isUndef(oldVNode)) {
        return;
    }
    if (has(oldVNode, 'nodeType')) {
        const node = oldVNode;
        const parent = dom.parentNode(node);
        const newEl = newVNode.createHTMLElement();
        dom.replaceChild(parent, newEl, node);
        newVNode.el = newEl;
    }
    else {
        const old = oldVNode;
        if (equalVNode(old, newVNode)) {
            newVNode.el = diff(old, newVNode);
        }
        else {
            const oldEl = old.el;
            if (!oldEl) {
                return;
            }
            const parent = dom.parentNode(oldEl);
            if (parent !== null) {
                if (isDef(newVNode)) {
                    const el = newVNode.createHTMLElement();
                    dom.insertBefore(parent, el, dom.nextSibling(oldEl));
                    newVNode.el = el;
                }
                dom.removeChild(parent, oldEl);
            }
        }
    }
};
//# sourceMappingURL=patch.js.map