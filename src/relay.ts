/**
 * Transforms a base64 relay id to a type and numeric id
 *
 * @param encoded
 */
export const decodeId = (encoded: string) => {
  const decoded =
    typeof window === 'undefined'
      ? Buffer.from(encoded, 'base64').toString('binary')
      : atob(encoded);
  const [type, id] = decoded.split(':');
  return { type, id };
};

/**
 * Transforms a type and numeric id to a base64 relay id
 *
 * @param type
 * @param id
 */
export const encodeId = (type: string, id: string) => {
  if (typeof window === 'undefined') {
    return Buffer.from(`${type}:${id}`).toString('base64');
  }
  return btoa(`${type}:${id}`);
};

export const encodeCursor = (index: number) => encodeId('arrayconnection', index.toString());
export const decodeCursosr = (cursor: string) => parseInt(decodeId(cursor).id, 10);
