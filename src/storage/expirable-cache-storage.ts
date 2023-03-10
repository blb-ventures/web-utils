import { encodeId } from '../relay';
import { LocalStorageObjectItem } from './local-storage-object-item';
import { StorageBaseObjectItem } from './storage-base-object.item';

export interface ExpirableCacheStorageOptions<T extends Record<string, unknown>> {
  timeout?: number;
  storage?: StorageBaseObjectItem<T>;
}

const defaultOptions: ExpirableCacheStorageOptions<Record<string, unknown>> = {
  timeout: 1000 * 60 * 5, // 5 minutes
};

export const expirableCacheStorage = <T extends Record<string, unknown>>(
  key: string,
  missFn: (...params: [...any]) => T | Promise<T>,
  options?: ExpirableCacheStorageOptions<T>,
) => {
  const settings = { ...defaultOptions, ...options };
  const storage = settings.storage ?? new LocalStorageObjectItem<T>(key);
  return (...params: any[]) => {
    const hash = encodeId(key, params.join(''));
    const storageContent = storage.get();
    if (typeof window !== 'undefined' && storage.hasKey(hash, storageContent)) {
      return storage.getKey(hash, storageContent) as T;
    }
    return missFn(...params);
  };
};
