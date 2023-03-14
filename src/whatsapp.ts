export const whatsappLink = (options: { phone?: number | string; text?: string }) => {
  const url = new URL(`https://wa.me/${options.phone?.toString() ?? ''}`);
  if (options.text != null) url.searchParams.set('text', options.text);
  return url.toString();
};
