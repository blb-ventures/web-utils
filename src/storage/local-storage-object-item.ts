import { StorageBaseObjectItem } from './storage-base-object.item';

type Obj = Record<string, unknown>;

export class LocalStorageObjectItem<T extends Obj> extends StorageBaseObjectItem<T> {
  constructor(key: string) {
    super(key, typeof window !== 'undefined' ? localStorage : undefined);
  }
}
