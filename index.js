const Message = document.querySelector('.ms');
const Usagigif = document.querySelector('.Usagi-gif');
const page1 = document.querySelector('.page1');
const startButton = document.querySelector('.Start-Button');
const Body = document.querySelector('body');
const ArrowContainer = document.querySelector('.Arrow-Contaier');
const ArrowLeft = document.querySelector('.arrow-left-button');
const ArrowRight = document.querySelector('.arrow-right-button');
const Loading = document.querySelector('.Loading');
let items = document.querySelectorAll('.cake-image')
const Gifticon = document.querySelector('.Gift');
const Again = document.querySelector('.Again');
const ConfirmButton = document.querySelector('.Confirm-button');
const kisscnt = document.querySelector('.Kiss-cnt');
const UsagiAudio = document.querySelector('.Usagi-audio');
let clicked = true;
let active = parseInt(items.length / 2);
let KISS_CNT = 0;
const GiftRef =  items[Math.floor(Math.random() * 5)]; // gift
class Gift{
    constructor(){
    }
    getKissValue = async() => {
        try{
            const querySnapshot = await window.getDocs(window.collection(window.db, "kiss"));
            querySnapshot.forEach((doc) => {
                const countValue = doc.data().count;
                console.log('test', countValue);
                return countValue;
            });
        }
        catch(e){
            console.error(e);
        }
    };
    init = async() => {
        try{
            const querySnapshot = await window.getDocs(window.collection(window.db, "kiss"));
            querySnapshot.forEach((doc) => {
                const countValue = doc.data().count;
                KISS_CNT = countValue;
            });
            kisscnt.textContent = `Kiss x ${KISS_CNT}`;
            let stt = 0;
            items[active].style.transform = 'none';
            items[active].style.opacity = 1;
            for(let i = active + 1 ; i < items.length; ++i){
                stt++;
                items[i].style.transform = `scale(${1 - 0.3*stt}) rotateY(-1deg)`;
                items[i].style.opacity = stt > 1 ? 0.3 : 0.8
            }
            stt = 0;
            for(let i = active - 1 ; i >= 0 ; i--){
                stt++;
                items[i].style.transform = `scale(${1 - 0.3*stt}) rotateY(1deg)`;
                items[i].style.opacity = stt > 1 ? 0.3 : 0.8
            }
        }
        catch(e){
            
        }
    }
}

const gift = new Gift();

const handleButton = () => {
    if(clicked && startButton.textContent === 'Start'){
        Message.style.display = 'none';
        Usagigif.style.display = 'none';
        ArrowContainer.style.display = 'flex';
        startButton.textContent = 'Pick';
        kisscnt.style.display = 'block';
    }
    else if(clicked && startButton.textContent === 'Pick'){
        PickGift();
        clicked = false;
    }
    else if(startButton.textContent === 'Restart'){
        location.reload();
    }
}

const PickGift = () => {
            Loading.style.display = 'block';
            UsagiAudio.currentTime = 9;
            UsagiAudio.play();
            let imageIndex = 0;
            let intervalTime = 100;
            let backgroundOpacity = 0.01; 
            let interval = setInterval(()=>{
                imageIndex = (imageIndex + 1) % 6;
                Loading.src = `./images/Subject${imageIndex}.png`
                backgroundOpacity += 0.02;
                Body.style.backgroundColor = `rgba(0, 0, 0, ${backgroundOpacity})`;
                intervalTime *= 0.1;
            },intervalTime)
            setTimeout(()=>{
                Loading.style.display = 'none';
                Body.style.backgroundColor = `rgba(0, 0, 0, 0)`;
                if(items[active] === GiftRef){
                    Gifticon.src = './images/startbucks.png';
                }
                UsagiAudio.pause();
                openDialog();
                clearInterval(interval);
            },3000)
}

window.addEventListener("load", () => {
    gift.init();
});

document.addEventListener('keydown', (e)=> {
    e.preventDefault();
    if (clicked && e.keyCode === 32) {
        handleButton();
    }
    else if(e.keyCode === 39){
        shiftRight();
    }
    else if(e.keyCode === 37){
        shiftLeft();
    }
});

startButton.addEventListener("click", (e) => {
    e.preventDefault();
    handleButton();
})

const openDialog = async() => {
    const dialog = document.querySelector('.Result-Dialog');
    dialog.showModal();
  }

  const closeDialog = async() => {
    try{
        const dialog = document.querySelector('.Result-Dialog');
        clicked = true;
        if(items[active] === GiftRef){
            ArrowContainer.style.display = 'none';
            Again.style.display = 'block';
            dialog.close();
            startButton.textContent = 'Restart'
            Draw();
        }
        else{
            const docRef = window.doc(window.db, 'kiss', 'usagi');
            const value = parseInt(KISS_CNT) + 3;
            await window.updateDoc(docRef, { count: value });
        }
        items[active].remove();
        items = document.querySelectorAll('.cake-image');
        active = parseInt(items.length / 2);
        gift.init();
        dialog.close();
    }
    catch(e){
        console.error(e);
    }
}

const shiftRight = () => {
    active = active + 1 < items.length ? active + 1 : active;
    gift.init();
};

const shiftLeft = () => {
    active = active - 1 >= 0 ? active - 1 : active;
    gift.init();
};

let W = window.innerWidth;
let H = document.getElementById('confetti').clientHeight;
const canvas = document.getElementById('confetti');
const context = canvas.getContext("2d");
const maxConfettis = 25;
const particles = [];

const possibleColors = [
  "#ff7336",
  "#f9e038",
  "#02cca4",
  "#383082",
  "#fed3f5",
  "#b1245a",
  "#f2733f"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;