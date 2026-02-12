# School Management System - Complete Setup Guide

This guide will help you set up both the frontend and backend of the School Management System with the Inquiry Form feature.

## 🎯 What's Implemented

### Frontend (Angular)
- ✅ Contact/Inquiry Form with validation
- ✅ Loading states and success/error messages
- ✅ Admin Login page
- ✅ Admin Dashboard to view inquiries
- ✅ Protected routes
- ✅ JWT token management

### Backend (Node.js + Express)
- ✅ REST API for inquiries (CRUD)
- ✅ JWT authentication system
- ✅ Protected admin routes
- ✅ Email validation
- ✅ Prisma ORM with SQLite
- ✅ Admin user seeding

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd school-management-be
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```

4. **Run database migration:**
   ```bash
   npm run prisma:migrate
   ```
   When prompted, enter migration name: `init`

5. **Seed admin user:**
   ```bash
   npm run seed:admin
   ```
   This creates:
   - Username: `admin`
   - Password: `admin123`
   - Email: `admin@abadalshams.com`

6. **Start the backend server:**
   ```bash
   npm start
   ```
   Server runs on: `http://localhost:3000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend folder:**
   ```bash
   cd school-management
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   ng serve
   ```
   or
   ```bash
   npm start
   ```
   Frontend runs on: `http://localhost:4200`

## 🧪 Testing the System

### 1. Test the Inquiry Form

1. Open browser: `http://localhost:4200`
2. Scroll to the "Contact" section
3. Fill in the inquiry form:
   - Parent Name: John Doe
   - Child's Age: 5
   - Email: john@example.com
   - Message: I'm interested in enrolling my child
4. Click "Send Message"
5. You should see a success message

### 2. Test Admin Login

1. Navigate to: `http://localhost:4200/login`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
3. Click "Login"
4. You'll be redirected to the admin dashboard

### 3. Test Admin Dashboard

1. After logging in, you should see the admin dashboard
2. View all submitted inquiries in a table
3. Features available:
   - View inquiry details
   - Delete inquiries
   - Pagination (if more than 10 inquiries)
   - Logout button

## 📁 Project Structure

```
.
├── school-management/              # Frontend (Angular)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── contact/       # Inquiry form component
│   │   │   │   ├── login/         # Admin login component
│   │   │   │   └── admin/         # Admin dashboard component
│   │   │   └── app.routes.ts      # Route configuration
│   │   └── assets/
│   └── package.json
│
└── school-management-be/           # Backend (Node.js)
    ├── apis/v1/
    │   ├── auth.js                 # Authentication routes
    │   └── inquiry.js              # Inquiry CRUD routes
    ├── src/
    │   ├── middleware/
    │   │   └── auth.js             # JWT middleware
    │   ├── prisma/
    │   │   ├── schema.prisma       # Database schema
    │   │   └── dev.db              # SQLite database
    │   └── server.js               # Express server
    ├── scripts/
    │   └── seed-admin.js           # Admin seeding script
    └── package.json
```

## 🔐 Default Admin Credentials

**Username:** admin  
**Password:** admin123  
**Email:** admin@abadalshams.com

⚠️ **Important:** Change the password after first login!

## 🛠️ API Endpoints

### Public Endpoints
- `POST /api/v1/inquiries` - Submit inquiry form
- `POST /api/v1/auth/login` - Admin login

### Protected Endpoints (Require JWT Token)
- `GET /api/v1/inquiries` - Get all inquiries (with pagination)
- `GET /api/v1/inquiries/:id` - Get single inquiry
- `PUT /api/v1/inquiries/:id` - Update inquiry
- `DELETE /api/v1/inquiries/:id` - Delete inquiry

## 🔧 Environment Configuration

### Backend (.env)
```env
DATABASE_URL="file:./src/prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
PORT=3000
CORS_ORIGIN="http://localhost:4200"
```

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3000 is already in use
- Make sure you ran `npm install`
- Verify database migration completed successfully

### Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check CORS settings in backend
- Verify API URLs in frontend components

### Database errors
```bash
cd school-management-be
rm -rf src/prisma/dev.db
npm run prisma:migrate
npm run seed:admin
```

### Login not working
- Verify admin user was created (check console output from seed script)
- Check JWT_SECRET in .env file
- Clear browser localStorage and try again

## 📝 Next Steps

1. Change the default admin password
2. Customize the inquiry form fields if needed
3. Add more admin features (edit inquiries, export data, etc.)
4. Implement email notifications for new inquiries
5. Add more security features (rate limiting, etc.)

## 🎉 You're All Set!

Your School Management System with Inquiry Form is now fully functional. Parents can submit inquiries through the contact form, and admins can view and manage them through the dashboard.

For more details, check:
- Backend README: `school-management-be/README.md`
- Frontend README: `school-management/README.md`
