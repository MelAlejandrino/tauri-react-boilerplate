# Tauri + React + TypeScript Boilerplate

This is a modern boilerplate for building desktop applications using [Tauri](https://tauri.app/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [shadcn/ui](https://ui.shadcn.com/).

## Features

- **Tauri v2**: Lightweight, secure, and fast desktop framework.
- **React 19**: The latest version of the popular UI library.
- **Vite**: Blazing fast build tool.
- **TypeScript**: Static typing for better developer experience.
- **shadcn/ui**: Beautifully designed components built with Radix UI and Tailwind CSS.
- **Tailwind CSS v4**: Utility-first CSS framework.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [Rust](https://www.rust-lang.org/tools/install) (latest stable)
- [VS Code](https://code.visualstudio.com/) (recommended) with:
  - [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) extension
  - [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) extension

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/MelAlejandrino/tauri-react-boilerplate.git
    cd tauri-react-boilerplate
    ```

    *(Note: Replace the URL with your actual repository URL if different)*

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run tauri dev
    ```

    This will start the Vite dev server and open the Tauri application window.

## Project Customization

### Renaming the Project

To easily rename the project (which updates `package.json`, `tauri.conf.json`, `Cargo.toml`, and `index.html`), run the included script:

```bash
npm run rename <new-project-name>
```

Example:

```bash
npm run rename my-awesome-app
```

### Adding shadcn/ui Components

This boilerplate comes configured with shadcn/ui. To add new components:

```bash
npx shadcn@latest add <component-name>
```

Example:

```bash
npx shadcn@latest add button prompt
```

## Building for Production

To build the application for your OS:

```bash
npm run tauri build
```

The output binaries will be located in `src-tauri/target/release/bundle/`.
