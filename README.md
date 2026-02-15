# School Management System

A full-stack school management application with an Angular 19 frontend and Node.js/Express backend, connected to a PostgreSQL database.

## Tech Stack

- **Frontend:** Angular 19, SCSS, nginx
- **Backend:** Node.js, Express 5, Prisma ORM
- **Database:** PostgreSQL
- **Auth:** JWT + bcryptjs
- **Containerization:** Docker, Docker Compose

## Project Structure

```
school_management_complete/
├── school-management/        # Angular frontend
├── school-management-be/     # Express backend API
├── docker-compose.yml        # Docker Compose config
└── README.md
```

## Quick Start with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- PostgreSQL database accessible (remote or local)

### 1. Configure Environment

Update the database connection string in `docker-compose.yml` if needed:

```yaml
environment:
  - DATABASE_URL=postgresql://postgres:schoolDB1@72.61.215.205:5432/school_management
  - JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 2. Build and Run

```bash
docker compose up --build
```

This builds both containers and starts them. First build takes a few minutes.

### 3. Run Database Migration (first time only)

In a separate terminal, push the schema to your database:

```bash
docker exec -it school-backend npx prisma db push --schema=./src/prisma/schema.prisma
```

### 4. Seed Admin User (first time only)

```bash
docker exec -it school-backend node scripts/seed-admin.js
```

Default admin credentials:
- **Username:** admin
- **Password:** admin123

### 5. Access the Application

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost       |
| Backend  | http://localhost:3000  |
| Login    | http://localhost/login |
| Admin    | http://localhost/admin |

### Docker Commands

```bash
# Start in background
docker compose up --build -d

# View logs
docker compose logs -f

# View logs for a specific service
docker compose logs -f backend
docker compose logs -f frontend

# Stop all containers
docker compose down

# Rebuild a specific service
docker compose up --build backend
docker compose up --build frontend

# Remove containers and images
docker compose down --rmi all
```

### Container Details

| Container        | Image         | Port Mapping | Description                          |
|------------------|---------------|--------------|--------------------------------------|
| school-frontend  | nginx:alpine  | 80:80        | Serves Angular app, proxies /api/    |
| school-backend   | node:20-alpine| 3000:3000    | Express API server                   |

The nginx container proxies all `/api/` requests to the backend container, so the frontend and backend communicate seamlessly.

---

## Local Development (without Docker)

### Backend

```bash
cd school-management-be
npm install
```

Create a `.env` file (copy from `.env.example`):

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/school_management"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
PORT=3000
CORS_ORIGIN="http://localhost:4200"
```

Run migrations and seed:

```bash
npm run prisma:generate
npx prisma db push --schema=./src/prisma/schema.prisma
npm run seed:admin
```

Start the server:

```bash
npm start
```

Backend runs on `http://localhost:3000`.

### Frontend

```bash
cd school-management
npm install
ng serve
```

Frontend runs on `http://localhost:4200`.

> **Note:** When running locally without Docker, the frontend uses relative API URLs (`/api/v1/...`). You may need to configure an Angular proxy for local dev, or temporarily update the API URLs to `http://localhost:3000/api/v1/...`.

---

## API Endpoints

### Public

| Method | Endpoint              | Description       |
|--------|-----------------------|-------------------|
| POST   | /api/v1/auth/login    | Admin login       |
| POST   | /api/v1/inquiries     | Submit inquiry    |
| GET    | /health               | Health check      |

### Protected (JWT required)

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| GET    | /api/v1/inquiries      | List inquiries (paged) |
| GET    | /api/v1/inquiries/:id  | Get single inquiry     |
| PUT    | /api/v1/inquiries/:id  | Update inquiry         |
| DELETE | /api/v1/inquiries/:id  | Delete inquiry         |

Pass the JWT token in the `Authorization: Bearer <token>` header.

## License

ISC
