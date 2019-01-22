import { createElement, createTextNode, setClass, removeClass } from '../utils/domapi';
import { isUndef, isDef, isString } from '../utils';
import { ownNames, keys, entries } from '../utils/iterators';
export class VNode {
    constructor(tag, data = {}, children = [], text) {
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
        this.el = undefined;
        this.key = undefined;
    }
    bindElement(el) {
        this.el = el;
    }
    createHTMLElement() {
        let node;
        if (isUndef(this.tag) && isDef(this.text)) {
            node = createTextNode(this.text);
        }
        else {
            node = createElement(this.tag);
            if (isDef(this.data)) {
                this.setAttributes(node);
                this.setProperties(node);
                this.appendChildren(node);
                this.setClass(node);
                this.setStyle(node);
                this.registerEventListeners(node);
            }
        }
        this.el = node;
        return node;
    }
    setAttributes(el) {
        const data = this.data;
        if (isDef(data.attrs)) {
            const attrs = data.attrs;
            for (const attrName of ownNames(attrs)) {
                el.setAttribute(attrName, attrs[attrName].toString());
            }
        }
    }
    setProperties(el) {
        const data = this.data;
        if (isDef(data.props)) {
            const props = data.props;
            for (const propName of keys(props)) {
                el[propName] = props[propName];
            }
        }
    }
    setClass(el) {
        const data = this.data;
        if (isDef(data.class)) {
            const classes = data.class;
            for (const [className, available] of entries(classes)) {
                available ? setClass(el, className) : removeClass(el, className);
            }
        }
    }
    setStyle(el) {
        const data = this.data;
        if (isDef(data.style)) {
            const style = data.style;
            for (const styleName of keys(style)) {
                el.style[styleName] = style[styleName];
            }
        }
    }
    registerEventListeners(el) {
        const data = this.data;
        if (isDef(data.on)) {
            const on = data.on;
            for (const eventName of keys(on)) {
                el.addEventListener(eventName, on[eventName]);
            }
        }
    }
    // private removeEventListeners(el: HTMLElement) {
    //   const data = this.data as VNodeData<Props>;
    //   if (isDef(data.on)) {
    //     const on = data.on as On;
    //     for (const eventName of keys(on)) {
    //       el.removeEventListener(eventName, on[eventName]);
    //     }
    //   }
    // }
    appendChildren(el) {
        if (isDef(this.children)) {
            const children = this.children;
            for (let i = 0, l = children.length; i < l; i++) {
                if (!children[i]) {
                    continue;
                }
                else if (isString(children[i])) {
                    const text = children[i];
                    const textNode = createTextNode(text);
                    el.appendChild(textNode);
                }
                else {
                    const vnode = children[i];
                    const element = vnode.createHTMLElement();
                    el.appendChild(element);
                }
            }
        }
    }
}
//# sourceMappingURL=vnode.js.map