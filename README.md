# QwertyFlow: A Minimalist Typing Tutor

[cloudflarebutton]

QwertyFlow is a modern, minimalist web-based application designed to teach and improve QWERTY keyboard typing skills. The platform focuses on a clean, distraction-free user interface and a structured learning path. It provides real-time feedback, live performance metrics (WPM and Accuracy), and a detailed summary after each lesson. The core experience is broken down into three distinct difficulty levels—Easy, Medium, and Hard—catering to users from absolute beginners to those looking to master advanced symbols and numbers.

## ✨ Key Features

-   **Real-time Feedback**: Instant visual cues for correct (green) and incorrect (red) keystrokes.
-   **Live Performance Metrics**: Track your Words Per Minute (WPM) and Accuracy as you type.
-   **Structured Lesson Plan**: Three difficulty levels (Easy, Medium, Hard) to guide you from the home row to full keyboard mastery.
-   **Visual On-Screen Keyboard**: An interactive keyboard that highlights the next key to press and provides finger guides.
-   **Post-Lesson Reports**: Detailed summaries after each lesson, including final stats and a list of your most challenging keys.
-   **Minimalist & Responsive Design**: A clean, beautiful, and distraction-free interface that works flawlessly on desktop, tablet, and mobile devices.
-   **No Accounts Required**: Jump right into a lesson without the friction of signing up.

## 🛠️ Technology Stack

-   **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/)
-   **Deployment**: [Cloudflare Pages & Workers](https://workers.cloudflare.com/)

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/qwertyflow.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd qwertyflow
    ```
3.  Install the dependencies using Bun:
    ```bash
    bun install
    ```

### Running the Development Server

To start the local development server, run the following command:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

## 🖥️ Usage

Upon launching the application, you are immediately presented with the typing arena.

1.  **Select a Level**: Choose between 'Easy', 'Medium', or 'Hard' using the tabs at the top.
2.  **Start Typing**: Begin typing the text shown in the prompt area.
3.  **Get Feedback**: Watch the real-time feedback on your input and the visual keyboard.
4.  **Review Results**: Once you complete a lesson, a performance report will appear with your stats.
5.  **Practice Again**: Close the report to select a new lesson or retry the current one.

## ⚙️ Available Scripts

-   `bun run dev`: Starts the development server.
-   `bun run build`: Creates a production-ready build of the application.
-   `bun run lint`: Lints the codebase to check for errors.
-   `bun run deploy`: Deploys the application to Cloudflare.

## ☁️ Deployment

This project is optimized for deployment on the Cloudflare network.

### Deploy with a Click

You can deploy your own version of this project with a single click.

[cloudflarebutton]

### Manual Deployment via Wrangler

1.  Log in to Wrangler:
    ```bash
    bunx wrangler login
    ```
2.  Run the deployment script from the project's root directory:
    ```bash
    bun run deploy
    ```
    Wrangler will handle the build process and deploy your application to Cloudflare Pages.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the application, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.