/* eslint-disable @typescript-eslint/no-magic-numbers */
export const stringToColor = (input: string, darken = 50) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < input.length; i += 1) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    const darkerValue = value > darken ? value - darken : 0;
    color += `00${darkerValue.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};
