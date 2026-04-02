# Color Tetris 🎮

A modern **Color Tetris** game built using **TypeScript**, **Canvas API**, and **Vite**.
This version includes smooth animations, scoring system, next piece preview, speed scaling, and pause/game over states.

---

## ✨ Features

* 🎮 Classic Tetris gameplay
* 🎨 Color-based line matching
* ⚡ Speed increases with progress
* 🔮 Next figure preview
* 📊 Score, lines and speed stats
* ⏸ Pause / Resume
* 🔄 Restart game
* 💥 Game over screen
* 🧠 Smart collision detection
* 🎯 Smooth animations using `requestAnimationFrame`

---

## 🕹 Controls

| Key   | Action                   |
| ----- | ------------------------ |
| ←     | Move left                |
| →     | Move right               |
| ↑     | Rotate clockwise         |
| ↓     | Rotate counter-clockwise |
| Space | Hard drop                |
| Enter | Pause / Resume           |
| R     | Restart game             |

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build project

```bash
npm run build
```

---

## 🧠 Game Logic Overview

### Core Systems

* **Game Loop** — `requestAnimationFrame`
* **Collision Detection** — `checkCollision`
* **Line Matching** — `checkConnection`
* **Cleanup Animation** — `cleanUp`
* **Figure Rotation** — `spinFigure`
* **Figure Locking** — `pinFigure`

---

## 📁 Project Structure

```
src/
├── colors.ts        # Colors for figures and screen
├── draw.ts          # Canvas drawing functions
├── figures.ts       # Tetris shapes & random generator
├── gameLogic.ts     # Game logic and collision
├── main.ts          # Main game loop
├── settings.ts      # Constants & configuration
```

---

## 📊 Game Stats

The game tracks:

* **Next** — upcoming figure
* **Speed** — increases every 20 lines
* **Lines** — cleared lines
* **Score** — based on matched colors

---

## ⚡ Speed System

Game becomes faster every **20 cleared lines**.

---

## 🎨 Rendering

Canvas rendering is split into:

* `drawCanvas` — static board
* `drawField` — grid
* `drawFigure` — active piece
* `drawNextFigure` — preview
* `drawStats` — labels
* `drawStatsValues` — dynamic values
* `drawPause` — pause screen
* `drawGameOver` — game over screen

---

## 🛠 Tech Stack

* TypeScript
* Canvas API
* Vite
* ES Modules

---

## 🎯 Future Ideas

* Sound effects
* Mobile controls
* High score system
* Animations
* Ghost piece
* Hold piece

---

## 🧑‍💻 Author

Color Tetris — Built for learning and fun 🎮
