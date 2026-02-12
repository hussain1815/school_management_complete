# PostgreSQL Setup Guide

The project now uses PostgreSQL with Prisma ORM.

## Prerequisites

You need PostgreSQL installed on your system.

### Install PostgreSQL

**Windows:**
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` user
4. Default port: 5432

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Database Setup

### Step 1: Create Database

**Option A: Using psql command line**
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE school_management;

# Create user (optional, for better security)
CREATE USER school_admin WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE school_management TO school_admin;

# Exit
\q
```

**Option B: Using pgAdmin (GUI)**
1. Open pgAdmin
2. Right-click on "Databases"
3. Create → Database
4. Name: `school_management`
5. Click Save

### Step 2: Update .env File

Edit `school-management-be/.env`:

```env
# If using default postgres user:
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/school_management"

# Or if you created a custom user:
DATABASE_URL="postgresql://school_admin:your_password@localhost:5432/school_management"
```

**Connection String Format:**
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

**Example with actual values:**
```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/school_management"
```

### Step 3: Run Prisma Migrations

```bash
cd school-management-be

# Generate Prisma Client
npm run prisma:generate

# Run migration (creates tables)
npm run prisma:migrate
```

When prompted for migration name, type: **init**

This will create two tables:
- `Inquiry` - for storing inquiry form submissions
- `User` - for admin users

### Step 4: Seed Admin User

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

### Step 5: Start the Server

```bash
npm start
```

Server runs on: http://localhost:3000

## Verify Database Connection

### Check if tables were created:

```bash
psql -U postgres -d school_management

# List tables
\dt

# Should show:
# - Inquiry
# - User
# - _prisma_migrations

# View Inquiry table structure
\d "Inquiry"

# View User table structure
\d "User"

# Exit
\q
```

## Database Schema

### Inquiry Table
```sql
CREATE TABLE "Inquiry" (
  id SERIAL PRIMARY KEY,
  parent_name TEXT NOT NULL,
  child_age INTEGER NOT NULL,
  email TEXT NOT NULL,
  inquiry_Message TEXT NOT NULL,
  createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### User Table
```sql
CREATE TABLE "User" (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Common PostgreSQL Commands

```bash
# Connect to database
psql -U postgres -d school_management

# List all databases
\l

# List all tables
\dt

# View table structure
\d "TableName"

# View all inquiries
SELECT * FROM "Inquiry";

# View all users
SELECT * FROM "User";

# Count inquiries
SELECT COUNT(*) FROM "Inquiry";

# Delete all inquiries (careful!)
DELETE FROM "Inquiry";

# Exit
\q
```

## Troubleshooting

### Error: "password authentication failed"
- Check your password in DATABASE_URL
- Verify PostgreSQL user exists
- Try resetting password:
  ```bash
  psql -U postgres
  ALTER USER postgres PASSWORD 'new_password';
  ```

### Error: "database does not exist"
- Create the database first (see Step 1)
- Verify database name in DATABASE_URL matches

### Error: "connection refused"
- Check if PostgreSQL is running:
  ```bash
  # Windows
  services.msc (look for postgresql service)
  
  # Mac
  brew services list
  
  # Linux
  sudo systemctl status postgresql
  ```

### Error: "role does not exist"
- Create the user first
- Or use the default `postgres` user

### Reset Database
If you need to start fresh:
```bash
# Drop and recreate database
psql -U postgres
DROP DATABASE school_management;
CREATE DATABASE school_management;
\q

# Run migrations again
cd school-management-be
npm run prisma:migrate
npm run seed:admin
```

## Environment Variables

Your `.env` file should look like this:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/school_management"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:4200"
```

## Production Considerations

For production, consider:

1. **Use environment-specific credentials**
2. **Enable SSL connection:**
   ```env
   DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
   ```

3. **Use connection pooling** (Prisma handles this automatically)

4. **Regular backups:**
   ```bash
   pg_dump -U postgres school_management > backup.sql
   ```

5. **Restore from backup:**
   ```bash
   psql -U postgres school_management < backup.sql
   ```

## Advantages of PostgreSQL over SQLite

✅ Better for production environments  
✅ Supports concurrent connections  
✅ Better performance for large datasets  
✅ Advanced features (JSON, full-text search, etc.)  
✅ Better data integrity and ACID compliance  
✅ Scalable for growth  

## Quick Setup Summary

```bash
# 1. Create database
psql -U postgres
CREATE DATABASE school_management;
\q

# 2. Update .env with your PostgreSQL credentials

# 3. Run migrations
cd school-management-be
npm run prisma:generate
npm run prisma:migrate

# 4. Seed admin
npm run seed:admin

# 5. Start server
npm start
```

That's it! Your PostgreSQL database is ready to use with Prisma. 🚀
