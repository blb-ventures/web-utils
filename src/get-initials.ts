export const getInitials = (i: string) =>
  i
    .split(' ')
    .map(it => it[0])
    .join('')
    .toLocaleUpperCase();
