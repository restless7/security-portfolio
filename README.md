# 🛡️ Security Portfolio - "Secure by Design"

> **A professional cybersecurity portfolio website that demonstrates security best practices through its own implementation. This project serves as both a showcase of cybersecurity expertise and a practical demonstration of secure web development practices.**

[![Security-First CI/CD Pipeline](https://github.com/restless7/security-portfolio/actions/workflows/security-ci.yml/badge.svg)](https://github.com/restless7/security-portfolio/actions/workflows/security-ci.yml)
[![Security Health Check](https://github.com/restless7/security-portfolio/actions/workflows/trigger-cron.yml/badge.svg)](https://github.com/restless7/security-portfolio/actions/workflows/trigger-cron.yml)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Security Grade](https://img.shields.io/badge/Security%20Grade-A+-brightgreen.svg)](#security-testing)

## 🚨 Security-First Architecture

This portfolio is built with a **"Security by Design"** philosophy, where every component, endpoint, and interaction is hardened against common vulnerabilities:

- **🔒 Strict Security Headers**: CSP, HSTS, X-Content-Type-Options, X-Frame-Options, and more
- **🛡️ Input Validation**: Comprehensive Zod validation on all user inputs
- **⚡ Rate Limiting**: API endpoints protected against abuse with Upstash Redis
- **🔍 XSS Prevention**: Input sanitization and output encoding
- **📊 Live Security Monitoring**: Real-time security posture analysis
- **🎯 Zero Trust Approach**: Every interaction is validated and secured
- **🔄 DevSecOps Pipeline**: Automated security testing and continuous monitoring
- **⏰ 24/7 Health Checks**: Continuous security validation every 6 hours

## 🏗️ Technical Stack

### Core Technologies
- **Next.js 14+** with App Router - Modern React framework with Server Components
- **TypeScript** - Type safety for enhanced security
- **Tailwind CSS v3** - Utility-first styling with custom security theme
- **Prisma** - Type-safe database ORM with query parameterization
- **Zod** - Runtime type validation for all inputs

### Security Dependencies
- **@upstash/ratelimit** - Redis-based rate limiting
- **@upstash/redis** - Serverless Redis for security state
- **lucide-react** - Security-themed iconography
- **framer-motion** - Smooth animations with performance optimization

### Development Tools
- **ESLint** - Code quality and security linting
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS processing pipeline

## 🎨 Design Philosophy: "Guardian Silent"

The visual design embodies cybersecurity principles:
- **Dark Theme**: Terminal-inspired aesthetic
- **Cyan (#00ffff)** and **Green (#00ff88)** accents - Classic security/hacker colors
- **Monospace Typography** - Code-focused, technical appearance
- **Subtle Glows**: Terminal-like visual effects
- **High Contrast**: Accessibility and readability focused

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Git for version control

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
security-portfolio/
├── app/                          # Next.js App Router
│   ├── components/              # Reusable UI components
│   │   ├── SecurityScorecard.tsx   # Live security score display
│   │   ├── AnimatedTerminal.tsx     # Terminal animation
│   │   └── Navigation.tsx           # Secure navigation
│   ├── lib/                     # Utility libraries
│   │   ├── utils.ts                # Common utilities + security helpers
│   │   └── validations.ts          # Zod validation schemas
│   ├── projects/               # Projects showcase pages
│   ├── security-posture/       # Live security analysis
│   ├── layout.tsx              # Root layout with security headers
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles with security theme
├── public/                     # Static assets
├── next.config.ts              # Next.js config with security headers
├── tailwind.config.js          # Tailwind with security color palette
└── postcss.config.js           # PostCSS configuration
```

## 🔐 Security Features Implemented

### 1. **Security Headers** (`next.config.ts`)
- **Content Security Policy (CSP)**: Prevents XSS by controlling resource loading
- **Strict Transport Security (HSTS)**: Enforces HTTPS connections
- **X-Content-Type-Options**: Prevents MIME sniffing attacks
- **X-Frame-Options**: Prevents clickjacking
- **Referrer Policy**: Controls referrer information leakage
- **Permissions Policy**: Limits browser API access

### 2. **Input Validation** (`lib/validations.ts`)
- Comprehensive Zod schemas for all user inputs
- Malicious pattern detection
- Type-safe data parsing and sanitization
- Custom validation rules for security contexts

### 3. **Component-Level Security**
- Props validation and sanitization
- Secure rendering practices
- No dangerouslySetInnerHTML usage
- Controlled component state management

## 🎯 Development Status

### Completed ✅
- [x] **Project Architecture**: Complete Next.js 14+ setup with TypeScript and Tailwind CSS
- [x] **Security Headers**: Production-ready CSP, HSTS, and security policy configuration
- [x] **Core Components**: Interactive terminal animations, security scorecard, navigation
- [x] **Homepage**: Comprehensive hero section with live security demonstrations
- [x] **Skills Page**: Interactive security arsenal with 6 specialized domains and 35+ skills
- [x] **Certifications Page**: Professional credentials showcase with filtering and verification
- [x] **About Page**: Professional journey timeline with philosophy and approach
- [x] **Contact Page**: Fully secured contact form with real-time validation
- [x] **API Endpoint**: Secure contact form processing with rate limiting and sanitization
- [x] **Security Theme**: "Guardian Silent" dark aesthetic with cybersecurity colors
- [x] **Mobile Responsive**: Full responsive design across all devices

### Security Features Implemented ✅
- [x] **Zod Validation**: Comprehensive input validation with malicious pattern detection
- [x] **Rate Limiting**: In-memory rate limiting (ready for Redis upgrade)
- [x] **Input Sanitization**: XSS prevention through input/output sanitization
- [x] **Security Headers**: Full CSP, HSTS, CSRF, and clickjacking protection
- [x] **Error Handling**: Secure error responses without information leakage
- [x] **CORS Configuration**: Proper cross-origin resource sharing setup
- [x] **Method Validation**: HTTP method restrictions on API endpoints

### Recently Completed 🚧➡️✅
- [x] **Live Security Posture Dashboard**: Real-time security monitoring at `/security-posture`
- [x] **Advanced Rate Limiting**: Production-ready with Upstash Redis integration
- [x] **Comprehensive Security Testing**: Jest test suite with security focus
- [x] **Environment Security**: Runtime validation and secrets management
- [x] **Security Documentation**: Complete OWASP ASVS mapping and verification guides
- [x] **Automated Security Scripts**: Command-line security testing and validation
- [x] **Security-First CI/CD Pipeline**: 3-phase automated security validation
- [x] **Continuous Security Monitoring**: GitHub Actions-based health checks every 6 hours
- [x] **DevSecOps Integration**: Vulnerability scanning, license compliance, secret detection

### Next Phase 📋
- [ ] **Production Hardening**: CSP nonces, stricter policies
- [x] **CI/CD Security Integration**: ✅ GitHub Actions with comprehensive security checks
- [ ] **Security Monitoring Alerts**: Real-time threat detection and Slack/Discord integration
- [ ] **Advanced Threat Modeling**: Extended attack surface analysis
- [ ] **SAST/DAST Integration**: Advanced static and dynamic security analysis

## 🔄 DevSecOps Pipeline

### 🛡️ Security-First CI/CD Pipeline

A comprehensive **3-phase security validation pipeline** that executes on every code change:

#### **Phase 1: Security Audit** (1m 13s)
- ✅ **Dependency Vulnerability Scanning** - Blocks critical vulnerabilities
- ✅ **License Compliance Checking** - Identifies GPL/AGPL conflicts
- ✅ **Security-focused ESLint** - Custom security rules enforcement
- ✅ **Secret Detection** - Git history and source code scanning

#### **Phase 2: Security Testing** (41s)
- ✅ **17 Security Test Cases** - XSS, input validation, rate limiting
- ✅ **Coverage Analysis** - >80% coverage on security-critical paths
- ✅ **Application Security** - CORS, HTTP method validation
- ✅ **Environment Security** - Secret exposure prevention

#### **Phase 3: Infrastructure Security** (6s)
- ✅ **Configuration Security** - CSP, HSTS header validation
- ✅ **API Route Integrity** - Endpoint security verification
- ✅ **Build Artifact Scanning** - Prevents credential leakage

### 🔐 Continuous Security Monitoring

**Security Health Checks** run **every 6 hours** via GitHub Actions:
- 🏥 **System Health Validation** - Endpoint availability and performance
- 🛡️ **Security Posture Assessment** - Real-time security score calculation
- 🧹 **Rate Limit Cleanup** - Memory optimization and maintenance
- 🚨 **Error Monitoring** - Failed request tracking and alerting

**📋 [Complete DevSecOps Documentation](./docs/SECURITY-CICD.md)**

---

## 🧪 Security Testing

### Current Security Score: A+ (96/100)

#### Automated Security Test Suite

Run the complete security validation:

```bash
# Full security audit
npm run security:check

# Run security-focused unit tests
npm run test:security

# Test with coverage
npm run test:coverage

# Dependency vulnerability scan
npm run security:audit
```

#### Manual Security Testing

1. **Security Headers Verification**
   ```bash
   # Quick headers check
   npm run security:headers
   
   # Or manually:
   curl -I http://localhost:3000
   ```

2. **Input Validation Testing**
   ```bash
   # Test malicious input rejection
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"<script>alert(1)</script>","email":"test@example.com","subject":"test","message":"test"}'
   ```

3. **Rate Limiting Verification**
   ```bash
   # Test rate limiting (should trigger on 6th request)
   for i in {1..6}; do curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","subject":"Test '$i'","message":"Rate limit test"}'; done
   ```

#### Live Security Monitoring

Visit `/security-posture` for real-time security assessment:
- Live security score and grade
- Detailed security check results
- OWASP and NIST compliance metrics
- External verification guides

**API Endpoint**: `GET /api/security-posture`

#### External Security Verification

- **[Mozilla Observatory](https://observatory.mozilla.org/)** - A+ rating target
- **[Security Headers](https://securityheaders.com/)** - Headers analysis
- **[SSL Labs](https://www.ssllabs.com/ssltest/)** - TLS configuration (production)

#### Security Testing Tools Integration

- **OWASP ZAP** - Web application security scanner
- **Burp Suite** - Manual security testing
- **Jest** - Unit testing with security focus
- **curl** - Command-line security testing

---

## 📚 Documentation

### **Security & DevSecOps Guides**
- 📋 **[Security-First CI/CD Pipeline](./docs/SECURITY-CICD.md)** - Complete DevSecOps implementation guide
  - Multi-phase security validation architecture
  - Continuous monitoring and health checks
  - Security metrics and incident response
  - Enterprise-grade security automation

### **Quick References**
- 🔒 **[Security Architecture Overview](./docs/SECURITY-ARCHITECTURE.md)** - Security design patterns and controls
- 🧪 **[Security Testing Guide](./docs/SECURITY-TESTING.md)** - Comprehensive testing methodologies
- 📊 **[Monitoring & Alerting](./docs/MONITORING.md)** - Continuous security monitoring setup
- 🚀 **[Deployment Guide](./docs/DEPLOYMENT.md)** - Secure deployment with Vercel
- 🔧 **[Configuration Reference](./docs/CONFIGURATION.md)** - Environment and security configuration

---

*"Every line of code is a potential entry point—I make sure it's not."*

**Built with security in mind. Powered by expertise.**

[![GitHub stars](https://img.shields.io/github/stars/restless7/security-portfolio?style=social)](https://github.com/restless7/security-portfolio/stargazers)

---

**🔗 Connect with me:**
- 🌐 **[Live Portfolio](https://your-portfolio-url.vercel.app)**
- 🔒 **[Security Dashboard](https://your-portfolio-url.vercel.app/security-posture)**
- 🐙 **[GitHub Profile](https://github.com/restless7)**
- 💼 **[LinkedIn](https://linkedin.com/in/your-profile)**

*Demonstrating enterprise-grade cybersecurity through practical implementation.*
