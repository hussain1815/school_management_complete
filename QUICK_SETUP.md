# Quick Setup Instructions

## ✅ What's Already Done

All code is implemented! Here's what's ready:

### Backend
- ✅ Authentication system (JWT)
- ✅ Inquiry API with CRUD operations
- ✅ Protected routes with middleware
- ✅ Email validation
- ✅ Prisma schema with User and Inquiry models
- ✅ Admin seeding script

### Frontend
- ✅ Contact form with backend integration
- ✅ Loading states and error handling
- ✅ Admin login page
- ✅ Admin dashboard with inquiry list
- ✅ Delete functionality
- ✅ Pagination support

## 🚀 Final Setup Steps (Run These Commands)

### Step 0: PostgreSQL Setup

Make sure PostgreSQL is installed and running.

Create the database:
```bash
psql -U postgres
CREATE DATABASE school_management;
\q
```

Update `.env` file with your PostgreSQL credentials:
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/school_management"
```

### Step 1: Database Migration

Open a terminal in the `school-management-be` folder and run:

```bash
npm run prisma:migrate
```

When prompted for migration name, type: **init** and press Enter

### Step 2: Create Admin User

Still in the `school-management-be` folder, run:

```bash
npm run seed:admin
```

You should see:
```
✅ Admin user created successfully!
📧 Email: admin@abadalshams.com
👤 Username: admin
🔑 Password: admin123
```

### Step 3: Start Backend Server

```bash
npm start
```

Server will run on: http://localhost:3000

### Step 4: Start Frontend (New Terminal)

Open a new terminal in the `school-management` folder and run:

```bash
ng serve
```

or

```bash
npm start
```

Frontend will run on: http://localhost:4200

## 🧪 Test Everything

### 1. Test Inquiry Form
- Go to: http://localhost:4200
- Scroll to Contact section
- Fill and submit the form
- Should see success message

### 2. Test Admin Login
- Go to: http://localhost:4200/login
- Username: **admin**
- Password: **admin123**
- Click Login

### 3. Test Admin Dashboard
- After login, you'll see all inquiries
- Try deleting an inquiry
- Check pagination if you have more than 10 inquiries

## 🎯 Default Admin Credentials

- **Username:** admin
- **Password:** admin123
- **Email:** admin@abadalshams.com

## 📝 What Was Implemented

### Backend Changes:
1. ✅ Added User model to Prisma schema
2. ✅ Created authentication middleware (`src/middleware/auth.js`)
3. ✅ Created auth routes (`apis/v1/auth.js`)
4. ✅ Updated inquiry routes with authentication protection
5. ✅ Added email validation
6. ✅ Added pagination support
7. ✅ Created admin seeding script (`scripts/seed-admin.js`)
8. ✅ Updated package.json with bcryptjs and jsonwebtoken
9. ✅ Updated .env with JWT configuration

### Frontend Changes:
1. ✅ Updated contact component with HTTP integration
2. ✅ Added loading states and error/success messages
3. ✅ Added form validation
4. ✅ Added alert styling
5. ✅ Admin and Login components already had full implementation

## 🔧 Troubleshooting

### If migration fails:
```bash
# Drop and recreate database
psql -U postgres
DROP DATABASE school_management;
CREATE DATABASE school_management;
\q

# Run migration again
npm run prisma:migrate
```

### If admin creation fails:
```bash
# Run the seed script again
npm run seed:admin
```

### If you get "scripts disabled" error on Windows:
Run commands with `cmd /c`:
```bash
cmd /c "npm run prisma:migrate"
cmd /c "npm run seed:admin"
cmd /c "npm start"
```

## ✨ You're Done!

Once both servers are running, your complete inquiry system is ready to use!
