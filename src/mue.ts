import { ComponentConstructor } from './instance/base';
import { observe } from './observe/observer';

export function Mue(app: ComponentConstructor) {
  const ins = new app();
  return observe(ins);
}
