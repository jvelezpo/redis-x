import { JsonTreeNodeType } from '../../common/json-tree';

export interface IKeyValueData<T = any> {
  readonly path: string[];
  readonly value: T;
  readonly type: JsonTreeNodeType;
  readonly hostType: JsonTreeNodeType.Object | JsonTreeNodeType.Array;
}
