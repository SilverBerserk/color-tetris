# 🎮 Color Tetris

A classic **Tetris game** built with **pure TypeScript**, **HTML Canvas**, and **no frameworks**.

---

# ✨ Features

* Pure TypeScript (no libraries)
* Canvas rendering
* Real FPS game loop (`requestAnimationFrame`)
* Collision detection
* Line clearing with highlight animation
* Score system
* Level speed increase
* Next piece preview
* Pause / Resume
* Game Over screen
* Hard drop (Space)

---

# 🎮 Controls

| Key   | Action           |
| ----- | ---------------- |
| ←     | Move Left        |
| →     | Move Right       |
| ↑     | Rotate           |
| ↓     | Rotate (reverse) |
| Space | Hard Drop        |
| Enter | Pause / Resume   |
| R     | Restart          |

---

# 🧠 Game Logic

* Lines increase game speed
* Every **10 lines** increases difficulty
* Full lines are **highlighted** before clearing
* Pieces drop faster as level increases

---

# 🏗️ Project Structure

```
src/
 ├── collision.ts
 ├── draw.ts
 ├── figures.ts
 ├── gameLogic.ts
 ├── settings.ts
 ├── types.ts
 └── main.ts

dist/
index.html
README.md
```

---

# 🚀 Getting Started

## Install dependencies

```bash
npm install
```

---

## Build (using esbuild)

```bash
npm run build
```

---

## Watch mode (development)

```bash
npm run watch
```

---

## Run locally

Use a local server:

```bash
npx serve
```

or

```bash
python -m http.server
```

Then open:

```
http://localhost:3000
```

---

# ⚡ Tech Stack

* TypeScript
* HTML Canvas
* requestAnimationFrame
* esbuild

---

# 🎯 Future Improvements

* Ghost piece
* Hold piece
* Sound effects
* Mobile support
* Touch controls
* Animations
* Leaderboard

---

# 📸 Preview

Classic Tetris gameplay with:

* Smooth controls
* Dynamic speed
* Clean UI

---

