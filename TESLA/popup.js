const popup = document.querySelector('#myPopup');
const openLink = document.querySelector('#openPopup');
const closeBtn = document.querySelector('#closePopup');

openLink.addEventListener('click', (e) => {
  e.preventDefault(); // Prevents the link from jumping/reloading the page
  popup.showModal();
});

closeBtn.addEventListener('click', () => {
  popup.close();
});

// Close when clicking outside the modal
popup.addEventListener('click', (e) => {
  const dialogDimensions = popup.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    popup.close();
  }
});