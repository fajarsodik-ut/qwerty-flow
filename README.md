# QwertyFlow - Belajar Mengetik

> A modern, AI-powered typing tutor application built with React, TypeScript, and Vite

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

---

## 📖 Description

QwertyFlow is a modern, minimalist web-based application designed to teach and improve QWERTY keyboard typing skills. The platform focuses on a clean, distraction-free user interface and a structured learning path. It provides real-time feedback, live performance metrics (WPM and Accuracy), detailed summaries after each lesson, and personalized certificates upon completion. The core experience is broken down into three distinct difficulty levels—Mudah (Easy), Sedang (Medium), and Sulit (Hard)—catering to users from absolute beginners to those looking to master advanced symbols and numbers.

Whether you''re a complete beginner or looking to improve your typing speed and accuracy, QwertyFlow offers an engaging, gamified learning experience with progress tracking, celebration animations, and achievement certificates.

---

## 🛠️ Technologies Used

This project leverages modern web technologies to deliver a fast, responsive, and delightful user experience:

| Technology                                                           | Purpose                                                                    |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **[React](https://react.dev/)**                                      | UI library for building interactive components                             |
| **[TypeScript](https://www.typescriptlang.org/)**                    | Type-safe JavaScript for better code quality                               |
| **[Vite](https://vitejs.dev/)**                                      | Lightning-fast build tool and dev server                                   |
| **[Zustand](https://zustand-demo.pmnd.rs/)**                         | Lightweight state management for lesson state and progress                 |
| **[Tailwind CSS](https://tailwindcss.com/)**                         | Utility-first CSS framework for styling                                    |
| **[shadcn/ui](https://ui.shadcn.com/)**                              | Beautiful, accessible UI components (Dialog, AlertDialog, Button, Card)    |
| **[Radix UI](https://www.radix-ui.com/)**                            | Unstyled, accessible component primitives (Dialog, Tabs)                   |
| **[Lucide React](https://lucide.dev/)**                              | Beautiful icon library for UI elements                                     |
| **[Framer Motion](https://www.framer.com/motion/)**                  | Production-ready animation library for smooth transitions and celebrations |
| **[canvas-confetti](https://www.npmjs.com/package/canvas-confetti)** | Celebration confetti effects on level completion                           |
| **[React Router](https://reactrouter.com/)**                         | Client-side routing for navigation                                         |
| **[date-fns](https://date-fns.org/)**                                | Date formatting utility for certificates                                   |
| **[Bun](https://bun.sh/)**                                           | Fast JavaScript runtime and package manager                                |
| **[Netlify](https://www.netlify.com/)**                              | Modern web hosting and deployment                                          |

### Core Feature Libraries

#### Virtual Keyboard System

| Library/Technology           | Usage                                                                    |
| ---------------------------- | ------------------------------------------------------------------------ |
| **React useState**           | Managing keyboard state and active key highlighting                      |
| **JavaScript KeyboardEvent** | Detecting real keyboard input and syncing with virtual keyboard          |
| **Tailwind CSS**             | Styling keyboard keys with color-coded finger guides                     |
| **CSS Grid & Flexbox**       | Responsive keyboard layout that adapts to screen size                    |
| **Custom Key Mapping**       | Mapping physical keyboard keys to virtual keyboard visual representation |

#### Certificate Generation System

| Library/Technology                | Usage                                                        |
| --------------------------------- | ------------------------------------------------------------ |
| **Radix UI Dialog**               | Modal component for certificate input and preview            |
| **window.open()**                 | Opening standalone window for PDF generation                 |
| **Inline CSS Styles**             | Preserving certificate design when printing to PDF           |
| **Google Fonts (Dancing Script)** | Elegant cursive font for certificate names                   |
| **Browser Print API**             | Native browser printing functionality for PDF export         |
| **LocalStorage**                  | Storing and retrieving user performance data (WPM, accuracy) |

---

## ✨ Features

### Core Typing Features

- ⌨️ **Real-time Feedback**: Instant visual cues for correct (green) and incorrect (red) keystrokes
- 📊 **Live Performance Metrics**: Track your Words Per Minute (WPM) and Accuracy as you type
- 🎯 **Visual On-Screen Keyboard**: Interactive keyboard that highlights the next key to press with finger guides
- 📈 **Post-Lesson Reports**: Detailed summaries after each lesson, including final stats and a list of your most challenging keys

### Learning Path & Progress

- 📚 **Structured Lesson Plan**: Three difficulty levels with 5 lessons each:
  - **Mudah (Easy)**: Home row keys and basic characters
  - **Sedang (Medium)**: All letters and common punctuation
  - **Sulit (Hard)**: Numbers, symbols, and advanced characters
- ✅ **Progress Tracking**: Visual checkmarks showing completed lessons
- 📍 **Progress Indicators**: Dots on certificate button showing lesson completion status

### Achievements & Motivation

- 🏆 **Certificate Generation**: Earn personalized certificates with your actual performance stats (mean WPM & accuracy) after completing all lessons in each level
- 🎉 **Celebration Animations**: Confetti celebration and congratulations popup when completing all lessons in a level
- 🚀 **Level Navigation**: Smart navigation buttons to progress seamlessly from Mudah → Sedang → Sulit levels
- 💾 **Local Storage**: Your progress is saved automatically and persists across sessions

### User Experience

- 🎨 **Minimalist & Responsive Design**: Clean, beautiful, and distraction-free interface that works flawlessly on desktop, tablet, and mobile devices
- 🌓 **Dark Mode Support**: Toggle between light and dark themes for comfortable typing in any lighting condition
- 🔒 **No Accounts Required**: Jump right into a lesson without the friction of signing up
- ⚡ **Lightning Fast**: Built with Vite for instant hot module reload and optimized production builds

---

## 🚀 Setup Instructions

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine. If you don''t have it:

```bash
# On Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# On macOS/Linux
curl -fsSL https://bun.sh/install | bash
```

### Installation Steps

1. **Clone the repository** to your local machine:

   ```bash
   git clone https://github.com/fajarsodik-ut/qwerty-flow.git
   ```

2. **Navigate** into the project directory:

   ```bash
   cd qwerty-flow
   ```

3. **Install dependencies** using Bun:

   ```bash
   bun install
   ```

4. **Start the development server**:

   ```bash
   bun run dev
   ```

5. **Open your browser** and visit:
   ```
   http://localhost:3000
   ```

The application will be running with hot module reload enabled. Any changes you make to the code will be reflected instantly in the browser! 🔥

### Available Scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `bun run dev`     | Starts the development server with HMR        |
| `bun run build`   | Creates optimized production build in `dist/` |
| `bun run preview` | Preview the production build locally          |
| `bun run lint`    | Lints the codebase to check for errors        |

---

## 🤖 AI Support Explanation

This project was developed with significant assistance from **AI tools** (GitHub Copilot and IBM Granite) to accelerate development and ensure best practices. Here''s how AI contributed to this project:

### AI-Assisted Development Process

#### 1. **Code Generation & Architecture**

- AI helped scaffold the initial React + TypeScript project structure
- Generated boilerplate code for components, state management, and routing
- Suggested optimal file organization and naming conventions
- Created TypeScript interfaces and types for type safety

#### 2. **Feature Implementation**

- **Certificate System**: AI assisted in designing the certificate generation logic, including:
  - PDF printing functionality using standalone window approach
  - Performance stats calculation (mean WPM and accuracy)
  - Certificate design with inline styles for print preservation
- **Progress Tracking**: AI helped implement:
  - LocalStorage-based progress persistence
  - Visual progress indicators with checkmarks
  - SessionStorage for one-time celebration popups
- **Animation & UX**: AI suggested and implemented:
  - Confetti effects using canvas-confetti
  - Framer Motion animations for smooth transitions
  - Congratulations popup with celebration timing

#### 3. **Problem Solving & Debugging**

- **Input Field Issue**: AI diagnosed that the global keyboard handler was preventing text input in modal fields and provided the fix to detect and skip INPUT/TEXTAREA elements
- **PDF Printing Bug**: AI identified that React Dialog portals interfere with browser print functionality and suggested the standalone HTML window solution
- **State Management**: AI helped optimize Zustand store structure and prevent unnecessary re-renders

#### 4. **Code Quality & Best Practices**

- AI suggested accessibility improvements using Radix UI primitives
- Recommended responsive design patterns with Tailwind CSS
- Helped implement proper TypeScript typing throughout the codebase
- Suggested code splitting and lazy loading strategies

#### 5. **Documentation**

- AI assisted in writing comprehensive code comments
- Generated this detailed README with proper markdown formatting
- Created clear commit messages following conventional commits standard

### What AI Did NOT Do

- **Design Decisions**: All UX/UI design choices, color schemes, and user flow were human-directed
- **Business Logic**: The typing lesson structure, difficulty progression, and scoring algorithms were designed by the developer
- **Creative Content**: Lesson texts, certificate wording, and user-facing copy were human-created
- **Testing & Validation**: All features were manually tested and validated by the developer

### Learning & Collaboration

This project demonstrates effective **human-AI collaboration** where:

- 🧠 **Human provides**: Vision, requirements, creative decisions, testing
- 🤖 **AI provides**: Code implementation, best practices, problem-solving, optimization
- 🤝 **Result**: Faster development without sacrificing quality or learning

The AI served as an **intelligent pair programming partner**, allowing the developer to focus on high-level architecture and user experience while accelerating the implementation of technical details.

---

## 🖥️ Usage

### Getting Started

1. Launch the application at `http://localhost:3000`
2. Click **"Mulai Berlatih"** to start practicing

### Learning Flow

1. **Select a Level**: Choose between ''Mudah'' (Easy), ''Sedang'' (Medium), or ''Sulit'' (Hard) using the tabs at the top
2. **Choose a Lesson**: Click on one of the 5 lessons in your selected difficulty level
3. **Start Typing**: Begin typing the text shown in the prompt area
4. **Get Feedback**: Watch the real-time feedback on your input and the visual keyboard
5. **Track Progress**: Complete lessons to earn checkmarks and see your progress indicators
6. **Review Results**: Once you complete a lesson, a performance report will appear with your stats
7. **Generate Certificate**: After completing all 5 lessons in a level, click the certificate button to generate your personalized certificate with your mean WPM and accuracy
8. **Celebrate & Progress**: Enjoy the confetti celebration and use the navigation buttons to advance to the next difficulty level
9. **Practice Again**: Continue improving your typing skills across all difficulty levels

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the application, please feel free to open an issue or submit a pull request.

### How to Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m ''feat: Add some AmazingFeature''`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ☁️ Deployment

This project is optimized for deployment on **Netlify**.

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repository
5. Configure build settings:
   - **Build command**: `bun run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

Your site will be automatically deployed and you''ll get a live URL! Any pushes to the main branch will trigger automatic redeployment.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## 👨‍💻 Author

**Fajar Sodik**

- GitHub: [@fajarsodik-ut](https://github.com/fajarsodik-ut)
- Repository: [qwerty-flow](https://github.com/fajarsodik-ut/qwerty-flow)

---

## 🙏 Acknowledgments

- Built with assistance from **IBM Granite** and **GitHub Copilot**
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

<div align="center">
  
**⌨️ Happy Typing! ⌨️**

Made with ❤️ and AI assistance

</div>
