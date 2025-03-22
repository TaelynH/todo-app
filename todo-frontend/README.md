# Get-er-done: Modern Todo List Application

A beautiful, responsive Todo List application built with Next.js and shadcn/ui that connects to a local JSON file for data persistence.

## Features

- ✨ Add tasks with timestamps
- ✅ Mark tasks as complete with visual strikethrough
- 🗑️ Remove tasks with confirmation dialog
- 💾 Data persistence using local storage
- 🌈 Modern UI with shadcn/ui components
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **UI**: shadcn/ui, Tailwind CSS
- **State Management**: React Hooks
- **Notifications**: Sonner
- **Styling**: Tailwind CSS
- **Fonts**: Geist Sans & Mono

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/get-er-done.git
cd get-er-done
```

2. Install dependencies
```bash
cd todo-frontend
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
todo-frontend/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes
│   │   │   └── tasks/  # Tasks API endpoints
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui components
│   │   └── TodoList.tsx # Main Todo list component
│   ├── lib/            # Utility functions
│   └── types/          # TypeScript type definitions
├── .gitignore
├── components.json     # shadcn/ui config
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Connecting to the CLI Application

This frontend application is designed to work with the Python CLI Todo application, sharing the same `tasks.json` file for data persistence.

## License

This project is licensed under the MIT License.
