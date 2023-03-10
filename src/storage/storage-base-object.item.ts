/* eslint-disable @typescript-eslint/brace-style */

export interface StorageBaseObjectItemMethods<T extends Record<string, unknown>> {
  get(): T | null;
  set(ops: T): void;
  hasKey(key: string, obj: T): void;
  addOrUpdateKey(key: string, value: unknown): void;
  removeKey(key: string): void;
}

type Maybe<T> = T | undefined;

export type StorageChangeHandler<T> = (event: CustomEvent<T | null>) => void;

export class StorageBaseObjectItem<T extends Record<string, unknown>>
  extends EventTarget
  implements StorageBaseObjectItemMethods<T>
{
  storageKey: string;

  storage: Maybe<Storage>;

  private onChangeEvent: string;

  constructor(key: string, storage?: Storage) {
    super();
    this.storageKey = key;
    this.storage = storage;
    this.onChangeEvent = `${this.storageKey}OnChange`;
  }

  get(): T | null {
    if (this.storage != null) {
      const storageValue = this.storage.getItem(this.storageKey);
      if (typeof storageValue === 'string') {
        try {
          return JSON.parse(storageValue);
        } catch (_) {}
      }
    }
    return null;
  }

  set(ops: T) {
    if (this.storage != null) {
      this.storage.setItem(this.storageKey, JSON.stringify(ops));
      this.dispatchEvent(new CustomEvent<T>(this.onChangeEvent, { detail: ops }));
    }
  }

  hasKey(key: string, obj = this.get()) {
    return obj?.[key] != null;
  }

  getKey(key: string, obj = this.get()) {
    return obj != null ? obj[key] : null;
  }

  addOrUpdateKey(key: string, value: unknown) {
    this.set({ ...this.get(), [key]: value } as T);
  }

  removeKey(key: string) {
    if (this.hasKey(key)) {
      const obj = this.get();
      if (obj != null) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete obj[key];
        this.set(obj);
      }
    }
  }

  onChange(callback: StorageChangeHandler<T>) {
    this.addEventListener(this.onChangeEvent, callback as EventListener);
    callback(new CustomEvent(this.onChangeEvent, { detail: this.get() }));
  }

  offChange(callback: StorageChangeHandler<T>) {
    this.removeEventListener(this.onChangeEvent, callback as EventListener);
  }
}
