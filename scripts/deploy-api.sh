#!/bin/bash

# Railway API Deployment Script
echo "🚀 Deploying BLVKDOT API to Railway..."

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --filter api...

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
pnpm --filter api prisma generate

# Build the application
echo "🔨 Building API..."
pnpm --filter api build

# Run migrations
echo "🔄 Running database migrations..."
pnpm --filter api prisma migrate deploy

# Seed database
echo "🌱 Seeding database..."
pnpm --filter api prisma db seed

echo "✅ API deployment complete!"