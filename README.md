# Get-er-done: Modern Todo List Application

A full-stack Todo List application with both a beautiful React frontend and a Python CLI interface, sharing data through a common JSON file.


## Features

- ✨ Add tasks with timestamps
- ✅ Mark tasks as complete with visual strikethrough
- 🗑️ Remove tasks with confirmation dialog
- 💾 Data persistence using local storage (tasks.json)
- 🌈 Modern UI with shadcn/ui components
- 📱 Fully responsive web interface
- 🖥️ Command-line interface for terminal lovers

## Project Overview

This project consists of two main components:

1. **Frontend Application**: A Next.js-based web application with a modern UI
2. **CLI Application**: A Python command-line interface for managing tasks

Both applications share the same `tasks.json` file for data persistence, allowing you to switch between interfaces seamlessly.

## Tech Stack

### Frontend
- **Framework**: Next.js 14, React 19, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **State Management**: React Hooks
- **Notifications**: Sonner
- **Styling**: Tailwind CSS
- **Fonts**: Geist Sans & Mono

### Backend
- **CLI**: Python 3
- **Terminal UI**: Colorama for colored output
- **Data Storage**: JSON file

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Python 3.6 or later
- npm or yarn

### Installation

#### Frontend Setup

1. Install dependencies
```bash
cd todo-frontend
npm install
```

2. Run the development server
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

#### CLI Setup

1. Install required Python packages
```bash
pip install colorama
```

2. Run the CLI application
```bash
python todo_cli.py
```

## Project Structure

```
todo-app/
├── todo-frontend/       # Next.js frontend application
│   ├── public/          # Static assets
│   ├── src/             # Source code
│   │   ├── app/         # Next.js App Router
│   │   ├── components/  # React components
│   │   ├── lib/         # Utility functions
│   │   └── types/       # TypeScript type definitions
│   ├── package.json     # Dependencies
│   └── README.md        # Frontend-specific documentation
│
├── todo_cli.py          # Python CLI application
├── tasks.json           # Shared data file
└── README.md            # This file
```

## Usage

### Web Interface

The web interface provides a clean, intuitive way to manage your tasks:

- Add new tasks using the input field
- Click on a task to mark it as complete
- Click the trash icon to delete a task
- View task completion status and timestamps

### CLI Interface

The CLI offers the following commands:

1. **Add a task**: Enter task description
2. **View tasks**: See all tasks with their status
3. **Mark a task as complete**: Select a task by number
4. **Remove a task**: Select a task by number
5. **Save and exit**: Save changes and close the application

## Data Synchronization

Both the web and CLI interfaces read from and write to the same `tasks.json` file. This ensures your tasks are always in sync regardless of which interface you use.

To see changes made in one interface reflected in the other:
- **Web → CLI**: Refresh the page after making changes in the CLI
- **CLI → Web**: No action needed; changes appear automatically when you return to the web page

## Development

### Frontend Development

```bash
cd todo-frontend
npm run dev  # Start development server
npm run build  # Build for production
npm run lint  # Run linting
```

### CLI Development

The `todo_cli.py` file contains all CLI functionality. Modify this file to extend or customize the CLI behavior.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. 