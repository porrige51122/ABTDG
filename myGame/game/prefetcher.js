const loadImages = (arr, callback) => {
  let loadedImageCount = 0;

  arr.forEach(name => {
    let img = new Image();
    img.onload = () => {
        imageLoaded();
    };
    img.src = `images/${name}`
  });

  const imageLoaded = () => {
    loadedImageCount++;
    if (loadedImageCount >= arr.length) {
      callback();
    }
  }
}

export default loadImages;
