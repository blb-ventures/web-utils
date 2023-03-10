export const filterObjKeys = (obj: Record<string, unknown>, excludeValue: unknown) =>
  Object.keys(obj).reduce(
    (acc: Record<string, unknown>, key) => ({
      ...acc,
      ...(obj[key] !== excludeValue ? { [key]: obj[key] } : {}),
    }),
    {},
  );

export const filterObjNullValues = (obj: Record<string, unknown>) =>
  Object.keys(obj).reduce(
    (acc: Record<string, unknown>, key) => ({
      ...acc,
      ...(obj[key] != null ? { [key]: obj[key] } : {}),
    }),
    {},
  );
