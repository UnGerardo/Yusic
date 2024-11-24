
async function combineImages(base64Images: string[]) {
  const images = base64Images.map((base64) => {
    const img = new Image();
    img.src = base64;
    return img;
  });

  await Promise.all(images.map((img) => {
    return new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
  }));

  const width = images[0].width;
  const height = images[0].height;

  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 1280;
  const ctx = canvas.getContext("2d");

  ctx!.drawImage(images[0], 0, 0, width, height);
  ctx!.drawImage(images[1], width, 0, width, height);
  ctx!.drawImage(images[2], 0, height, width, height);
  ctx!.drawImage(images[3], width, height, width, height);

  return canvas.toDataURL("image/png");
}

export default combineImages;