const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const pointsDiv = document.getElementById("points");
const ctx = canvas.getContext("2d");
const click = document.getElementById("all")
const start = document.getElementById("Start")
const score = document.getElementById("Score")
const high = document.getElementById("High")
pointsDiv.style.display = "none"
score.style.display = "none"
const playermodel = new Image();
playermodel.src =
  "https://cdn.glitch.com/03ffbf34-8768-44ab-965d-074d06ad9eda%2Fplaceholderr.png?v=1572555195985";

let game = {
  gravity: 1.4,
  points: 0
};
if(localStorage.getItem("Highscore") == null) localStorage.setItem("Highscore", 0)
high.innerHTML = `Highscore: ${localStorage.getItem("Highscore")}`;
let player = {
  jumping: false,
  x: 120,
  y: canvas.height - 350,
  height: 250,
  width: 150,
  yspeed: -30,
  reset() {
    this.jumping = false;
    this.x = 120;
    this.y = canvas.height - 250;
    this.height = 250;
    this.width = 150;
    this.yspeed = -30;
  },
  jump() {
    player.yspeed += game.gravity;
    player.y += player.yspeed;
    if (this.y > canvas.height - this.height) {
      this.reset();
    }
  }
};

let count = 0;
let cactusArr = [];

function action() {
  let loop = window.requestAnimationFrame(action);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  count++;

  if (count % 120 == 0) {
    cactusArr.push(new cactus());
  }

  for (cact of cactusArr) {
    if (
      cact.x < player.x + player.width &&
      cact.x + cact.width > player.x &&
      cact.y < player.y + player.height &&
      cact.y + cact.height > player.y
    ) {
      window.cancelAnimationFrame(loop);
      start.style.display = 'block';
      cactusArr = [];
      player.reset();
      pointsDiv.style.display="none";
      score.style.display = "block";
      score.innerHTML = `Score: ${game.points}`;
      if(localStorage.getItem("Highscore") < game.points) {
        localStorage.setItem("Highscore", game.points)
      }
      high.innerHTML = `Highscore: ${localStorage.getItem("Highscore")}`;
      
      game.points = 0;
      pointsDiv.innerHTML = game.points;
      high.style.display = "block";
    }
    if (cact.x > -150) {
      cact.show();
      cact.move();
    } else {
      cactusArr.shift(0);
    }
  }

  ctx.fillRect(player.x, player.y, player.width, player.height);

  if (player.jumping == true) {
    player.jump();
  }
}
click.addEventListener("click", () => {player.jumping = true});
document.onkeydown = e => {
  if (e.key == " " || e.key == "w") {
    player.jumping = true;
  }
};

start.addEventListener("click", ()=>{action(); pointsDiv.style.display="block"; start.style.display="none";score.style.display = "none"; high.style.display = "none"})