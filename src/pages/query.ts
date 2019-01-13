import { BillFields } from './add';
import { InnerStateComponent, use, init, effect } from '@/component';
import { h } from '@/vdom/create-element';
import { InputProps, input } from '@/components/input';
import { getRecord } from '@/request';
import { store } from '@/store';

export interface QueryState {
  year: string;
  month: string;
  day: string;
  data: Array<BillFields & { id: number }>;
}
const query: InnerStateComponent = (state: QueryState) => {
  return h('main', {}, [
    h('label', {}, [h('span', {}, '年'), use(input, {
      value: state.year,
      bind(e) {
        const target = e.target as HTMLInputElement;
        state.year = target.value;
      },
    } as InputProps)]),
    h('label', {}, [h('span', {}, '月'), use(input, {
      value: state.month,
      bind(e) {
        const target = e.target as HTMLInputElement;
        state.month = target.value;
        console.log(state);
      },
    } as InputProps)]),
    h('label', {}, [h('span', {}, '日'), use(input, {
      value: state.day,
      bind(e) {
        const target = e.target as HTMLInputElement;
        state.day = target.value;
      },
    } as InputProps)]),
    h('button', {
      attrs: {
        class: 'btn-submit',
      },
      on: {
        click(e: Event) {
          getRecord({
            year: state.year,
            month: state.month,
            day: state.day,
          }).then((data) => {
            store.data = data.data;
          });
        },
      },
    }, '查询'),
    h('div', { attrs: { class: 'table-wrapper' } }, [
      h('table', {}, [
        h('thead', {}, [
          h('th', {}, '编号'),
          h('th', {}, '时间'),
          h('th', {}, '数额'),
          h('th', {}, '备注'),
        ]),
        h('tbody', {}, store.data.map((record) => h('tr', {}, [
          h('td', {}, record.id.toString()),
          h('td', {}, `${record.year}-${record.month}-${record.day}`),
          h('td', {}, record.amount),
          h('td', {}, record.description),
        ]))),
      ]),
    ]),
  ]);
};
export const queryPage = init({
  year: new Date().getFullYear().toString(),
  month: '',
  day: '',
  data: [],
} as QueryState, query);
