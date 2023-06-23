/**
 * Transforms a base64 relay id to a type and numeric id
 *
 * @param encoded
 * @throws Error if the encoded value is not a valid base64 or relay id.
 * @returns an object with type and id properties
 */
export const decodeId = (encoded: string) => {
  const decoded =
    typeof window === 'undefined'
      ? Buffer.from(encoded, 'base64').toString('binary')
      : window.atob(encoded);
  if (!decoded.includes(':')) throw new Error('Invalid relay id');
  const [type, id] = decoded.split(':');
  return { type, id };
};

/**
 * Transforms a type and numeric id to a base64 relay id
 *
 * @param type
 * @param id
 * @throws Error if the type or id contain a character that does not fit in a single byte.
 * @returns a base64 encoded relay id
 */
export const encodeId = (type: string, id: string) => {
  if (typeof window === 'undefined') {
    return Buffer.from(`${type}:${id}`).toString('base64');
  }
  return window.btoa(`${type}:${id}`);
};

/**
 * Transforms a base64 relay id to a type and numeric id
 *
 * @param encoded
 * @returns null if the encoded value is not a valid base64 or relay id.
 */
export const decodeIdOrNull = (encoded: string) => {
  try {
    return decodeId(encoded);
  } catch (e) {
    return null;
  }
};

/**
 * Transforms a type and numeric id to a base64 relay id
 * @param type
 * @param id
 * @returns null if the type or id contain a character that does not fit in a single byte.
 */
export const encodeIdOrNull = (type: string, id: string) => {
  try {
    return encodeId(type, id);
  } catch (e) {
    return null;
  }
};

/**
 * Encodes a cursor for use in a Relay connection
 * @param index
 * @returns a base64 encoded relay id of the arrayconnection type
 */
export const encodeCursor = (index: number) => encodeId('arrayconnection', index.toString());

/**
 * Decodes a cursor from a Relay connection
 * @param cursor
 * @returns the numeric id of the cursor
 */
export const decodeCursor = (cursor: string) => parseInt(decodeId(cursor).id, 10);

/**
 * Encodes a cursor for use in a Relay connection
 * @param index
 * @returns a base64 encoded relay id of the arrayconnection type or null if the index is null
 */
export const encodeCursorOrNull = (index: number) =>
  encodeIdOrNull('arrayconnection', index.toString());

/**
 * Decodes a cursor from a Relay connection
 * @param cursor
 * @returns the numeric id of the cursor or null if the cursor is invalid
 */
export const decodeCursorOrNull = (cursor: string) => {
  const decoded = decodeIdOrNull(cursor);
  if (decoded == null) return null;
  return parseInt(decoded.id, 10);
};
