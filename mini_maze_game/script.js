const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tileSize = 50; // 250px canvas / 5 tiles = 50px per tile
const maze = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 0, 1, 0],
  [0, 0, 0, 0, 2], // 2 = goal
];

let player = { x: 0, y: 0 }; // starting position (top-left)

// Draw the maze
function drawMaze() {
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      if (maze[y][x] === 1) {
        ctx.fillStyle = "blue"; // wall
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      } else if (maze[y][x] === 2) {
        ctx.fillStyle = "green"; // goal
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }
}

// Draw the player
function drawPlayer() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    player.x * tileSize + tileSize / 2,
    player.y * tileSize + tileSize / 2,
    tileSize / 3,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

// Update the game
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawPlayer();
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  let newX = player.x;
  let newY = player.y;

  if (e.key === "ArrowUp") newY--;
  if (e.key === "ArrowDown") newY++;
  if (e.key === "ArrowLeft") newX--;
  if (e.key === "ArrowRight") newX++;

  // Check boundaries and walls
  if (
    newX >= 0 &&
    newX < 5 &&
    newY >= 0 &&
    newY < 5 &&
    maze[newY][newX] !== 1
  ) {
    player.x = newX;
    player.y = newY;
  }

  // Check goal
  if (maze[player.y][player.x] === 2) {
    alert("You win!");
    player = { x: 0, y: 0 }; // reset
  }

  update();
});

// Initial draw
update();
