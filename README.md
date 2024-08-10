# Blog App
## Introduction

The **Blog App** lets users **create**, **publish**, and **share** their blogs easily. It’s built with **React**, **TypeScript**, and **TailwindCSS** for a smooth frontend experience. On the backend, it uses **Cloudflare Workers**, **Hono**, **Prisma**, and **Zod** to handle everything efficiently. **PostgreSQL** is used to manage blog content dynamically, ensuring everything runs smoothly.

## Feature Overview

- **Blog Creation and Management:** Users can write, edit, and publish blogs using a rich text editor. Blogs can be saved as drafts or categorized and tagged for better organization.
- **User Interaction:** Secure user authentication allows for profile management and engagement through comments and likes.
- **Enhanced Blog Appearance:** Utilizes Tiptap WYSIWYG editor and Novel Editor for a polished and user-friendly blog experience.
- **Developer APIs:** Provides APIs for content management, including publishing, deletion, and managing private posts.

## Contributing and Development Guide

### Step 1: Application Credentials
Use the following credentials to log in and start using the application:

- **Username:** `user@gmail.com`
- **Password:** `123456`

### Step 2: Clone the Repository
Clone the repository from GitHub to your local machine using the following command:

```bash
git clone https://github.com/SuphalBochkar/blog-app.git
```

### Step 3: Navigate to the Backend and Frontend Directories

1. **Backend Setup:**
   - Navigate to the backend directory:
     ```bash
     cd blog-app/backend
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

2. **Frontend Setup:**
   - Open a new terminal window and navigate to the frontend directory:
     ```bash
     cd blog-app/frontend
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

### Step 4: Access the Application
Once both the backend and frontend are running, open your browser and navigate to `http://localhost:5173` to access the application.

### Folder Structure Overview

The project is structured as follows:

- **.gitignore:** Specifies files and directories to be ignored by Git.
- **frontend:** Contains frontend files for the React application.
  - **src/:** Main source files, including components, pages, and hooks.
  - **components/:** Reusable UI components.
  - **pages/:** Different views and pages.
  - **assets/:** Static files and assets.
- **backend:** Contains backend files for the API.
  - **src/:** Entry point and application logic.
  - **routes/:** API endpoints for handling requests.
  - **middleware/:** Custom middleware functions.
  - **database/:** Database configuration and connection setup.
- **common:** Shared utilities and types across frontend and backend.
