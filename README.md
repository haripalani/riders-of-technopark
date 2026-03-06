# Riders of Technopark

A modern motorcycle club website built with React, Vite, and Tailwind CSS, featuring a black & white aesthetic with red accents and a rugged, authentic riding club feel.

## 🚀 Getting Started for Collaborators

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- A code editor (we recommend [VS Code](https://code.visualstudio.com/))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/riders-of-technopark.git
cd riders-of-technopark
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the required packages listed in `package.json`.

### 3. Start the Development Server

```bash
npm run dev
```

The development server will start at `http://localhost:5173` (or another port if 5173 is busy).

## 📋 Available Scripts

- **`npm run dev`** - Start the development server with hot reload
- **`npm run build`** - Build the production-ready application
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

## �️ Database Management

### Migrating Data to MongoDB

To sync the initial site content (`src/data/content.js`) into your MongoDB database, run the following command. Make sure your `.env.local` contains a valid `MONGODB_URI`:

```bash
npm run migrate
```
*Note: You can also run it directly using `node src/scripts/migrate.js`*

## �🛠️ Development Workflow

### Working on a New Feature

1. **Create a new branch** from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them:
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   ```

3. **Push your branch** to the remote repository:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub from your branch to `dev`

### Commit Message Convention

- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for updates to existing features
- `Refactor:` for code refactoring
- `Docs:` for documentation changes

## 📁 Project Structure

```
riders-of-technopark/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── assets/      # Images, fonts, etc.
│   └── App.jsx      # Main application component
├── index.html       # HTML entry point
├── package.json     # Dependencies and scripts
└── vite.config.js   # Vite configuration
```

## 🎨 Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## 🤝 Contributing

1. Always work on a feature branch, never directly on `main` or `dev`
2. Keep your code clean and follow the existing code style
3. Test your changes before creating a pull request
4. Make sure `npm run lint` passes without errors

## 📞 Support

If you encounter any issues or have questions, please reach out to the team or create an issue on GitHub.

---

**Happy Coding! 🏍️**
