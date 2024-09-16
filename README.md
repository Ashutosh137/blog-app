### Blog app

````markdown
# Blog App

This is a modern blog application built with Next.js 14 and TypeScript on the frontend and Express with Mongoose on the backend. The application allows users to create, read, update, and delete blog posts, manage comments, and features secure user authentication using JWT.

## Project Structure

```plaintext
blog-app/
├── app/                # Frontend (Next.js 14 + TypeScript)
│   ├── Layout/     	# Reusable components and layouts
│   ├── assets/         #  CSS styles
│   ├── ui/             # UI elements like buttons, form controls, etc.
│   ├── Dockerfile      # Dockerfile for Next.js app
├── server/             # Backend (Express + Mongoose)
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── controllers/    # Controller logic for handling requests
│   └── middleware/     # Custom middleware (e.g., authentication, error handling)
│   ├── Dockerfile      # Dockerfile for expreess server
├── docker-compose.yml  # Docker Compose for multi-container setup
└── .github/workflows/  # CI/CD pipeline with GitHub Actions
```
````

## Running the Application

### Development Mode

To run the application locally:

1. **Start the backend server:**

   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend app:**

   ```bash
   cd ../app
   npm run dev
   ```

3. Visit `http://localhost:3000` to view the application.

### Production Mode

To build and run the application with Docker:

```bash
docker-compose up --build
```

This command will spin up both the frontend (`app`) and backend (`server`) services. The frontend will be available at `http://localhost:3000`, and the backend at `http://localhost:4000`.

### GitHub Actions CI/CD Pipeline

This project is configured for CI/CD with GitHub Actions. The pipeline will automatically test, build, and deploy the application upon pushing changes to the `main` branch.

## Frontend (Next.js 14 + TypeScript)

The frontend of the Blog App is built with Next.js 14 and TypeScript. It features a modern UI designed with Tailwind CSS and includes a rich text editor for creating and editing blog posts.

### Project Structure

```plaintext
app/                # Frontend (Next.js 14 + TypeScript)
├── Layout/         # Reusable components and layouts
├── assets/         #  CSS styles
├── ui/             # UI elements like buttons, form controls, etc.
```

### Running the Frontend

#### Development Mode

To run the frontend locally:

```bash
cd app
npm run dev
```

The app will be available at `http://localhost:3000`.

#### Production Mode

To build and run the frontend with Docker:

```bash
docker build -t blog-app-frontend .
docker run -p 3000:3000 blog-app-frontend
```

### Environment Variables

Create a `.env.local` file in the `app` directory with the following content:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Features

- **Modern UI**: Built with Tailwind CSS, fully responsive.
- **Rich Text Editor**: Create and edit blog posts with formatted text.
- **Dark Mode**: User-friendly dark theme.
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support.

## Backend (Express + Mongoose)

The backend of the Blog App is built with Express.js and Mongoose. It provides a RESTful API for managing blog posts, comments, and user authentication with JWT.

### Project Structure

```plaintext
server/             # Backend (Express + Mongoose)
├── models/         # Mongoose models
├── routes/         # API routes
├── controllers/    # Controller logic for handling requests
└── middleware/     # Custom middleware (e.g., authentication, error handling)
```

### Running the Backend

#### Development Mode

To run the backend locally:

```bash
cd server
npm run dev
```

The backend will be available at `http://localhost:4000`.

#### Production Mode

To build and run the backend with Docker:

```bash
docker build -t blog-app-backend -f Dockerfile.server .
docker run -p 4000:4000 blog-app-backend
```

### Environment Variables

Create a `.env` file in the `server` directory with the following content:

```plaintext
MONGODB_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your_jwt_secret
PORT=4000
```

### API Endpoints

#### Blog Posts

- `GET /blog/blogs`: Fetch all blog posts.
- `POST /create`: Create a new blog post.
- `GET /blog/:id`: Fetch a single blog post by ID.
- `PUT /blog/update/:id`: Update a blog post by ID.
- `DELETE /delete/:id`: Delete a blog post by ID.
- `GET /blog/:id/comments`: Get all comments for a specific blog post by ID.

#### Comments

- `POST /comment/`: Add a new comment to a specific blog post.
- `DELETE /comment/:commentId`: Delete a specific comment by ID from a blog post.

#### Authentication

- `POST /auth/login`: Authenticate a user and generate a JWT.
- `POST /auth/register`: Register a new user.

### Features

- **JWT Authentication**: Secure user authentication and authorization.
- **Mongoose ORM**: Structured data models for MongoDB.
- **RESTful API**: Standardized endpoints for easy frontend integration.
- **Comment Management**: CRUD operations for comments on blog posts.

```

---

This `README.md` file now accurately reflects the correct API endpoint paths such as `/blogs`, `/comments`, and `/auth`. It also includes instructions for running both the frontend and backend, project structure details, and descriptions of key features.
```
