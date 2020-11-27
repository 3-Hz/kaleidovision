//-----------------Globals
let tileSize = 96;
let pixelColor;
let sourceImage;
let particle;
let showImage = false;

//-----------------Setup
function preload() {
  sourceImage=loadImage("img/earth.jpg");
}

function setup() {
  //createCanvas(1024,683);
  let canvas = createCanvas(550,368);
  canvas.parent('canvasContainer');
  background(0);
  smooth();
  particle = new Particle();
};

//-----------------Main Loop
function draw() {
  particle.update();
  tileCursor(particle);
  if (showImage) {
    image(sourceImage,0,0);
  }
};

//-----------------Defined Functions
function makeTile(outputImage) {
  for (let i=0; i<=outputImage.width/2; i++) {
    for (let j=0; j<=outputImage.height/2; j++) {
      pixelColor = outputImage.get(i,j);
      outputImage.set(i,j,pixelColor);
      outputImage.set(outputImage.width-i,j,pixelColor);
      outputImage.set(i,outputImage.height-j,pixelColor);
      outputImage.set(outputImage.width-i,outputImage.height-j,pixelColor);
    }
  }
  return outputImage;
};

function tileCursor(particle) {
  let tile = makeTile(sourceImage.get(particle.position.x,particle.position.y,tileSize,tileSize));
  for (let i = 0; i < width; i += tileSize) {
    for (let j = 0; j < height; j += tileSize) {
      image(tile,i,j);
    }
  }
};

//-----------------Interactions
function keyPressed() {
  if (key == ' ') {
    showImage = !showImage;
  }
  if (key == CODED) {
    if (keyCode == UP) {
      tileSize += 8;
      for (let i=0; i<width; i+=tileSize) {
        for (let j=0; j<height; j+=tileSize) {
          image(makeTile(sourceImage.get(particle.position.x,particle.position.y,tileSize,tileSize)),i,j);
        }
      }
    }
    if (keyCode == DOWN) {
      tileSize -= 8;
      for (let i=0; i<width; i+=tileSize) {
        for (let j=0; j<height; j+=tileSize) {
          image(makeTile(sourceImage.get((particle.position.x,    particle.position.y,tileSize,tileSize)),i,j));
        }
      }
    }
  }
}

//-----------------Defined Classes
class Particle {

  constructor() {
    this.position = new p5.Vector(random(width),random(height),0);
    this.velocity = new p5.Vector(0,0,0);
    this.particleColor = color(255);
  }

  update() {
    velocity.x = 0.25*cos(TWO_PI*noise(0.001*position.x,0.001*position.y,0.001*position.z));
    velocity.y = 0.25*sin(TWO_PI*noise(0.001*position.x,0.001*position.y,0.001*position.z));
    position.add(velocity);

    //deal with edge cases
    if (position.x<0) {
       position.x+=width;
    }

    if (position.x>width) {
       position.x-=width;
    }

    if (position.y<0) {
       position.y+=height;
    }

    if (position.y>height) {
       position.y-=height;
    }
  }

  render() {
    stroke(particleColor,16);
    line(position.x,position.y,position.x+velocity.x,position.y+velocity.y);
  }
}