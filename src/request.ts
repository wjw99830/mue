import axios from 'axios'
import { BillFields } from './pages/add';
axios.defaults.baseURL = 'http://localhost:9090';
export const addRecord = (params: BillFields) => axios.post('/record', params).then((res) => res.data);
