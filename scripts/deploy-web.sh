#!/bin/bash

# Railway Web Deployment Script
echo "🚀 Deploying BLVKDOT Web to Railway..."

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --filter web...

# Build the application
echo "🔨 Building web application..."
pnpm --filter web build

echo "✅ Web deployment complete!"