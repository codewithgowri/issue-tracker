# Issue Tracker

A full-stack Issue Tracker application built with [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/), [Radix UI](https://www.radix-ui.com/themes), and [NextAuth.js](https://next-auth.js.org/).  
This project demonstrates modern web development practices, authentication, database integration, and a clean UI for managing issues.

---

## 🚀 Live Demo

**See the application online:**  
[https://issue-tracker-by-gowri.vercel.app](https://issue-tracker-by-gowri.vercel.app)

---

## Features

- **Authentication:** Secure login with NextAuth.js.
- **CRUD Operations:** Create, view, edit, and delete issues.
- **Status Tracking:** Track issues by status (Open, In Progress, Closed).
- **User Assignment:** Assign issues to users.
- **Responsive UI:** Built with Radix UI and Tailwind CSS.
- **Charts & Summaries:** Visualize issue statistics.
- **Markdown Support:** Rich text editing for issue descriptions.

---

## Tech Stack & Packages

- **Framework:** `next` (v15.4.3)
- **Database ORM:** `@prisma/client`, `prisma`
- **Database:** PostgreSQL
- **Authentication:** `next-auth`, `@next-auth/prisma-adapter`
- **UI:** `@radix-ui/themes`, `@radix-ui/react-icons`, `@tailwindcss/typography`, `@tanstack/react-query`, `react-icons`
- **Markdown Editor:** `react-markdown`, `react-simplemde-editor`, `easymde`
- **Charts:** `recharts`
- **Form Handling:** `react-hook-form`, `zod`, `@hookform/resolvers`
- **Notifications:** `react-hot-toast`
- **Skeleton Loading:** `react-loading-skeleton`
- **Utilities:** `axios`, `classnames`, `delay`

---

## Setup & Commands

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

- Copy `.env.example` to `.env` and set your `DATABASE_URL` for PostgreSQL.

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Start Development Server

```bash
npm run dev
```

### 6. Build for Production

```bash
npm run build
npm start
```

### 7. Lint & Format

```bash
npm run lint
```

---

## Project Structure

```
├── app/                # Next.js app directory (routes, components, pages)
├── lib/                # Prisma client setup
├── prisma/             # Prisma schema and migrations
├── public/             # Static assets
├── .env                # Environment variables
├── package.json        # Project metadata and scripts
├── README.md           # Project documentation
```

---

## How It Works

- **Authentication:** Users sign in via NextAuth.js. Protected routes use middleware.
- **Issue Management:** Authenticated users can create, edit, and delete issues. Each issue has a status and can be assigned to a user.
- **UI:** Uses Radix UI for accessible components and Tailwind CSS for styling.
- **Charts:** Issue statistics are visualized using Recharts.
- **Markdown:** Issue descriptions support markdown editing and rendering.

---

## Demo

![Issue Tracker Screenshot](public/demo-screenshot.png)

---

## Recruiter Notes

- **Modern stack:** Next.js App Router, Prisma, NextAuth.js, Radix UI.
- **TypeScript:** Strict typing throughout the codebase.
- **Best practices:** Authentication, protected routes, modular code, and responsive design.
- **Showcases:** Full CRUD, real-time UI updates, database integration, and user experience enhancements.

---

## License

MIT

---

## Contact

Feel free to reach out via email: [gowrishankarmukkeri@gmail.com](mailto:gowrishankarmukkeri@gmail.com)
