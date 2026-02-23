# SkillBridge Private Tutor Service - Backend

## Overview

The SkillBridge Private Tutor Service backend is a **Node.js/Express.js RESTful API** built with **TypeScript**. It provides a comprehensive platform for connecting students with tutors, managing bookings, reviews, and administrative operations. The backend uses **Prisma ORM** for database management with **PostgreSQL** and implements **Better-Auth** for authentication.

Frontend Live : https://skillbridge-private-tutor-service-c.vercel.app

Frontend Repo : https://github.com/sohelranalive/skillbridge-private-tutor-service-client-nextjs

Backend Repo : https://github.com/sohelranalive/SkillBridge-private-tutor-service-server

## Table of Contents

- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Modules](#api-modules)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)

## Architecture

The backend follows a **modular MVC (Model-View-Controller) architecture**:

- **Models**: Defined using Prisma schema files (`.prisma`)
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and database operations
- **Routers**: Define API routes and map them to controllers
- **Middleware**: Handle authentication, error handling, and request validation

### Design Pattern

```
Client Request 
    ↓
Express App (app.ts)
    ↓
CORS & Better-Auth Middleware
    ↓
Routes (/api/v1/*)
    ↓
Controllers (Request/Response handling)
    ↓
Services (Business Logic)
    ↓
Prisma ORM
    ↓
PostgreSQL Database
```

## Technology Stack

### Core Technologies
- **Runtime**: Node.js
- **Framework**: Express v5.2.1
- **Language**: TypeScript v5.9.3
- **ORM**: Prisma v7.3.0
- **Database**: PostgreSQL (via @prisma/adapter-pg)
- **Authentication**: Better-Auth v1.4.17

### Development Tools
- **tsx**: TypeScript execution for development
- **tsup**: TypeScript bundler for production builds
- **dotenv**: Environment variable management

### Key Dependencies
- **express**: Web application framework
- **cors**: Cross-Origin Resource Sharing support
- **pg**: PostgreSQL client
- **@prisma/client**: Database client
- **better-auth**: Modern authentication library

## Project Structure

```
Backend/
├── api/                      # Production build output
├── generated/                # Generated Prisma client
│   └── prisma/
├── node_modules/
├── prisma/
│   ├── migrations/           # Database migration files
│   └── schema/               # Prisma schema files
│       ├── schema.prisma     # Main Prisma configuration
│       ├── auth.prisma       # User authentication schema
│       ├── tutor.prisma      # Tutor-related models
│       ├── booking.prisma    # Booking model
│       └── category.prisma   # Category model
├── src/
│   ├── app.ts               # Express app configuration
│   ├── server.ts            # Server entry point
│   ├── index.ts             # Main export
│   ├── helpers/
│   │   └── paginationHelper.ts
│   ├── lib/
│   │   ├── auth.ts          # Better-Auth configuration
│   │   └── prisma.ts        # Prisma client instance
│   ├── middleware/
│   │   ├── authentication.ts      # Auth middleware
│   │   ├── globalErrorHandler.ts  # Global error handler
│   │   └── notFound.ts           # 404 handler
│   ├── modules/
│   │   ├── admin/
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.service.ts
│   │   │   └── admin.router.ts
│   │   ├── student/
│   │   │   ├── student.controller.ts
│   │   │   ├── student.service.ts
│   │   │   └── student.router.ts
│   │   └── tutor/
│   │       ├── tutor.controller.ts
│   │       ├── tutor.service.ts
│   │       └── tutor.router.ts
│   ├── routes/
│   │   └── index.ts         # Main route aggregator
│   ├── script/
│   │   └── seedAdmin.ts     # Admin seeding script
│   └── type/
├── .env                      # Environment variables (local)
├── .env.local               # Environment variables (production)
├── .gitignore
├── package.json
├── tsconfig.json
└── vercel.json              # Vercel deployment config
```

## Database Schema

### User Management
- **User**: Core user model with authentication
  - Fields: id, name, email, emailVerified, image, role, status, phone
  - Roles: ADMIN, STUDENT, TUTOR
  - Status: ACTIVE, BANNED
  
- **Account**: OAuth and credential accounts
- **Session**: User session management
- **Verification**: Email/phone verification

### Tutor System
- **TutorProfile**: Tutor information
  - Fields: tutor_id, user_id, subjects, price, about, education, language, isVerified, isFeatured
  - Relationships: User, Categories, AvailabilitySlots, Bookings, Reviews

- **AvailabilitySlot**: Tutor availability scheduling
  - Fields: id, tutor_id, start_time, end_time, subject
  - Unique constraint on tutor_id + time + subject

### Booking & Review System
- **Booking**: Student-tutor bookings
  - Fields: booking_id, student_id, tutor_id, availability_id, start_time, end_time
  - Relationships: Student, Tutor, AvailabilitySlot

- **Reviews**: Student reviews for tutors
  - Fields: id, tutor_id, student_id, reviewText, ratings, createdAt
  - Relationships: Student, Tutor

### Category Management
- **Categories**: Subject categories
  - Fields: category_id, category_name
  - Relationship: Tutors

## API Modules

### 1. Admin Module (`/api/v1/admin`)

**Purpose**: Administrative operations for platform management

**Services**:
- `allCategory()`: Get all tutor categories with tutor counts
- `getAllBookings()`: View all platform bookings
- `getAllUsers()`: View all registered users
- `updateUserStatusById()`: Ban/activate users
- `addNewCategory()`: Create new tutor categories
- `updateCategory()`: Update category information
- `deleteCategory()`: Remove categories

### 2. Student Module (`/api/v1/student`)

**Purpose**: Student operations for bookings and reviews

**Services**:
- `getAllReviews()`: Get all reviews (public)
- `getBooking()`: Check existing bookings
- `createBooking()`: Book a tutor session
- `getAllBookingByStudentId()`: Get student's bookings
- `getAllReviewsByStudentId()`: Get student's reviews
- `writeReview()`: Submit a tutor review
- `updateReview()`: Edit existing review
- `deleteReview()`: Remove a review

### 3. Tutor Module (`/api/v1/tutor`)

**Purpose**: Tutor profile and availability management

**Services**:
- `getAllTutor()`: Get filtered/paginated tutor list
  - Filters: search, isFeatured, price, category, ratings
  - Pagination: page, limit, skip
  - Sorting: sortBy, sortOrder
  - Returns: Tutors with average ratings and review counts
  
- `getASingleTutorById()`: Get tutor details by tutor_id
- `getTutorProfileByUserId()`: Get tutor profile by user_id
- `updateTutorProfileById()`: Update tutor information
- `getAllBookingByTutorId()`: Get tutor's bookings
- `getAllReviewsByTutorId()`: Get tutor's reviews
- `getTutorAvailability()`: Get tutor's time slots
- `setTutorAvailability()`: Create availability slots
- `deleteTutorAvailability()`: Remove time slots (if no bookings exist)

## Installation & Setup

### Prerequisites
- Node.js (v20 or higher)
- PostgreSQL database
- npm or pnpm package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   cd SkillBridge-private-tutor-service-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` (if available) or create `.env` file
   - Configure database connection and authentication credentials

4. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate deploy
   ```

6. **Seed admin user (optional)**
   ```bash
   npm run seedAdmin
   ```

7. **Start development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000` (or the port specified in `.env`)

## Environment Variables

Create a `.env` file in the Backend directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Server
PORT=5000
NODE_ENV=development

# Better-Auth Configuration
BETTER_AUTH_URL=http://localhost:5000
BETTER_AUTH_SECRET=your-secret-key-here

# Frontend URLs
APP_URL=http://localhost:3000
PROD_APP_URL=https://your-production-frontend.com

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## Available Scripts

```json
{
  "dev": "npx tsx watch src/server.ts",           // Start development server with hot reload
  "seedAdmin": "npx tsx src/script/seedAdmin.ts", // Seed admin user to database
  "build": "prisma generate && tsup src/index.ts --format esm --platform node --target node20 --outDir api --external pg-native",
  "postinstall": "prisma generate"                 // Auto-generate Prisma client after install
}
```

### Development
```bash
npm run dev          # Start development server with auto-reload
npm run seedAdmin    # Create initial admin user
```

### Production
```bash
npm run build        # Build production bundle
npm start            # Start production server (after build)
```

## API Endpoints

### Base URL
```
Development: http://localhost:5000
Production: https://your-backend-url.com
```

### Authentication Routes (`/api/auth/*`)
Handled by **Better-Auth** (automatic routing)

- `POST /api/auth/sign-up/email` - Email/password registration
- `POST /api/auth/sign-in/email` - Email/password login
- `GET /api/auth/sign-out` - Logout
- `GET /api/auth/session` - Get current session
- `GET /api/auth/oauth/google` - Google OAuth
- `GET /api/auth/oauth/github` - GitHub OAuth

### Admin Routes (`/api/v1/admin`)

```
GET    /api/v1/admin/all-category          # Get all categories
GET    /api/v1/admin/all-bookings          # Get all bookings (auth required)
GET    /api/v1/admin/all-users             # Get all users (auth required)
PATCH  /api/v1/admin/user-update/:id       # Update user status (auth required)
POST   /api/v1/admin/add-category          # Add new category (auth required)
PATCH  /api/v1/admin/update-category/:id   # Update category (auth required)
DELETE /api/v1/admin/delete-category/:id   # Delete category (auth required)
```

### Student Routes (`/api/v1/student`)

```
GET    /api/v1/student/all-review               # Get all reviews
GET    /api/v1/student/booking?studentId=&availabilityId=  # Check booking
POST   /api/v1/student/create-booking           # Create booking (auth required)
GET    /api/v1/student/all-booking/:studentId   # Get student bookings (auth required)
GET    /api/v1/student/all-reviews/:studentId   # Get student reviews (auth required)
POST   /api/v1/student/write-review             # Write review (auth required)
PATCH  /api/v1/student/update-review/:id        # Update review (auth required)
DELETE /api/v1/student/delete-review/:id        # Delete review (auth required)
```

### Tutor Routes (`/api/v1/tutor`)

```
GET    /api/v1/tutor/all-tutor                    # Get all tutors (with filters)
       Query params: search, isFeatured, price, category, ratings, page, limit, sortBy, sortOrder
       
GET    /api/v1/tutor/tutor-profile/:id            # Get tutor by tutor_id
GET    /api/v1/tutor/user/:id                     # Get tutor by user_id (auth required)
PATCH  /api/v1/tutor/tutor-profile/update/:id     # Update tutor profile (auth required)
GET    /api/v1/tutor/all-bookings/:id             # Get tutor bookings (auth required)
GET    /api/v1/tutor/all-reviews/:id              # Get tutor reviews (auth required)
GET    /api/v1/tutor/availability/:id             # Get tutor availability (auth required)
POST   /api/v1/tutor/tutor-availability           # Set availability (auth required)
DELETE /api/v1/tutor/delete-availability/:id      # Delete availability (auth required)
```

## Authentication

### Better-Auth Integration

The application uses **Better-Auth** for comprehensive authentication:

**Features**:
- Email/password authentication
- Social login (Google, GitHub)
- Session management with cookie caching (30 min)
- Role-based access (ADMIN, STUDENT, TUTOR)
- Secure cookies in production
- CSRF protection (disabled for API testing)
- Trusted origins validation

**User Creation Hook**:
When a user registers with role "TUTOR", a `TutorProfile` is automatically created via database hook.

**Session Management**:
```typescript
session: {
  cookieCache: {
    enabled: true,
    maxAge: 30 * 60, // 30 minutes
  },
}
```

**Additional Fields**:
- phone (optional)
- image (optional)
- role (default: STUDENT)
- status (default: ACTIVE)

## Error Handling

### Global Error Handler

The application implements comprehensive error handling via `globalErrorHandler.ts`:

**Prisma Error Handling**:
- **P2025**: Record not found (400)
- **P2002**: Unique constraint violation (400)
- **P2003**: Foreign key constraint failed (400)
- **P1000**: Database authentication failed (401)
- **P1001**: Cannot reach database server (400)

**Generic Errors**:
- **PrismaClientValidationError**: Invalid field types (400)
- **PrismaClientUnknownRequestError**: Unknown error (500)
- **Default**: Internal Server Error (500)

### CORS Configuration

The backend implements **flexible CORS** to support:
- Local development (`localhost:3000`)
- Production frontend
- Vercel preview deployments (pattern-based)
- Mobile apps and tools (requests with no origin)

```typescript
origin: (origin, callback) => {
  // Allows localhost, production URLs, and all Vercel deployments
  const isAllowed = allowedOrigins.includes(origin) || 
                   /^https:\/\/.*\.vercel\.app$/.test(origin);
}
```

## Key Features

### 1. Advanced Tutor Filtering
- Search by subjects or category name (case-insensitive)
- Filter by featured status, price range, ratings
- Only verified tutors are shown
- Automatic average rating calculation
- Review count aggregation

### 2. Availability Management
- Tutors can set time-slot-based availability
- Unique constraint prevents double-booking
- Availability slots cannot be deleted if bookings exist
- Subject-specific time slots

### 3. Smart Pagination
Helper function (`paginationHelper.ts`) provides:
- Page-based pagination
- Configurable limit per page
- Skip calculation
- Sorting support (field + order)
- Total page calculation

### 4. Database Hooks
Automatic tutor profile creation when user registers as TUTOR:
```typescript
databaseHooks: {
  user: {
    create: {
      after: async (user) => {
        if (user.role === "TUTOR") {
          await prisma.tutorProfile.create({ data: { user_id: user.id } });
        }
      },
    },
  },
}
```

## Deployment

### Vercel Deployment

The backend is configured for **Vercel** deployment:

**vercel.json** configuration:
- Build command: Generates Prisma client and builds TypeScript
- Output directory: `api/`
- Platform: Node.js 20
- External packages: `pg-native` (excluded from bundle)

**Deployment Steps**:
1. Connect repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

### Environment Setup
Ensure all environment variables are configured in:
- `.env.local` for Vercel production
- Vercel dashboard for deployment

## Development Guidelines

### Adding New Endpoints

1. **Create Service Function** (e.g., `tutor.service.ts`)
   ```typescript
   const newServiceFunction = async (params) => {
     const result = await prisma.model.action();
     return result;
   };
   ```

2. **Create Controller** (e.g., `tutor.controller.ts`)
   ```typescript
   const newController = async (req: Request, res: Response, next: NextFunction) => {
     try {
       const result = await tutorService.newServiceFunction(params);
       res.status(200).json({ message: "Success", data: result });
     } catch (error) {
       next(error);
     }
   };
   ```

3. **Add Route** (e.g., `tutor.router.ts`)
   ```typescript
   router.get('/new-route', tutorController.newController);
   ```

### Database Changes

1. **Update Prisma Schema** (`prisma/schema/*.prisma`)
2. **Create Migration**
   ```bash
   npx prisma migrate dev --name migration_name
   ```
3. **Generate Client**
   ```bash
   npx prisma generate
   ```

## API Testing

**Recommended Tools**:
- Postman
- Thunder Client (VS Code)
- cURL

**Authentication Testing**:
CSRF check is disabled to allow testing with Postman/tools without Origin header.

## Support & Contribution

**Repository**: [GitHub - SkillBridge Private Tutor Service](https://github.com/sohelranalive/SkillBridge-private-tutor-service-server)

**Issues**: Report bugs or request features via GitHub Issues

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**License**: ISC
