const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const grid = 20;
let snake = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 },
];

let food = { x: 0, y: 0 };
let dx = grid;
let dy = 0;
let score = 0;
let gameSpeed = 200; // Changed initial speed to be slower (200ms instead of 100ms)

let gameInterval;
let isGameRunning = false;
let isPaused = false;

// Remove start and pause button variables
const restartBtn = document.getElementById("restartBtn");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("finalScore");
const gameOverElement = document.getElementById("gameOver");
const speedValueElement = document.getElementById("speedValue");
let snakeColor = "#A664F0"; // Default snake color

// Add new variables for user management
const registerBtn = document.getElementById("registerBtn");
const registerModal = document.getElementById("registerModal");
const registerForm = document.getElementById("registerForm");
const cancelRegisterBtn = document.getElementById("cancelRegister");
const playerNameDisplay = document.getElementById("playerName");
const topScoresList = document.getElementById("topScores");

// Add these constants with the other DOM element references
const logoutBtn = document.getElementById("logoutBtn");

let currentPlayer = {
  name: "Guest",
  email: "",
};

// Add new variables after existing ones
const settingsModal = document.getElementById("settingsModal");
const themeToggle = document.getElementById("themeToggle");
const snakeColorSetting = document.getElementById("snakeColorSetting");
const randomFoodColor = document.getElementById("randomFoodColor");
const saveSettingsBtn = document.getElementById("saveSettings");
const cancelSettingsBtn = document.getElementById("cancelSettings");

let isRandomFoodColor = true;
let currentTheme = "dark";

function updateScore() {
  scoreElement.textContent = score;
}

// Load player data from localStorage
function loadPlayerData() {
  const savedPlayer = localStorage.getItem("snakeGamePlayer");
  if (savedPlayer) {
    currentPlayer = JSON.parse(savedPlayer);
    playerNameDisplay.textContent = currentPlayer.name;
    registerBtn.children[1].textContent = "Change Player";
    logoutBtn.classList.add("show"); // Show logout button
  } else {
    logoutBtn.classList.remove("show"); // Hide logout button
  }
}

// Add email service configuration
// Initialize EmailJS with your public key
const EMaILJS_SERVICE_ID = "service_t2zrezb";
const EMaILJS_TEMPLATE_ID = "template_353h0bl";
emailjs.init("XniLtAYTZ51w9T7Zt"); // Replace with your EmailJS public key

async function sendScoreEmail(playerData, score) {
  const templateParams = {
    to_email: playerData.email,
    to_name: playerData.name,
    score: score,
  };

  try {
    await emailjs.send(EMaILJS_SERVICE_ID, EMaILJS_TEMPLATE_ID, templateParams);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Save score to rankings
function saveScore(score) {
  const scores = JSON.parse(localStorage.getItem("snakeGameScores") || "[]");

  // Check if player already has a score
  const existingScoreIndex = scores.findIndex(
    (s) => s.email === currentPlayer.email
  );

  if (existingScoreIndex !== -1) {
    // Update score if new score is higher
    if (score > scores[existingScoreIndex].score) {
      scores[existingScoreIndex].score = score;
      scores[existingScoreIndex].date = new Date().toISOString();
      // Send email about new high score
      sendScoreEmail(currentPlayer, score);
    }
  } else {
    // Add new score and send welcome email
    scores.push({
      name: currentPlayer.name,
      email: currentPlayer.email,
      score: score,
      date: new Date().toISOString(),
    });
    sendScoreEmail(currentPlayer, score);
  }

  // Sort and save top scores
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 10);
  localStorage.setItem("snakeGameScores", JSON.stringify(topScores));
  displayTopScores();
}

// Display top scores
function displayTopScores() {
  const scores = JSON.parse(localStorage.getItem("snakeGameScores") || "[]");
  if (scores.length === 0) {
    topScoresList.innerHTML =
      '<li class="no-scores">Play and register to be the first on the leaderboard!</li>';
    return;
  }

  topScoresList.innerHTML = scores
    .map((score, index) => {
      const date = new Date(score.date);
      const formattedDate = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const rank =
        index === 0
          ? "🏆"
          : index === 1
          ? "🥈"
          : index === 2
          ? "🥉"
          : `${index + 1}.`;

      return `
        <li class="score-item ${index < 3 ? "top-three" : ""}">
          <span class="rank" title="rank ${index + 1}">${rank}</span>
          <span class="player-name" title="${score.name}">${score.name}</span>
          <span class="score-value" title="score">${score.score.toLocaleString()}</span>
          <span class="date" title="date">${formattedDate}</span>
        </li>
      `;
    })
    .join("");
}

// Show game over and save score
function showGameOver() {
  finalScoreElement.textContent = score;
  if (currentPlayer.name !== "Guest" && score > 0) {
    saveScore(score);
  }
  gameOverElement.classList.add("active");
}

function hideGameOver() {
  gameOverElement.classList.remove("active");
}

function calculateSpeed() {
  // Start slower and gradually increase speed
  // Maximum speed will now be 60ms (faster) and minimum speed 200ms (slower)
  return Math.max(60, 200 - Math.floor(score / 50) * 10);
}

function updateSpeedDisplay() {
  const speedMultiplier = (100 / gameSpeed).toFixed(1);
  speedValueElement.textContent = speedMultiplier;
}

function resetGame() {
  snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 },
  ];
  dx = grid;
  dy = 0;
  score = 0;
  gameSpeed = 200; // Reset to slower initial speed
  updateScore();
  generateFood();
  hideGameOver();
  updateSpeedDisplay();
}

function startGame() {
  if (!isGameRunning) {
    isGameRunning = true;
    hideGameOver();
    resetGame();
    gameInterval = setInterval(gameLoop, gameSpeed);
  }
}

function pauseGame() {
  if (isGameRunning) {
    if (isPaused) {
      gameInterval = setInterval(gameLoop, gameSpeed);
      isPaused = false;
    } else {
      clearInterval(gameInterval);
      isPaused = true;
    }
  }
}

// Add this new variable near the top of the file
let currentFoodColor;

// Modify the generateFood function
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
  food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;

  const foodColors = ["#ff6b6b", "#ffd93d", "#00d2d3", "#ff9ff3", "#54a0ff"];
  currentFoodColor = isRandomFoodColor
    ? foodColors[Math.floor(Math.random() * foodColors.length)]
    : foodColors[foodColors.length - 1];
}

// Update the drawFood function
function drawFood() {
  ctx.save();

  const gradient = ctx.createRadialGradient(
    food.x + grid / 2,
    food.y + grid / 2,
    2,
    food.x + grid / 2,
    food.y + grid / 2,
    grid / 2
  );
  gradient.addColorStop(0, currentFoodColor);
  gradient.addColorStop(1, adjustColor(currentFoodColor, -30));

  ctx.fillStyle = gradient;
  ctx.shadowColor = currentFoodColor;
  ctx.shadowBlur = 10;

  // Draw food as a circle with pulse animation
  const time = Date.now() / 1000;
  const scale = 1 + Math.sin(time * 4) * 0.1;
  const size = (grid - 2) * scale;

  ctx.beginPath();
  ctx.arc(food.x + grid / 2, food.y + grid / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.save();

    // Create gradient for snake segment
    const gradient = ctx.createLinearGradient(
      segment.x,
      segment.y,
      segment.x + grid,
      segment.y + grid
    );
    gradient.addColorStop(0, snakeColor);
    gradient.addColorStop(1, adjustColor(snakeColor, 30));

    // Draw rounded rectangle for each segment
    ctx.fillStyle = gradient;
    ctx.shadowColor = snakeColor;
    ctx.shadowBlur = 10;

    if (index === 0) {
      // Draw head
      drawRoundedRect(ctx, segment.x, segment.y, grid - 2, grid - 2, 8);

      // Draw eyes
      ctx.fillStyle = "#fff";
      const eyeSize = 4;
      const eyeOffset = dx !== 0 ? 6 : 4;
      ctx.fillRect(segment.x + eyeOffset, segment.y + 4, eyeSize, eyeSize);
      ctx.fillRect(
        segment.x + eyeOffset,
        segment.y + grid - 8,
        eyeSize,
        eyeSize
      );
    } else {
      // Draw body segment
      drawRoundedRect(ctx, segment.x, segment.y, grid - 2, grid - 2, 6);
    }

    ctx.restore();
  });
}

// Helper function to draw rounded rectangles
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
  return color.replace(/[\da-f]{2}/gi, (h) => {
    const num = parseInt(h, 16);
    const adj = Math.max(0, Math.min(255, num + amount));
    return adj.toString(16).padStart(2, "0");
  });
}

// Modify the moveSnake function
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    generateFood(); // This will now also change the food color
    score += 10;
    updateScore();

    // Update game speed every 100 points (10 food items)
    const newSpeed = calculateSpeed();
    if (newSpeed !== gameSpeed) {
      gameSpeed = newSpeed;
      clearInterval(gameInterval);
      gameInterval = setInterval(gameLoop, gameSpeed);
      updateSpeedDisplay();
    }
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Update keydown event listener
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent page scrolling
    if (!isGameRunning) {
      startGame();
    } else {
      pauseGame();
    }
    return;
  }

  // Only process movement keys if game is running and not paused
  if (!isGameRunning || isPaused) return;

  switch (event.key.toLowerCase()) {
    case "arrowup":
    case "w":
      if (dy === 0) {
        dx = 0;
        dy = -grid;
      }
      break;
    case "arrowdown":
    case "s":
      if (dy === 0) {
        dx = 0;
        dy = grid;
      }
      break;
    case "arrowleft":
    case "a":
      if (dx === 0) {
        dx = -grid;
        dy = 0;
      }
      break;
    case "arrowright":
    case "d":
      if (dx === 0) {
        dx = grid;
        dy = 0;
      }
      break;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveSnake();
  if (checkCollision()) {
    clearInterval(gameInterval);
    isGameRunning = false;
    showGameOver();
    return;
  }

  drawFood();
  drawSnake();
}

// Remove start and pause button event listeners
restartBtn.addEventListener("click", () => {
  isGameRunning = false;
  startGame();
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentPlayer = {
    name: registerForm.name.value,
    email: registerForm.email.value,
  };
  localStorage.setItem("snakeGamePlayer", JSON.stringify(currentPlayer));
  playerNameDisplay.textContent = currentPlayer.name;
  registerModal.classList.remove("active");
  registerBtn.children[1].textContent = "Change Player";
  logoutBtn.classList.add("show"); // Show logout button
});

registerBtn.addEventListener("click", () => {
  registerModal.classList.add("active");
  dropdown.classList.remove("active");
});

cancelRegisterBtn.addEventListener("click", () => {
  registerModal.classList.remove("active");
});

// Add this function with the other user management functions
function logout() {
  currentPlayer = {
    name: "Guest",
    email: "",
  };
  playerNameDisplay.textContent = currentPlayer.name;
  localStorage.removeItem("snakeGamePlayer");
  registerBtn.children[1].textContent = "Register";
  logoutBtn.classList.remove("show"); // Hide logout button
  dropdown.classList.remove("active");
}

// Add this event listener with the other event listeners
logoutBtn.addEventListener("click", logout);

// Initialize player data
loadPlayerData();

generateFood();
updateSpeedDisplay();
displayTopScores();

// Add dropdown functionality
const dropdownTrigger = document.querySelector(".dropdown-trigger");
const dropdown = document.querySelector(".dropdown");

dropdownTrigger.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});

// Update settings button functionality
const settingsBtn = document.getElementById("settingsBtn");

settingsBtn.addEventListener("click", () => {
  console.log("Settings clicked"); // Debug log
  dropdown.classList.remove("active");
  settingsModal.classList.add("active");

  // Update settings form with current values
  themeToggle.checked = currentTheme === "light";
  snakeColorSetting.value = snakeColor;
  randomFoodColor.checked = isRandomFoodColor;
});

// Make sure modal can be closed
settingsModal.addEventListener("click", (e) => {
  if (e.target === settingsModal) {
    settingsModal.classList.remove("active");
  }
});

// Update save settings handler
saveSettingsBtn.addEventListener("click", () => {
  currentTheme = themeToggle.checked ? "light" : "dark";
  snakeColor = snakeColorSetting.value;
  isRandomFoodColor = randomFoodColor.checked ? true : false;
  saveSettings();
  applyTheme();
  settingsModal.classList.remove("active");
});

// Update cancel settings handler
cancelSettingsBtn.addEventListener("click", () => {
  settingsModal.classList.remove("active");
});

// Add settings functions
function loadSettings() {
  const settings = JSON.parse(
    localStorage.getItem("snakeGameSettings") || "{}"
  );
  currentTheme = settings.theme || "dark";
  snakeColor = settings.snakeColor || "#A664F0";
  isRandomFoodColor = settings.isRandomFoodColor;
  themeToggle.checked = currentTheme === "light";
  snakeColorSetting.value = snakeColor;

  applyTheme();
}

function saveSettings() {
  const settings = {
    theme: currentTheme,
    snakeColor: snakeColorSetting.value,
    isRandomFoodColor: isRandomFoodColor,
  };
  localStorage.setItem("snakeGameSettings", JSON.stringify(settings));
}

function applyTheme() {
  document.body.classList.toggle("light-theme", currentTheme === "light");
}

// Add to initialization
loadSettings();

// Add these variables after other variables declarations
let touchStartX = 0;
let touchStartY = 0;
const MIN_SWIPE_DISTANCE = 30;

// Add these touch event listeners after other event listeners
canvas.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  },
  false
);

canvas.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault(); // Prevent scrolling while playing
  },
  false
);

canvas.addEventListener(
  "touchend",
  (e) => {
    if (!isGameRunning || isPaused) {
      startGame();
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Determine if the swipe was primarily horizontal or vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) >= MIN_SWIPE_DISTANCE) {
        if (deltaX > 0 && dx === 0) {
          // Right swipe
          dx = grid;
          dy = 0;
        } else if (deltaX < 0 && dx === 0) {
          // Left swipe
          dx = -grid;
          dy = 0;
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) >= MIN_SWIPE_DISTANCE) {
        if (deltaY > 0 && dy === 0) {
          // Down swipe
          dx = 0;
          dy = grid;
        } else if (deltaY < 0 && dy === 0) {
          // Up swipe
          dx = 0;
          dy = -grid;
        }
      }
    }
  },
  false
);
