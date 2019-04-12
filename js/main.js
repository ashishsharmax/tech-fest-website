
$(window).load(function() {
  var speed = 5;
  var particles = [];
  var body = $('body');
  var w = body.width();
  var h = body.height();
  
  var camera = new THREE.PerspectiveCamera(85, w / h, 1, 4000);
  var scene = new THREE.Scene();
  camera.position.z = 1000;
  scene.add(camera);
  var renderer = new THREE.CanvasRenderer( { alpha: true });
  renderer.setSize(w, h);
  body.append(renderer.domElement);
  
  createParticles();
  update();

  function createParticles() {
    var particle, material;
    for (var zpos = -1000; zpos < 1000; zpos += 4) {
      material = new THREE.ParticleCanvasMaterial({
        color: 0xF7E4BE,
        program: function(c){
          c.beginPath();
          c.arc(0, 0, .8, 0, Math.PI * 2, true);
          c.fill();
        }
      });
      particle = new THREE.Particle(material);
      particle.position.x = Math.random() * 1000 - 500;
      particle.position.y = Math.random() * 1000 - 500;
      particle.position.z = zpos;
      particle.scale.x = particle.scale.y = 1;
      scene.add(particle);
      particles.push(particle);
    }
  }
  
  function update() {
    requestAnimationFrame( update);  
    for (var i = 0; i < particles.length; i++) {
      particle = particles[i];
      particle.position.z += speed;
      if (particle.position.z > 1000) particle.position.z -= 2000;
        }
    renderer.render(scene, camera);
  }
  
});

if (!window.requestAnimationFrame ) {
    window.requestAnimationFrame = ( function() {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element ) {
            window.setTimeout( callback, 1000 / 60 );
        };
    })();
}


let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    WIDTH,
    HEIGHT,
    mouseMoving = false,
    mouseMoveChecker,
    mouseX,
    mouseY,
    stars = [],
    initStarsPopulation = 200,
    dots = [],
    dotsMinDist = 2,
    maxDistFromCursor = 50;



let degToRad = (deg) => deg * (Math.PI / 180);


class Star {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random() * 2) + 1;
        let alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
        this.color = `rgba(255,255,255,${alpha})`;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

    move() {
        this.y -= .15;
        if (this.y <= -10) this.y = HEIGHT + 10;
        this.draw();
    }

    die() {
        stars[this.id] = null;
        delete stars[this.id];
    }
}

class Dot {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random() * 5) + 1;

        this.speed = .9 ;
        this.a = .5;
        this.aReduction = .005;
        this.color = "rgba(255,255,255," + this.a + ")";
        this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";

        this.dir = Math.floor(Math.random() * 140) + 200;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

    link() {
        if (this.id === 0) return;
        let previousDot1 = getPreviousDot(this.id, 1);
        let previousDot2 = getPreviousDot(this.id, 2);
        let previousDot3 = getPreviousDot(this.id, 3);
        if (!previousDot1) return;
        ctx.strokeStyle = this.linkColor;
        ctx.moveTo(previousDot1.x, previousDot1.y);
        ctx.beginPath();
        ctx.lineTo(this.x, this.y);
        if (previousDot2 !== false) ctx.lineTo(previousDot2.x, previousDot2.y);
        if (previousDot3 !== false) ctx.lineTo(previousDot3.x, previousDot3.y);
        ctx.stroke();
        ctx.closePath();
    }

    move() {
        this.a -= this.aReduction;
        if (this.a <= 0) {
            this.die();
            return;
        }
        this.color = "rgba(255,255,255," + this.a + ")";
        this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
        this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed;
        this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed;

        this.draw();
        this.link();
    }

    die() {
        dots[this.id] = null;
        delete dots[this.id];
    }
}


function getPreviousDot(id, stepback) {
    if (id === 0 || id - stepback < 0) return false;
    if (typeof dots[id - stepback] !== "undefined") return dots[id - stepback];
    else return false;//getPreviousDot(id - stepback);
}


function setCanvasSize() {
    WIDTH = document.documentElement.clientWidth;
    HEIGHT = document.documentElement.clientHeight;

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);
}

function init() {
    ctx.strokeStyle = "white";
    ctx.shadowColor = "white";
    for (let i = 0; i < initStarsPopulation; i++) {
        stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT));
        //stars[i].draw();
    }
    ctx.shadowBlur = 0;
    animate();
}

function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    stars.forEach((item) => {
        item.move();
    });

    dots.forEach((item)=>{
        item.move();
    });

    drawIfMouseMoving();
    requestAnimationFrame(animate);
}

window.onmousemove = function (e) {
    mouseMoving = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    clearInterval(mouseMoveChecker);
    mouseMoveChecker = setTimeout(function () {
        mouseMoving = false;
    }, 100);
};


function drawIfMouseMoving() {
    if (!mouseMoving) return;

    if (dots.length === 0) {
        dots[0] = new Dot(0, mouseX, mouseY);
        dots[0].draw();
        return;
    }

    let previousDot = getPreviousDot(dots.length, 1);
    let prevX = previousDot.x;
    let prevY = previousDot.y;

    let diffX = Math.abs(prevX - mouseX);
    let diffY = Math.abs(prevY - mouseY);

    if (diffX < dotsMinDist || diffY < dotsMinDist) return;

    let xVariation = Math.random() > .5 ? -1 : 1;
    xVariation = xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
    let yVariation = Math.random() > .5 ? -1 : 1;
    yVariation = yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
    dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation);
    dots[dots.length - 1].draw();
    dots[dots.length - 1].link();
}

setCanvasSize();
init();
