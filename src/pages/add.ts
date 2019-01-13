import { h } from '@/vdom/create-element';
import { input, InputProps } from '@/components/input';
import { use, InnerStateComponent, init, effect } from '@/component';
import { addRecord } from '@/request';
import { mount } from '@/vdom/mount';
export interface BillFields {
  year: string;
  month: string;
  day: string;
  amount: string;
  description: string;
}
const add: InnerStateComponent = (state: BillFields) => {
  return h('main', { attrs: { class: 'add-page' } }, [
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
      },
    } as InputProps)]),
    h('label', {}, [h('span', {}, '日'), use(input, {
      value: state.day,
      bind(e) {
        const target = e.target as HTMLInputElement;
        state.day = target.value;
      },
    } as InputProps)]),
    h('label', {}, [h('span', {}, '数额'), use(input, {
      value: state.amount,
      bind(e) {
        const target = e.target as HTMLInputElement;
        state.amount = target.value;
      },
    } as InputProps)]),
    h('label', {}, [h('span', {}, '描述'), use(input, {
      value: state.description,
      bind(e) {
        const target = e.target as HTMLInputElement;
        state.description = target.value;
      },
    } as InputProps)]),
    h('button', { attrs: { class: 'btn-submit' }, on: { click: () => {
      addRecord(state).then((data) => console.log(data));
    } } }, '提交'),
  ]);
};
effect(add, {
  handler(state) {
    console.log(state);
  },
});
const date = new Date();
export const addPage = init({
  year: date.getFullYear().toString(),
  month: (date.getMonth() + 1).toString(),
  day: date.getDate().toString(),
  amount: '0',
  description: '',
} as BillFields, add);
