export const MAX_FIND_EDGES_LEVEL = 5;

export const findKey = <T = unknown>(
  key: string,
  data?: Record<string, any>,
  level = 0,
): T | null => {
  if (data == null || level > MAX_FIND_EDGES_LEVEL) {
    return null;
  }
  if (data.hasOwnProperty(key)) {
    return data[key];
  }

  const values = Object.values(data);
  const results = values
    .filter(it => typeof it === 'object')
    .map(it => findKey(key, it, level + 1))
    .filter(it => it != null);

  return results.length > 0 ? (results[0] as T) : null;
};
