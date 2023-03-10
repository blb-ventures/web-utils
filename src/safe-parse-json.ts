export const safeParseJson = (choice: any): string | null => {
  if (typeof choice !== 'string') return choice;
  let parsed = null;
  try {
    parsed = JSON.parse(choice);
  } catch (e) {
    parsed = null;
  }
  return parsed;
};
