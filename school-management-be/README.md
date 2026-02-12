# School Management Backend

A REST API backend for the School Management System with inquiry form handling and admin authentication.

## Features

- ✅ Inquiry Form API (Create, Read, Update, Delete)
- ✅ JWT-based Authentication
- ✅ Admin Dashboard Support
- ✅ Protected Routes with Middleware
- ✅ Email Validation
- ✅ Prisma ORM with SQLite
- ✅ CORS Enabled

## Tech Stack

- Node.js + Express
- Prisma ORM
- PostgreSQL Database
- JWT Authentication
- bcryptjs for password hashing

## Setup Instructions

### 1. Install Dependencies

```bash
cd school-management-be
npm install
```

### 2. Configure Environment Variables

Update the `.env` file with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/school_management"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
PORT=3000
CORS_ORIGIN="http://localhost:4200"
```

**Important:** Replace `your_password` with your actual PostgreSQL password.

### 3. Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE school_management;

# Exit
\q
```

Or use pgAdmin GUI to create a database named `school_management`.

### 4. Run Database Migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

When prompted for migration name, enter: `init`

### 5. Seed Admin User

```bash
npm run seed:admin
```

This creates a default admin user:
- **Username:** admin
- **Email:** admin@abadalshams.com
- **Password:** admin123

⚠️ **Important:** Change the password after first login!

### 6. Start the Server

```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Public Endpoints

#### Submit Inquiry
```http
POST /api/v1/inquiries
Content-Type: application/json

{
  "parent_name": "John Doe",
  "child_age": 5,
  "email": "john@example.com",
  "inquiry_Message": "I'm interested in enrolling my child..."
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Protected Endpoints (Require JWT Token)

#### Get All Inquiries (with pagination)
```http
GET /api/v1/inquiries?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Single Inquiry
```http
GET /api/v1/inquiries/:id
Authorization: Bearer <token>
```

#### Update Inquiry
```http
PUT /api/v1/inquiries/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "parent_name": "John Doe",
  "child_age": 5,
  "email": "john@example.com",
  "inquiry_Message": "Updated message..."
}
```

#### Delete Inquiry
```http
DELETE /api/v1/inquiries/:id
Authorization: Bearer <token>
```

## Project Structure

```
school-management-be/
├── apis/
│   └── v1/
│       ├── auth.js          # Authentication routes
│       └── inquiry.js       # Inquiry CRUD routes
├── src/
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── dev.db           # SQLite database file
│   └── server.js            # Express server setup
├── scripts/
│   └── seed-admin.js        # Admin user seeding script
├── .env                     # Environment variables
├── .env.example             # Environment template
└── package.json
```

## Database Schema

### Inquiry Model
```prisma
model Inquiry {
  id              Int      @id @default(autoincrement())
  parent_name     String
  child_age       Int
  email           String
  inquiry_Message String
  createdAt       DateTime @default(now())
}
```

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String
  role      String   @default("admin")
  createdAt DateTime @default(now())
}
```

## Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected admin routes
- Email validation
- Input sanitization
- CORS configuration

## Development

```bash
# Run in development mode
npm run dev

# Generate Prisma Client
npm run prisma:generate

# Create new migration
npm run prisma:migrate

# Seed admin user
npm run seed:admin
```

## Testing the API

You can test the API using:
- Postman
- Thunder Client (VS Code extension)
- curl commands
- Frontend application

### Example curl commands:

```bash
# Submit inquiry
curl -X POST http://localhost:3000/api/v1/inquiries \
  -H "Content-Type: application/json" \
  -d '{"parent_name":"John Doe","child_age":5,"email":"john@example.com","inquiry_Message":"Test message"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get inquiries (replace <token> with actual JWT)
curl http://localhost:3000/api/v1/inquiries \
  -H "Authorization: Bearer <token>"
```

## Troubleshooting

### Database Issues
If you encounter database errors, try:
```bash
# Drop and recreate database
psql -U postgres
DROP DATABASE school_management;
CREATE DATABASE school_management;
\q

# Run migrations again
npm run prisma:migrate
npm run seed:admin
```

### Port Already in Use
Change the PORT in `.env` file or kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

## License

ISC
