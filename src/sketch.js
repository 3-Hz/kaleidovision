// globals
var tileSize = 100;
var tileWidth = tileSize;
var tileHeight = tileSize;
var canvasWidth;
var canvasHeight;
var gridSize = 0;
var backgroundOption = 0;
var isMobileBrowser = isMobile();

// setup
function preload() {
  sourceImage = sourceImage0 = loadImage("img/mandelbrot.png");
  sourceImage1 = loadImage("img/mandelbrot2.jpg");
  sourceImage2 = loadImage("img/buildingsketch.jpg");
}

function setup() {
  scaleGrid();
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvasContainer');

  background(255);
  smooth();
};

// main loop
function draw() {
  var tile = new Tile(sourceImage, tileWidth, tileHeight);
  var grid = new Grid(gridSize, gridSize);
  grid.update(tile);
};

// event listeners
function mouseClicked() {
  backgroundCycler();
  scaleGrid();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && tileSize > 0) {
    tileSize -= 50;
  }
}

function touchStarted() {

}

// helper functions
function backgroundCycler() {
  if (backgroundOption === 2) {
    backgroundOption = 0;
  } else {
    backgroundOption++;
  }
  if (backgroundOption === 0) {
    sourceImage = sourceImage0;
  } else if (backgroundOption === 1) {
    sourceImage = sourceImage1;
  } else if (backgroundOption === 2) {
    sourceImage = sourceImage2;
  }
}

function scaleGrid() {
  if (isMobileBrowser) {
    gridSize = 0;
    while ((gridSize * tileWidth) < (displayWidth * 2)) {
      gridSize++;
    }
    gridSize = (gridSize - (gridSize % 2));
    canvasWidth = tileWidth * gridSize;
    canvasHeight = canvasWidth;
  } else {
    canvasWidth = sourceImage.width;
    canvasHeight = sourceImage.height;
    gridsize = 0;
    while ((gridSize * tileWidth) < (canvasWidth + tileWidth)) {
      gridSize++;
    }
    gridSize = (gridSize - (gridSize % 2));
  }
}

function isMobile() {
  if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
      return true;
  } else {
    return false;
  }
}

// object representation of grid
class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  update(tile) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
      // along each row
        image(tile.image, 0, 0, tile.width, tile.height);
        if (j % 2 === 0) {
          translate(tile.width*2,0);
          scale(-1.0, 1.0);
        } else {
          scale(-1.0, 1.0);
        }
      }
      // descend column
      // translate(0, tile.height)?
      if (i % 2 === 0) {
        translate(-(tile.width*this.width), tile.height*2);
        scale(1.0, -1.0);
      } else {
        translate(-(tile.width*this.width), 0);
        scale(1.0, -1.0);
      }
    }
  }
}

class Tile {
  constructor(image, width, height) {
    this.width = width;
    this.height = height;
    if (isMobileBrowser) {
      this.image = image.get(((mouseX/(canvasWidth)) * sourceImage.width), ((mouseY/(canvasHeight)) * sourceImage.height), this.width, this.height);
    } else {
      this.image = image.get(mouseX, mouseY, this.width, this.height);
    }
  }
}