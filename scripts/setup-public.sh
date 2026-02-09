#!/bin/bash
# Copy static files to public directory for Next.js serving
mkdir -p public
cp index.html public/index.html
cp portfolio-details.html public/portfolio-details.html 2>/dev/null || true
cp -r assets public/assets
cp -r forms public/forms 2>/dev/null || true
echo "Static files copied to public/"
