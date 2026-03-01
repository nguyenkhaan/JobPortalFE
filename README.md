# 🚀 JobPortalFE

Frontend for a **Job Portal System** built with modern tooling:
Vite + React + TypeScript, powered by Bun.

---

## 🛠 Tech Stack

- ⚡ Vite
- ⚛ React
- 🟦 TypeScript
- 🎨 TailwindCSS
- 🧹 ESLint (Flat Config)
- 🪝 Husky
- 📝 Commitlint (Conventional Commits)
- 🥟 Bun (runtime & package manager)

---

## 📦 Requirements

You need one of the following:

- **Node.js 18+**
- **Bun 1.0+ (recommended)**

Check your version:

```bash
node -v
bun -v
```

---

## 📥 Installation

### Using Bun (recommended)

```bash
bun install
```

### Using npm

```bash
npm install
```

---

## 🧑‍💻 Development

Start the Vite development server:

```bash
bun dev
```

or

```bash
npm run dev
```

Default URL:

```
http://localhost:5173
```

---

## 🏗 Build for Production

```bash
bun run build
```

or

```bash
npm run build
```

Preview production build locally:

```bash
bun run preview
```

---

## 🧹 Code Quality

### Lint

```bash
bun run lint
```

### Format (if configured)

```bash
bun run format
```

---

## 🪝 Git Hooks & Commit Convention

This project uses:

- **Husky** for Git hooks
- **Commitlint** with Conventional Commits standard

Example valid commit messages:

```
feat: add login page
fix: correct API endpoint
chore: update dependencies
refactor: improve auth logic
docs: update README
```

If your commit message does not follow the convention,
the commit will be rejected automatically.

---

## 📂 Project Structure

```
.
├── commitlint.config.js
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
```

---

## 📜 Available Scripts

| Script | Description |
|--------|------------|
| `dev` | Start development server |
| `build` | Create production build |
| `preview` | Preview production build |
| `lint` | Run ESLint |
| `format` | Format code (if configured) |

---

## 📄 License

MIT License

---

## ✨ Notes

- Uses ES Modules (`"type": "module"`)
- Flat ESLint configuration
- Commit message validation enabled
- Optimized for Bun performance

---

Built with ❤️ love. 