import { createElement } from '@/utils/domapi';

export class VNode {
    private tag?: string;
    private data?: VNodeData;
    private children?: VNode[];
    private el?: Node;

    public createHTMLElement(): Node {
        return createElement('div');
    }
}
export interface VNodeData {
    attrs?: Attrs;
    props?: Props;
    class?: 
}
interface Attrs {
    [index: string]: string | number | boolean;
}
interface Props {
    [index: string]: any;
}
interface Classes {
    [index: string]: boolean;
}