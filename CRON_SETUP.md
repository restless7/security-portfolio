# 🔐 GitHub Actions Cron Setup Guide

This guide explains how to set up automated security health checks using GitHub Actions instead of Vercel cron jobs (required for Hobby plan compatibility).

## 📋 Overview

**Problem**: Vercel Hobby accounts only allow cron jobs that run once per day, but our security health checks need to run every 6 hours.

**Solution**: Use GitHub Actions (free) to trigger our secure API endpoint every 6 hours.

## 🏗️ Architecture

```
┌─────────────────┐    HTTP GET     ┌──────────────────┐    Internal     ┌─────────────────┐
│ GitHub Actions  │ ─────────────►  │ /api/cron        │ ──────────────► │ Health Check    │
│ (Every 6 hours) │    + Secret     │ (Vercel)         │    API calls    │ APIs            │
└─────────────────┘                 └──────────────────┘                 └─────────────────┘
```

## ⚙️ Setup Instructions

### Step 1: Generate a Secure Secret

Generate a strong random secret for authentication:

```bash
# Option 1: Using OpenSSL (recommended)
openssl rand -hex 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: Online generator (ensure HTTPS)
# Visit: https://passwordsgenerator.net/ (64+ characters)
```

**Example output**: `a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456`

### Step 2: Configure Vercel Environment Variables

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:

```
Name: CRON_SECRET
Value: [your-generated-secret-from-step-1]
Environment: Production, Preview, Development
```

### Step 3: Configure GitHub Repository Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

```
Name: CRON_SECRET
Value: [same-secret-from-step-2]
```

4. **Optional**: Add your deployment URL:

```
Name: VERCEL_DEPLOYMENT_URL
Value: https://your-portfolio.vercel.app
```

### Step 4: Deploy and Test

1. **Deploy to Vercel**: The workflow files are already committed
2. **Test the API endpoint manually**:

```bash
curl -H "Authorization: YOUR_CRON_SECRET" \
     https://your-portfolio.vercel.app/api/cron
```

3. **Test GitHub Actions**:
   - Go to **Actions** tab in your GitHub repository
   - Find "🔐 Security Health Check (Every 6 Hours)"
   - Click **Run workflow** → **Run workflow** (manual test)

## 📅 Schedule Details

- **Frequency**: Every 6 hours (4 times per day)
- **Times**: 00:00, 06:00, 12:00, 18:00 UTC
- **Timezone**: All times are in UTC
- **Manual Trigger**: Available for testing

## 🔍 What Gets Checked

The automated health check performs these tasks:

1. **Security Health Check** (`/api/security/health-check`)
   - Environment variables validation
   - Security posture API status
   - Rate limiting service status
   - Security headers validation
   - Memory usage monitoring

2. **Security Posture Validation** (`/api/security-posture`)
   - Security headers analysis
   - Input validation checks
   - Rate limiting verification
   - CORS policy validation
   - Content security evaluation

3. **Rate Limit Cleanup**
   - Cleans up old in-memory rate limit entries
   - Prevents memory leaks in long-running processes

## 🚨 Monitoring & Alerts

### GitHub Actions Logs

Check the workflow execution:
1. Go to **Actions** tab in your repository
2. Click on any workflow run
3. Expand the "🏥 Execute Health Check" step to see detailed logs

### Expected Success Output

```
✅ Security health check completed successfully!
🎯 All scheduled tasks completed successfully
🏥 Health Check Status: success
🛡️ Security Posture Status: success
```

### Common Error Responses

| Error | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Missing or incorrect `CRON_SECRET` | Verify secrets match in both Vercel and GitHub |
| `404 Not Found` | Wrong deployment URL | Check `VERCEL_DEPLOYMENT_URL` or verify deployment |
| `500 Server Error` | Health check tasks failed | Check Vercel function logs |

## 🛠️ Troubleshooting

### 1. Authentication Failures

```bash
# Verify your secret works manually:
curl -v -H "Authorization: YOUR_SECRET" https://your-site.vercel.app/api/cron

# Check both secrets match:
echo "GitHub Secret: [check in GitHub Actions logs]"
echo "Vercel Secret: [check in Vercel dashboard]"
```

### 2. Workflow Not Running

- Ensure the repository has Actions enabled
- Check the workflow file syntax
- Verify the repository is not archived

### 3. Health Check Tasks Failing

Check Vercel function logs:
1. Go to Vercel Dashboard → Functions
2. Click on the failing function
3. View the logs for error details

## 🔐 Security Considerations

### Secret Management
- ✅ Use strong, randomly generated secrets (64+ characters)
- ✅ Store secrets in encrypted environment variables only
- ✅ Never commit secrets to version control
- ✅ Rotate secrets regularly (quarterly)

### API Endpoint Security
- ✅ Requires authentication for all requests
- ✅ Logs unauthorized access attempts
- ✅ Rate limiting applies to prevent abuse
- ✅ No sensitive data in responses
- ✅ Secure HTTP headers enforced

### Monitoring
- ✅ All requests are logged with timestamps
- ✅ Failed authentication attempts are logged
- ✅ Health check results are tracked
- ✅ GitHub Actions provides audit trail

## 📊 Cost Analysis

| Service | Cost | Usage |
|---------|------|-------|
| **GitHub Actions** | Free | 2,000 minutes/month (our usage: ~2 minutes/month) |
| **Vercel Hobby** | Free | Function executions included |
| **Total** | **$0** | **100% free solution** |

## 🚀 Advanced Configuration

### Custom Schedule

To change the frequency, edit `.github/workflows/trigger-cron.yml`:

```yaml
schedule:
  # Every 4 hours: '0 */4 * * *'
  # Every 12 hours: '0 */12 * * *'  
  # Once daily at midnight: '0 0 * * *'
  - cron: '0 */6 * * *'  # Current: every 6 hours
```

### Notification Integration

Add Slack/Discord notifications on failure by modifying the workflow:

```yaml
- name: 🚨 Notify on Failure
  if: failure()
  run: |
    curl -X POST -H 'Content-type: application/json' \
      --data '{"text":"🚨 Security health check failed!"}' \
      ${{ secrets.SLACK_WEBHOOK_URL }}
```

## ✅ Verification Checklist

Before marking the setup as complete:

- [ ] CRON_SECRET generated and configured in both Vercel and GitHub
- [ ] VERCEL_DEPLOYMENT_URL set (or workflow updated with correct URL)
- [ ] Manual workflow test passed
- [ ] API endpoint responds correctly to authenticated requests
- [ ] API endpoint rejects unauthenticated requests
- [ ] Health check tasks execute successfully
- [ ] GitHub Actions logs show expected output

## 🆘 Support

If you encounter issues:

1. **Check the logs**: GitHub Actions → Latest workflow run → Expand steps
2. **Verify secrets**: Both GitHub and Vercel must have matching `CRON_SECRET`
3. **Test manually**: Use curl to test the API endpoint directly
4. **Check deployment**: Ensure the `/api/cron` route is deployed on Vercel

---

**🎉 Congratulations!** Your security portfolio now has automated health checks running every 6 hours, completely free on GitHub Actions, bypassing Vercel Hobby limitations while maintaining enterprise-grade security monitoring.
