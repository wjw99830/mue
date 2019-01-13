import axios from 'axios';
import { BillFields } from './pages/add';
axios.defaults.baseURL = 'http://localhost:9090';
export const addRecord = (params: BillFields) => axios.post('/record', params).then((res) => res.data as ResponseData);
export const getRecord = (params: any) => {
  let url = '/record';
  for (const [key, val] of Object.entries(params)) {
    if (!val) {
      continue;
    }
    url += url.includes('?') ? `&${key}=${val}` : `?${key}=${val}`;
  }
  return axios.get(url).then((res) => res.data as ResponseData);
};
export interface ResponseData {
  code: string;
  data: Array<BillFields & { id: number }>;
}
