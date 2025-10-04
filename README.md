# BLVKDOT Web Application

A full-featured promo code issuance and redemption system for BLVKDOT, featuring a secure NestJS backend API and a modern Next.js frontend.

## 🏗️ Architecture

- **Backend**: NestJS REST API with PostgreSQL (Prisma ORM)
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and Framer Motion
- **Database**: PostgreSQL with Prisma migrations
- **Authentication**: JWT with role-based access control
- **Security**: Helmet, CORS, rate limiting, input validation
- **Deployment**: Docker containers with Docker Compose

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm
- Docker and Docker Compose
- PostgreSQL (for local development)

### Local Development

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd blvkdot
   cp .env.example .env
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup database**
   ```bash
   # Generate Prisma client
   pnpm --filter api prisma generate
   
   # Run migrations
   pnpm --filter api prisma migrate dev
   
   # Seed database
   pnpm --filter api prisma db seed
   ```

4. **Start development servers**
   ```bash
   pnpm dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - API Documentation: http://localhost:4000/api-docs

### Docker Development

```bash
# Start all services
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📋 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/blvkdot

# API Configuration
API_PORT=4000
API_JWT_SECRET=your-super-secret-jwt-key
API_RATE_LIMIT_POINTS=200
API_RATE_LIMIT_DURATION=60
CORS_ORIGIN=http://localhost:3000

# Redis (for rate limiting)
REDIS_HOST=localhost
REDIS_PORT=6379

# Admin credentials (created during seed)
ADMIN_EMAIL=admin@blvkdot.ng
ADMIN_PASSWORD=ChangeMeNow_2025

# Social media links
WHATSAPP_CHANNEL_URL=https://wa.me/message/PLACEHOLDER
INSTAGRAM_URL=https://instagram.com/blvkdot
TIKTOK_URL=https://tiktok.com/@blvkdot

# Frontend configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
PROMO_CODE_EXPIRY_DAYS=30
```

## 🔐 Authentication

### Default Users (created during seed)

- **Admin**: `admin@blvkdot.ng` / `ChangeMeNow_2025`
- **Attendant**: `attendant@blvkdot.ng` / `DemoAttendant2025!`

### User Roles

- **ADMIN**: Full access to campaigns, codes, exports, and system management
- **ATTENDANT**: Can redeem codes and view redemption history

## 📱 Features

### Public Features
- **Landing Page**: BLVKDOT branding with social media links
- **Code Claim**: Follow social media → claim free game code
- **Device Tracking**: Fraud prevention with device ID generation

### Admin Features
- **Campaign Management**: Create, edit, archive campaigns
- **QR Code Generation**: Generate QR codes for campaigns
- **Code Management**: View and export promo codes
- **Analytics**: View redemption statistics and conversion rates
- **CSV Exports**: Export codes and redemption data

### Attendant Features
- **Code Redemption**: Lookup and redeem promo codes
- **Follow Verification**: Verify social media follows before redemption
- **Redemption History**: View past redemptions

## 🔧 API Endpoints

### Public Endpoints
- `POST /api/promo/:id/issue-code` - Issue promo code
- `GET /api/promo/:id/status` - Get campaign status
- `GET /api/health` - Health check

### Protected Endpoints
- `POST /api/auth/login` - User login
- `GET /api/campaigns` - List campaigns (ADMIN)
- `POST /api/campaigns` - Create campaign (ADMIN)
- `GET /api/campaigns/:id/qr` - Generate QR code (ADMIN)
- `POST /api/redeem/lookup` - Lookup code (ATTENDANT)
- `POST /api/redeem/confirm` - Confirm redemption (ATTENDANT)
- `GET /api/exports/campaign/:id/codes.csv` - Export codes (ADMIN)

## 🧪 Testing

### Backend Tests
```bash
# Run all tests
pnpm --filter api test

# Run tests in watch mode
pnpm --filter api test:watch

# Run e2e tests
pnpm --filter api test:e2e
```

### Frontend Tests
```bash
# Run all tests
pnpm --filter web test

# Run tests in watch mode
pnpm --filter web test:watch
```

## 🚀 Deployment

### Database (Supabase/RDS)

1. Create PostgreSQL database
2. Set `DATABASE_URL` environment variable
3. Run migrations: `pnpm --filter api prisma migrate deploy`
4. Seed database: `pnpm --filter api prisma db seed`

### Backend API (Render/Fly.io)

#### Render
1. Create new Web Service
2. Root directory: `apps/api`
3. Build command: `pnpm install --filter api... && pnpm --filter api build`
4. Start command: `node dist/main.js`
5. Add environment variables

#### Fly.io
```bash
cd apps/api
flyctl launch --no-deploy
flyctl secrets set DATABASE_URL=...
flyctl secrets set API_JWT_SECRET=...
flyctl deploy
```

### Frontend (Vercel)

1. Connect repository to Vercel
2. Root directory: `apps/web`
3. Framework: Next.js
4. Add environment variables:
   - `NEXT_PUBLIC_API_BASE_URL`
   - `NEXT_PUBLIC_WHATSAPP_URL`
   - `NEXT_PUBLIC_INSTAGRAM_URL`
   - `NEXT_PUBLIC_TIKTOK_URL`

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: ADMIN and ATTENDANT roles
- **Rate Limiting**: Redis-backed rate limiting for API endpoints
- **Input Validation**: Comprehensive DTO validation
- **CORS Protection**: Configurable CORS policies
- **Helmet**: Security headers
- **Fraud Prevention**: Device ID tracking and IP-based limits

## 📊 Monitoring & Logging

- **Structured Logging**: Winston-based logging
- **Health Checks**: `/api/health` endpoint
- **Housekeeping**: Automated code expiration and log cleanup
- **Error Handling**: Centralized exception handling

## 🛠️ Development

### Database Management
```bash
# View database in Prisma Studio
pnpm --filter api prisma studio

# Create new migration
pnpm --filter api prisma migrate dev --name migration-name

# Reset database
pnpm --filter api prisma migrate reset
```

### Code Quality
```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm --filter api build
pnpm --filter web build
```

## 📝 API Documentation

Interactive API documentation is available at `/api-docs` when the backend is running.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is proprietary software for BLVKDOT.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation at `/api-docs`

---

**BLVKDOT - ONE SHOT. ONE KING.**
