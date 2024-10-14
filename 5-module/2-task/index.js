function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  const textDiv = document.getElementById('text');

  button.addEventListener('click', () => {
    if (textDiv.hidden) {
      textDiv.hidden = false;
    } else {
      textDiv.hidden = true;
    }
  });
}
