export const createElement = (tag: string): HTMLElement => document.createElement(tag);
export const createTextNode = (text: string): Text => document.createTextNode(text);
export const query = (sel: string) => document.querySelector(sel);
