export const exportFile = (
  text: string,
  filename: string
): void | undefined => {
  const fileData = text.trim();
  const blob = new Blob([fileData], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${filename}.md`;
  link.href = url;
  link.click();
};
