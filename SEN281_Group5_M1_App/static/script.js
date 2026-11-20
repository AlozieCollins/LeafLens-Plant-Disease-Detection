// Keep the upload experience conversational without claiming a disease prediction.
const fileInput = document.getElementById('leaf_image');
const zone = document.getElementById('drop-zone');
const titleText = document.getElementById('upload-title');
const nameText = document.getElementById('file-name');
const assistantMessage = document.getElementById('assistant-message');
const preview = document.getElementById('client-preview');
const previewImage = document.getElementById('preview-image');
const previewFilename = document.getElementById('preview-filename');
const removeButton = document.getElementById('remove-image');
const uploadForm = document.getElementById('upload-form');
const submitButton = document.getElementById('submit-button');
const buttonLabel = document.getElementById('button-label');
let previewURL = null;

// Check the file before allowing users to submit it to Flask.
function validateFile(file) {
  if (!file) return 'Please select a photo first.';
  if (!['image/jpeg', 'image/png'].includes(file.type)) return 'Please choose a JPG or PNG image.';
  if (file.size > 8 * 1024 * 1024) return 'That photo is over 8 MB. Try a smaller image.';
  return null;
}

function resetPreview() {
  if (previewURL) URL.revokeObjectURL(previewURL);
  previewURL = null;
  previewImage.removeAttribute('src');
  preview.hidden = true;
  zone.classList.remove('has-file');
  titleText.textContent = 'Drop your leaf photo here';
  nameText.textContent = 'or click to browse your files';
  submitButton.disabled = true;
  buttonLabel.textContent = 'Choose a photo to continue';
}

// Update the image preview, upload button and assistant message.
function reflectFile() {
  const file = fileInput.files?.[0];
  resetPreview();
  if (!file) {
    assistantMessage.textContent = 'Hi there! 🌱 Have a tomato leaf you\'d like to check? Choose a photo below and I\'ll help you get started.';
    return;
  }
  const error = validateFile(file);
  if (error) {
    assistantMessage.textContent = error;
    fileInput.value = '';
    return;
  }
  previewURL = URL.createObjectURL(file);
  previewImage.src = previewURL;
  previewFilename.textContent = file.name;
  preview.hidden = false;
  zone.classList.add('has-file');
  titleText.textContent = 'Lovely choice!';
  nameText.textContent = 'You can change your photo by clicking here.';
  submitButton.disabled = false;
  buttonLabel.textContent = 'Upload my leaf';
  assistantMessage.textContent = 'Looking good! 🌿 Your photo is selected. When you\'re ready, upload it and I\'ll save it for our image analysis work.';
}

fileInput.addEventListener('change', reflectFile);
removeButton.addEventListener('click', () => {
  fileInput.value = '';
  resetPreview();
  assistantMessage.textContent = 'No problem! Choose another tomato leaf photo whenever you\'re ready.';
});

// Support drag-and-drop as well as clicking the upload area.
['dragenter', 'dragover'].forEach(type => zone.addEventListener(type, event => {
  event.preventDefault();
  zone.classList.add('dragging');
}));
['dragleave', 'drop'].forEach(type => zone.addEventListener(type, event => {
  event.preventDefault();
  zone.classList.remove('dragging');
}));
zone.addEventListener('drop', event => {
  const file = event.dataTransfer?.files?.[0];
  if (!file) return;
  const transfer = new DataTransfer();
  transfer.items.add(file);
  fileInput.files = transfer.files;
  reflectFile();
});

// Prevent double submissions while Flask processes the uploaded photo.
uploadForm.addEventListener('submit', event => {
  if (validateFile(fileInput.files?.[0])) {
    event.preventDefault();
    reflectFile();
    return;
  }
  submitButton.disabled = true;
  buttonLabel.textContent = 'Saving your leaf photo…';
  assistantMessage.textContent = 'Great! 🌱 I\'m saving your tomato leaf photo now.';
});

// Give accurate feedback after Flask returns a completed upload or an error.
if (window.leafLensUploadComplete) {
  assistantMessage.textContent = 'You did it! 🎉 Your leaf photo has been saved. Next, we\'ll work on preprocessing and eventually connect our disease detection model.';
} else if (window.leafLensUploadError) {
  assistantMessage.textContent = 'Something went wrong with that upload. Check the message below and try a different photo.';
}
