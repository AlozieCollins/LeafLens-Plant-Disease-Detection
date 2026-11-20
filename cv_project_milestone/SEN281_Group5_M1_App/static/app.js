const fileInput = document.getElementById('leaf_image');
const zone = document.getElementById('drop-zone');
const nameText = document.getElementById('file-name');
const titleText = document.getElementById('upload-title');
function reflectFile() {
  const file = fileInput.files && fileInput.files[0];
  nameText.textContent = file ? file.name : 'No file selected';
  titleText.textContent = file ? 'Your image is ready to upload' : 'Drag and drop your leaf image';
}
fileInput.addEventListener('change', reflectFile);
['dragenter','dragover'].forEach(type => zone.addEventListener(type, event => {event.preventDefault(); zone.classList.add('dragging');}));
['dragleave','drop'].forEach(type => zone.addEventListener(type, event => {event.preventDefault(); zone.classList.remove('dragging');}));
zone.addEventListener('drop', event => {
  const file = event.dataTransfer.files[0];
  if (!file) return;
  const transfer = new DataTransfer();
  transfer.items.add(file);
  fileInput.files = transfer.files;
  reflectFile();
});
