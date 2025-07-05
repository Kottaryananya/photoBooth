const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const downloadBtn = document.getElementById('download-btn');
const photoContainer = document.querySelector('.photo-container');
const cameraContainer = document.querySelector('.camera-container');
const filters = document.querySelectorAll('.filters button');

const ctx = canvas.getContext('2d');

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert('Camera access denied or not available');
  });

// Capture photo
captureBtn.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  cameraContainer.classList.add('hidden');
  photoContainer.classList.remove('hidden');
});

// Apply filter
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    ctx.filter = getCSSFilter(filter);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  });
});

function getCSSFilter(name) {
  if (name === 'grayscale') return 'grayscale(1)';
  if (name === 'sepia') return 'sepia(1)';
  return 'none';
}

// Download photo
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'photobooth.png';
  link.href = canvas.toDataURL();
  link.click();
});
