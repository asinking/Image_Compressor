const fileInput = document.getElementById("file-input");
const qualityInput = document.getElementById("quality");
const qualityValue = document.getElementById("quality-value");
const compressBtn = document.getElementById("compress-btn");
const resultImage = document.getElementById("result-image");
const downloadBtn = document.getElementById("download-btn");
const resultDiv = document.querySelector(".result");

qualityValue.innerHTML = qualityInput.value;

qualityInput.addEventListener("input", () => {
  qualityValue.innerHTML = qualityInput.value;
});

compressBtn.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select an image file");
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = event => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const quality = parseInt(qualityInput.value) / 100;
      const dataURL = canvas.toDataURL("image/jpeg", quality);

      resultImage.src = dataURL;

      downloadBtn.href = dataURL;
      downloadBtn.style.display = "block";
    };
  };
});
