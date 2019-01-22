import { entries } from '../utils/iterators';
import { has, isDef, isUndef } from '../utils';
import { patch } from './patch';
import * as dom from '../utils/domapi';
export const diffData = (old, vnode) => {
    const el = old.el;
    if (!el) {
        return;
    }
    const oldData = old.data;
    const newData = vnode.data;
    const oldAttrs = (oldData.attrs || {});
    const newAttrs = (newData.attrs || {});
    for (const [name, val] of entries(newAttrs)) {
        const valStr = val.toString();
        if (valStr !== (oldAttrs[name] ? oldAttrs[name].toString() : '')) {
            dom.setAttribute(el, name, valStr);
        }
    }
    for (const [name, val] of entries(oldAttrs)) {
        if (!has(newAttrs, name)) {
            dom.removeAttribute(el, name);
        }
    }
    const oldProps = (oldData.props || {});
    const newProps = (newData.props || {});
    for (const [name, val] of entries(newProps)) {
        if (val !== oldProps[name]) {
            dom.setProp(el, name, val);
        }
    }
    for (const [name, val] of entries(oldProps)) {
        if (!has(newProps, name)) {
            dom.removeProp(el, name);
        }
    }
    const oldClasses = (oldData.class || {});
    const newClasses = (newData.class || {});
    for (const [className, available] of entries(newClasses)) {
        if (available !== oldClasses[className]) {
            available ? dom.setClass(el, className) : dom.removeClass(el, className);
        }
    }
    for (const [className, available] of entries(oldClasses)) {
        if (!has(newClasses, className)) {
            dom.removeClass(el, className);
        }
    }
    const oldStyle = (oldData.style || {});
    const newStyle = (newData.style || {});
    for (const [name, val] of entries(newStyle)) {
        if (val !== oldStyle[name]) {
            dom.setStyle(el, name, val);
        }
    }
    for (const [name, val] of entries(oldStyle)) {
        if (!has(newStyle, name)) {
            dom.removeStyle(el, name);
        }
    }
    const oldEvents = (oldData.on || {});
    const newEvents = (newData.on || {});
    for (const [name, handler] of entries(oldEvents)) {
        dom.removeEventListener(el, name, handler);
    }
    for (const [name, handler] of entries(newEvents)) {
        dom.addEventListener(el, name, handler);
    }
};
export const diffChildren = (old, vnode) => {
    const el = old.el;
    for (const [index, child] of vnode.children.entries()) {
        if (isUndef(old.children[index])) {
            el.appendChild(vnode.children[index].createHTMLElement());
        }
        else {
            patch(old.children[index], child);
        }
    }
    for (let i = vnode.children.length; i < old.children.length; i++) {
        if (isUndef(vnode.children[i])) {
            dom.removeChild(el, old.children[i].el);
            delete old.children[i].el;
        }
    }
};
export const diffText = (old, vnode) => {
    const textNode = old.el;
    if (old.text !== vnode.text) {
        dom.setTextContent(textNode, vnode.text || '');
    }
};
export const diff = (old, vnode) => {
    if (isDef(vnode.text) && isDef(old.text)) {
        diffText(old, vnode);
    }
    else {
        diffData(old, vnode);
        diffChildren(old, vnode);
    }
    return old.el;
};
//# sourceMappingURL=diff.js.map