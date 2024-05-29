export function closeDialog() {
  const dialogCloseButton = document.querySelector(
    'button[data-close-modal]'
  ) as HTMLButtonElement;

  dialogCloseButton.click();
}
