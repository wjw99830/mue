import { observe } from './observe/observer';
import { BillFields } from './pages/add';
const storeInit = {
  data: [],
} as {
  data: Array<BillFields & { id: number }>;
};
export const store = observe(storeInit);
