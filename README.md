# TaskMaster 🏔️

A minimalist todo app with integrated Pomodoro timer featuring stunning mountain scenery. Built with React and Vite for a smooth, productive experience.

## ✨ Features

### 📝 Todo Management
- **Add Tasks**: Create tasks with subjects/categories
- **Task Organization**: Filter tasks by subject
- **Mark Complete**: Check off completed tasks
- **Delete Tasks**: Remove tasks you no longer need
- **Persistent Storage**: All tasks saved in browser localStorage

### 📱 View Options
- **List View**: Traditional vertical task layout
- **Grid View**: Card-based task display
- **Subject Filtering**: View tasks by category

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TaskMaster
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Pomodoro Technique
1. Click on **FOCUS** to start a 25-minute work session
2. Use **START** to begin the timer
3. Work on your tasks until the timer completes
4. Take a **SHORT BREAK** (5 minutes) or **LONG BREAK** (15 minutes)
5. Repeat the cycle for maximum productivity


## 🛠️ Built With

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool and dev server
- **CSS3** - Custom styling with glassmorphism effects
- **localStorage** - Browser storage for data persistence

## 📂 Project Structure

```
TaskMaster/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🎨 Customization

### Changing Background Image
Update the background URL in `App.css`:

```css
.app {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)),
              url('your-image-url-here') center/cover no-repeat;
}
```


## 🌟 Acknowledgments

- Mountain photography from Unsplash
- Inspired by the Pomodoro Technique by Francesco Cirillo
- Modern glassmorphism design trends

---

**Happy Productivity!** 🚀✨
