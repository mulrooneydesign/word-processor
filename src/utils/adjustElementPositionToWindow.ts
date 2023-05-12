export default function adjustElementPositionToWindow(
  element: HTMLElement,
  offset: number
): void {
  const elementRect = element.getBoundingClientRect();

  let updatedOffset: number = offset;

  if (!offset) updatedOffset = 0;

  if (elementRect.right > window.innerWidth) {
    const newLeft: number =
      window.innerWidth - elementRect.width - updatedOffset;
    element.style.left = `${newLeft}px`;
  }

  if (elementRect.left < 0) {
    const newLeft: number = updatedOffset;
    element.style.left = `${newLeft}px`;
  }
}
