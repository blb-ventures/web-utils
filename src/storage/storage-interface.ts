export interface LocalStorageItem<T> {
  get(): T | null;
  set(ops: T): void;
}
