// globals
var tileWidth = 500;
var tileHeight = 500;
// setup
function preload() {
  sourceImage = loadImage("img/mandelbrot.png");
}

function setup() {
  let canvas = createCanvas(sourceImage.width, sourceImage.height);
  canvas.parent('canvasContainer');

  background(255);
  smooth();
};

// main loop
function draw() {
  var tile = new Tile(sourceImage, tileWidth, tileHeight);
  var grid = new Grid(5, 5);
  grid.update(tile);
};

// object representation of grid
class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  update(tile) {
    // for (let i = 0; i < this.width; i++) {
    //   for (let j = 0; j < this.height; j++) {
    //     if (i % 2 !== 0 && j % 2 !== 0) {
    //       // 180 degree rotate lower right corner
    //     } else if (i % 2 === 0 && j % 2 !== 0) {
    //       // 270 degree rotate lower left corner
    //     } else if (i % 2 !== 0 && j % 2 === 0) {
    //       // 90 degree rotate upper right corner
    //     } else if (i % 2 === 0 && j % 2 === 0) {
    //       // 0 or 360 degree rotate upper left corner
    //       image(tile.image, i * tile.image.width, j * tile.image.height);
    //     }
    //   }
    // }
    image(tile.image, 0, 0, tile.width/2, tile.height); //video on canvas, position, dimensions
    translate(tile.width,0); // move to far corner
    scale(-1.0,1.0);    // flip x-axis backwards
    image(tile.image, 0, 0, tile.width/2, tile.height); //video on canvas, position, dimensions
  }
}

class Tile {
  constructor(image, width, height) {
    this.width = width;
    this.height = height;
    this.image = image.get(mouseX, mouseY, this.width, this.height);
  }
}