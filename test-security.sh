#!/bin/bash

# Security Headers Test Script
# Tests the security posture of the portfolio website

echo "🛡️  Security Portfolio - Security Headers Test"
echo "=============================================="
echo ""

# Test if development server is running
echo "Testing development server security headers..."
echo ""

# Test main page headers
echo "📋 Main Page Headers:"
curl -I -s http://localhost:3000 | head -20

echo ""
echo "📋 API Endpoint Headers:"
curl -I -s http://localhost:3000/api/health | head -20

echo ""
echo "🔍 Security Header Analysis:"
echo ""

# Check for key security headers
echo "Content-Security-Policy:"
curl -I -s http://localhost:3000 | grep -i "content-security-policy" || echo "❌ Not found"

echo ""
echo "Strict-Transport-Security:"
curl -I -s http://localhost:3000 | grep -i "strict-transport-security" || echo "❌ Not found"

echo ""
echo "X-Frame-Options:"
curl -I -s http://localhost:3000 | grep -i "x-frame-options" || echo "❌ Not found"

echo ""
echo "X-Content-Type-Options:"
curl -I -s http://localhost:3000 | grep -i "x-content-type-options" || echo "❌ Not found"

echo ""
echo "Permissions-Policy:"
curl -I -s http://localhost:3000 | grep -i "permissions-policy" || echo "❌ Not found"

echo ""
echo "X-Powered-By (should not be present):"
curl -I -s http://localhost:3000 | grep -i "x-powered-by" && echo "⚠️  Found (should be hidden)" || echo "✅ Hidden (Good)"

echo ""
echo "🎯 Security Test Complete!"
echo ""
echo "To run this test:"
echo "1. Start the dev server: npm run dev"
echo "2. Run this script: ./test-security.sh"
echo ""
