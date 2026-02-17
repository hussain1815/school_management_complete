# News Ticker Setup Guide

## What's New

Added a dynamic news ticker system that allows admins to manage news items from the admin panel.

## Features

- Scrolling news ticker on the homepage
- Admin panel with tabs for Inquiries and News management
- Create, edit, delete, and toggle active status for news items
- Control display order of news items
- News fetched from database via API

## Database Setup

### Option 1: Run Migration SQL (Recommended)

Connect to your PostgreSQL database and run:

```bash
psql -U your_username -d school_management -f school-management-be/migrations/add_news_table.sql
```

Or use a database client (pgAdmin, DBeaver, etc.) to execute the SQL file.

### Option 2: Use Prisma Migrate

If you have Prisma CLI working:

```bash
cd school-management-be
npx prisma migrate dev --name add_news_table
```

### Option 3: Manual Seed Script

After creating the table, you can seed default news:

```bash
cd school-management-be
node scripts/seed-news.js
```

## Backend Changes

1. Added `News` model to Prisma schema
2. Created `/api/v1/news` endpoints:
   - `GET /api/v1/news` - Get all active news (public)
   - `GET /api/v1/news/all` - Get all news (admin only)
   - `POST /api/v1/news` - Create news (admin only)
   - `PUT /api/v1/news/:id` - Update news (admin only)
   - `DELETE /api/v1/news/:id` - Delete news (admin only)

## Frontend Changes

1. Created `news-ticker` component with scrolling animation
2. Updated admin panel with tabs for Inquiries and News
3. Added news management UI (create, edit, delete)
4. News ticker fetches data from API on page load

## Usage

1. Start the backend server
2. Login to admin panel at `/admin`
3. Click on "News Ticker" tab
4. Add, edit, or delete news items
5. Toggle active status to show/hide items
6. Set display order to control sequence
7. News will automatically appear on the homepage ticker

## Default News Items

The system comes with 3 default news items:
1. Montessori + Reggio Emilia Inspired Learning
2. Explore Our Workstations!
3. Registration Open for 2026–27!

You can edit or replace these from the admin panel.
