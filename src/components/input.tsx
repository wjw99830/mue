import { h } from '@/vdom/create-element';

export interface InputProps {
  value: string;
  bind(e: Event): any;
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
  h('input', inputData);
  return (
    <input value={props.value || ''} onInput={props.bind} type='text' />
  );
};
