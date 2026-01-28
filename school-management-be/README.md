# School Management Backend API

A professional Node.js/Express backend API for school management system with complete CRUD operations.

## Features

- ✅ Complete CRUD operations for inquiries
- 🔐 JWT authentication middleware (ready to use)
- 🛡️ Security headers with Helmet
- 🌐 CORS configuration
- 📊 Request logging with Morgan
- ⚡ Rate limiting
- ✨ Input validation with Joi
- 📄 Pagination support
- 🚀 Health check endpoint
- 🔄 Graceful shutdown
- 🗄️ PostgreSQL with Prisma ORM

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and JWT secret
   ```

3. **Database setup:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Start the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Authentication
- `POST /api/v1/auth/register` - Register new admin (initial setup only)
- `POST /api/v1/auth/login` - Admin login
- `GET /api/v1/auth/profile` - Get current user profile (requires token)

### Inquiries
- `GET /api/v1/inquiries` - Get all inquiries (🔒 **PROTECTED**)
- `GET /api/v1/inquiries/:id` - Get single inquiry (🔒 **PROTECTED**)
- `POST /api/v1/inquiries` - Create new inquiry (**PUBLIC** - for website form)
- `PUT /api/v1/inquiries/:id` - Update inquiry (🔒 **PROTECTED**)
- `DELETE /api/v1/inquiries/:id` - Delete inquiry (🔒 **PROTECTED**)

### Query Parameters (GET /inquiries)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## Authentication Setup

### 1. Create Database Migration
```bash
npm run prisma:migrate
```

### 2. Create Admin User
```bash
npm run create-admin
```

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`
- Email: `admin@school.com`

⚠️ **Important**: Change the password after first login!

### 3. Login Process
1. **POST** `/api/v1/auth/login` with username and password
2. Receive JWT token in response
3. Include token in Authorization header: `Bearer <token>`
4. Access protected routes

### Example Login Request
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Example Protected Request
```bash
curl -X GET http://localhost:3000/api/v1/inquiries \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevents abuse
- **Input Validation**: Joi schema validation
- **JWT Ready**: Authentication middleware included
- **Error Handling**: Comprehensive error responses

## Environment Variables

```env
DATABASE_URL="postgresql://username:password@localhost:5432/school_management"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:4200"
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": ["Validation errors..."]
}
```

### Paginated Response
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

## Development

- Uses ES6 modules
- Nodemon for development
- Prisma for database management
- Professional error handling
- Structured middleware organization