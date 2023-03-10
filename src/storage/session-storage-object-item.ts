import { StorageBaseObjectItem } from './storage-base-object.item';

type Obj = Record<string, unknown>;

export class SessionStorageObjectItem<T extends Obj> extends StorageBaseObjectItem<T> {
  constructor(key: string) {
    super(key, typeof window !== 'undefined' ? sessionStorage : undefined);
  }
}
