import { query } from '../utils/domapi';
import { patch } from './patch';
import { warn } from '../utils';
import { App } from '../component';

export const mount = (sel: string, app: App) => {
  if (sel.match(/^#/g)) {
    const el = query(sel);
    if (el === null) {
      warn(`Provided Selector ${sel} is not exsisted in DOM.`);
    } else {
      patch(el, app());
    }
  } else {
    warn('Please provide a selector with id.');
  }
};
