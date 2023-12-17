let video;
let snapshots = [];
let saveButton;

function setup() {
  // 캔버스를 화면 정가운데에 위치하도록 설정
  createCanvas(windowHeight * 4/3, windowHeight).position((windowWidth - width) / 2, 0);

  video = createCapture(VIDEO);
  video.hide();

  saveButton = createButton('Save Image');
  saveButton.position(10, 10);
  saveButton.mousePressed(saveImage);
}

function takesnap() {
  snapshots.push(video.get());
}

function applyGrayscaleEffect(img) {
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    let grayscale = (r + g + b) / 3;

    img.pixels[i] = grayscale;
    img.pixels[i + 1] = grayscale;
    img.pixels[i + 2] = grayscale;
  }
  img.updatePixels();
}

function draw() {
  background("#205893");
  frameRate(0.5);
  
  takesnap();

  for (let i = 0; i < snapshots.length; i++) {
    let img = snapshots[i].get();
    applyGrayscaleEffect(img);

    let alpha = map(i, 0, snapshots.length - 1, 20, 0);

    blendMode(SCREEN);
    tint(255, alpha);

    image(img, 0, 0, height * 4/3, height);
    blendMode(BLEND);
  }

  saveButton.show();
}

function saveImage() {
  let imgToSave = get(0, 0, width, height);
  imgToSave.save('output', 'png');
}
