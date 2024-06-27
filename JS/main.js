// GALLERY ANIMATION - Track 1
const track1 = document.getElementById("image-track");

track1.addEventListener('mousedown', (e) => {
    track1.dataset.mouseDownAt = e.clientX;
});

track1.addEventListener('mouseup', () => {
    track1.dataset.mouseDownAt = "0";  
    track1.dataset.prevPercentage = track1.dataset.percentage;
});

track1.addEventListener('mousemove', (e) => {
    if(track1.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track1.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track1.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track1.dataset.percentage = nextPercentage;

    track1.style.transform = `translate(${nextPercentage}%, -50%)`;

    for(const image of track1.getElementsByClassName("image")) {
        image.style.objectPosition = `${100 + nextPercentage}% center`;
    }
});

// GALLERY ANIMATION - Track 2
const track2 = document.getElementById("image-track2");

track2.addEventListener('mousedown', (e) => {
    track2.dataset.mouseDownAt = e.clientX;
});

track2.addEventListener('mouseup', () => {
    track2.dataset.mouseDownAt = "0";  
    track2.dataset.prevPercentage = track2.dataset.percentage;
});

track2.addEventListener('mousemove', (e) => {
    if(track2.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track2.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track2.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track2.dataset.percentage = nextPercentage;

    track2.style.transform = `translate(${nextPercentage}%, -30%)`;

    for(const image of track2.getElementsByClassName("image")) {
        image.style.objectPosition = `${100 + nextPercentage}% -30%`;
    }
});

// GALLERY ANIMATION - Track 3
const track3 = document.getElementById("image-track3");

track3.addEventListener('mousedown', (e) => {
    track3.dataset.mouseDownAt = e.clientX;
});

track3.addEventListener('mouseup', () => {
    track3.dataset.mouseDownAt = "0";  
    track3.dataset.prevPercentage = track3.dataset.percentage;
});

track3.addEventListener('mousemove', (e) => {
    if(track3.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track3.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track3.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track3.dataset.percentage = nextPercentage;

    track3.style.transform = `translate(${nextPercentage}%, -10%)`;

    for(const image of track3.getElementsByClassName("image")) {
        image.style.objectPosition = `${100 + nextPercentage}% -10%`;
    }
});

// 
// 
// 
// HALFTONE ANIMATION
// 
// 
// 

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function dot(ctx, x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
}

class Dot {
  constructor(options) {
    this.originalPos = new p5.Vector(options.x, options.y);
    this.pos = this.originalPos.copy();
    this.target = new p5.Vector(options.x, options.y);
    this.vel = new p5.Vector(0, 0);
    this.acc = new p5.Vector(0, 0);
    
    this.radius = options.radius;
    this.color = options.color;
    this.originalColor = this.color;
    this.hoverColor = options.hoverColor;
    this.ctx = options.context;
    
    this.maxforce = 0.1; // Arbitrary value
    this.maxspeed = 4; // Arbitrary value
    this.comfortZone = 100; // Arbitrary value
  }
  
  addPredator(predator) {
    this.predator = predator;
  }
  
  update() {
    if (this.predator) {
      const distanceFromPredator = this.pos.dist(this.predator.pos);
      if (distanceFromPredator < this.comfortZone) {
          this.color = this.hoverColor;
          this.target = this.predator.pos;
      } else {
        this.target = this.originalPos;
        this.color = this.originalColor;
      }
    }
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  seek(target) {
    const desired = p5.Vector.sub(target, this.pos);  // A vector pointing from the position to the target
    const d = desired.mag();
    // Scale with arbitrary damping within 100 pixels
    if (d < 100) {
      const m = map_range(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    // Steering = Desired minus Velocity
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    this.applyForce(steer);
  }
  
  draw() {
    dot(this.ctx, this.pos.x, this.pos.y, this.radius, this.color);
  }
}

class Mouse {
  constructor(context) {
    this.pos = new p5.Vector(window.innerWidth / 2, window.innerHeight / 2);
    this.context = context;
  }
  
  updatePos(e) {
    this.pos.x = e.clientX;
    this.pos.y = e.clientY;
  }
  
  draw() {
    dot(this.context, this.pos.x, this.pos.y, 10, 'red');
  }
}

var sourceCanvas = document.getElementById('source-canvas');
var targetCanvas = document.getElementById('target-canvas');
var sourceCtx = sourceCanvas.getContext('2d');
var targetCtx = targetCanvas.getContext('2d');
var imageObj = new Image();
const dots = [];

// PARAMS
const imageSrc = '../CSS/img/img1.png';
const detailLevel = 5; // Increase detail level to capture more points
const minDotRadius = 0.1; // Adjust minimum dot radius to capture smaller details
const maxDotRadius = 4;
const dotColor = '#E9007F';// #E9007F #D5FFFB

// Allow us to use context.getImageData()
imageObj.crossOrigin = "Anonymous";
imageObj.src = imageSrc; 
imageObj.onload = initializeDots;

function initializeDots() {
  // Set fixed canvas size
  sourceCanvas.width = window.innerWidth;
  sourceCanvas.height = window.innerHeight;
  
  targetCanvas.width = window.innerWidth;
  targetCanvas.height = window.innerHeight;
  
  // Scale factors
  const imageScale = 1.5; // Double the image size
  const canvasScale = 1; // Half the canvas size
  
  // Draw the image onto the source canvas with the scaling factors
  sourceCtx.drawImage(
    imageObj, 
    0, 0, imageObj.width, imageObj.height, // Source image rectangle (full size)
    0, 0, sourceCanvas.width / canvasScale, sourceCanvas.height / canvasScale // Destination canvas rectangle (scaled)
  );
  
  var imageData = sourceCtx.getImageData(0, 0, sourceCanvas.width / canvasScale, sourceCanvas.height / canvasScale);
  
  // Clear existing dots array to reset when the image is reloaded
  dots.length = 0;
  
  // Iterate over pixels, and draw dots with a radius defined by the brightness of the pixel
  for (var y = 0; y < sourceCanvas.height / canvasScale; y += detailLevel) {
    const row = (sourceCanvas.width / canvasScale) * y;
    for (var x = 0; x < sourceCanvas.width / canvasScale; x += detailLevel) {
      const pixel = (row + x) * 4;
      const rPos = pixel;
      const gPos = pixel + 1;
      const bPos = pixel + 2;
    
      // Compute the average brightness of a pixel
      var brightness = (imageData.data[rPos] + imageData.data[gPos] + imageData.data[bPos]) / 3;
      const radius = map_range(brightness, 0, 255, 0, maxDotRadius);
      
      // Make sure that we don't waste resources on drawing imperceptible dots
      if (radius > minDotRadius) {
        const dot = new Dot({
          x: x * imageScale * canvasScale, // Scale dot position based on image and canvas scales
          y: y * imageScale * canvasScale, // Scale dot position based on image and canvas scales
          radius,
          color: dotColor,
          hoverColor: '#0099cc',
          context: targetCtx,
        });
        dot.addPredator(mouse);
        dots.push(dot);
      }
    }
  }
  
  loop();
}

const mouse = new Mouse(targetCtx);
targetCanvas.addEventListener('mousemove', (e) => {
  mouse.updatePos(e);
});

function loop() {
  requestAnimationFrame(loop);
  targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  dots.forEach((dot) => {
    dot.seek(dot.target);
    dot.update();
    dot.draw();
  });
  //mouse.draw();
}


// 
// 
// 
//  ON SCROLL ANIMATION
// 
// 
// 
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    rootMargin: '0px 0px -50% 0px'
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));