import { h } from '@/vdom/create-element';

export interface InputProps {
  bind(e: Event): any;
  value: string;
}
export const input = (props: InputProps) => {
  const inputData = {
    props: {
      value: props.value || '',
    },
    on: {
      input: props.bind,
    },
    attrs: {
      type: 'text',
    },
  };
  return h('input', inputData);
};
