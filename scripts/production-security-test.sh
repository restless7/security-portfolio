#!/bin/bash

# Production Security Testing Script
# Validates security controls in production environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Default production URL (override with environment variable)
PROD_URL="${SECURITY_PORTFOLIO_URL:-https://your-security-portfolio.vercel.app}"

echo -e "${BLUE}🛡️  Production Security Validation Suite${NC}"
echo -e "${BLUE}Testing URL: ${PROD_URL}${NC}"
echo -e "${BLUE}Timestamp: $(date -u +"%Y-%m-%d %H:%M:%S UTC")${NC}"
echo ""

# Function to make HTTP request with error handling
http_request() {
    local url="$1"
    local method="${2:-GET}"
    local headers="${3:-}"
    
    if [ -n "$headers" ]; then
        curl -s -X "$method" -H "$headers" "$url" 2>/dev/null || echo "HTTP_ERROR"
    else
        curl -s -X "$method" "$url" 2>/dev/null || echo "HTTP_ERROR"
    fi
}

# Function to get HTTP headers
get_headers() {
    local url="$1"
    curl -s -I "$url" 2>/dev/null || echo "HEADERS_ERROR"
}

# Function to test external security scanners
test_external_scanners() {
    echo -e "${YELLOW}🔍 External Security Scanner Integration...${NC}"
    
    local domain="${PROD_URL#https://}"
    domain="${domain#http://}"
    
    # Mozilla Observatory API
    echo -e "${BLUE}   Testing Mozilla Observatory API...${NC}"
    local obs_response=$(curl -s -X POST "https://http-observatory.security.mozilla.org/api/v1/analyze?host=${domain}" || echo "ERROR")
    
    if [[ "$obs_response" != "ERROR" ]] && echo "$obs_response" | grep -q "scan_id"; then
        echo -e "${GREEN}✅ Mozilla Observatory scan initiated${NC}"
        local scan_id=$(echo "$obs_response" | jq -r '.scan_id // "unknown"')
        echo -e "${BLUE}   Scan ID: $scan_id${NC}"
    else
        echo -e "${YELLOW}⚠️  Mozilla Observatory scan failed or unavailable${NC}"
    fi
    
    # Security Headers API
    echo -e "${BLUE}   Testing Security Headers API...${NC}"
    local headers_response=$(curl -s "https://securityheaders.com/?q=${PROD_URL}&hide=on&followRedirects=on" || echo "ERROR")
    
    if [[ "$headers_response" != "ERROR" ]] && echo "$headers_response" | grep -q "grade"; then
        echo -e "${GREEN}✅ Security Headers scan completed${NC}"
    else
        echo -e "${YELLOW}⚠️  Security Headers scan failed or unavailable${NC}"
    fi
    
    echo ""
}

# Function to test production security headers
test_production_headers() {
    echo -e "${YELLOW}🔍 Production Security Headers Analysis...${NC}"
    
    local headers_response=$(get_headers "$PROD_URL")
    local score=0
    local total=12
    
    if [[ "$headers_response" == "HEADERS_ERROR" ]]; then
        echo -e "${RED}❌ Unable to fetch headers from $PROD_URL${NC}"
        return 1
    fi
    
    # Test critical security headers
    local critical_headers=(
        "content-security-policy:Content Security Policy"
        "strict-transport-security:HTTP Strict Transport Security" 
        "x-content-type-options:X-Content-Type-Options"
        "x-frame-options:X-Frame-Options"
    )
    
    for header_info in "${critical_headers[@]}"; do
        local header="${header_info%:*}"
        local description="${header_info#*:}"
        
        if echo "$headers_response" | grep -qi "$header"; then
            echo -e "${GREEN}✅ $description${NC}"
            ((score++))
        else
            echo -e "${RED}❌ $description missing${NC}"
        fi
    done
    
    # Test additional security headers
    local additional_headers=(
        "referrer-policy:Referrer Policy"
        "permissions-policy:Permissions Policy"
        "cross-origin-opener-policy:Cross-Origin Opener Policy"
        "cross-origin-resource-policy:Cross-Origin Resource Policy"
        "cross-origin-embedder-policy:Cross-Origin Embedder Policy"
    )
    
    for header_info in "${additional_headers[@]}"; do
        local header="${header_info%:*}"
        local description="${header_info#*:}"
        
        if echo "$headers_response" | grep -qi "$header"; then
            echo -e "${GREEN}✅ $description${NC}"
            ((score++))
        else
            echo -e "${YELLOW}⚠️  $description missing${NC}"
        fi
    done
    
    # Check for information disclosure headers (should be absent)
    local bad_headers=("server" "x-powered-by" "x-aspnet-version")
    
    for header in "${bad_headers[@]}"; do
        if echo "$headers_response" | grep -qi "$header"; then
            echo -e "${YELLOW}⚠️  Information disclosure: $header header present${NC}"
        else
            echo -e "${GREEN}✅ No $header header (good)${NC}"
            ((score++))
        fi
    done
    
    # Calculate percentage
    local percentage=$((score * 100 / total))
    
    echo -e "${BLUE}📊 Security Headers Score: ${score}/${total} (${percentage}%)${NC}"
    
    if [ $percentage -ge 90 ]; then
        echo -e "${GREEN}🎉 Excellent header security!${NC}"
    elif [ $percentage -ge 75 ]; then
        echo -e "${YELLOW}👍 Good header security${NC}"
    else
        echo -e "${RED}⚠️  Header security needs improvement${NC}"
    fi
    
    echo ""
    return 0
}

# Function to test API security
test_api_security() {
    echo -e "${YELLOW}🔍 Production API Security Testing...${NC}"
    
    local api_score=0
    local api_total=6
    
    # Test 1: Security Posture API
    echo -e "${BLUE}   Testing Security Posture API...${NC}"
    local posture_response=$(http_request "$PROD_URL/api/security-posture")
    
    if [[ "$posture_response" != "HTTP_ERROR" ]] && echo "$posture_response" | jq -e '.score' > /dev/null 2>&1; then
        local security_score=$(echo "$posture_response" | jq -r '.score // 0')
        local grade=$(echo "$posture_response" | jq -r '.grade // "F"')
        echo -e "${GREEN}✅ Security Posture API working (Score: ${security_score}, Grade: ${grade})${NC}"
        ((api_score++))
    else
        echo -e "${RED}❌ Security Posture API failed${NC}"
    fi
    
    # Test 2: Health Check API
    echo -e "${BLUE}   Testing Health Check API...${NC}"
    local health_response=$(http_request "$PROD_URL/api/security/health-check")
    
    if [[ "$health_response" != "HTTP_ERROR" ]] && echo "$health_response" | jq -e '.status' > /dev/null 2>&1; then
        local health_status=$(echo "$health_response" | jq -r '.status')
        echo -e "${GREEN}✅ Health Check API working (Status: ${health_status})${NC}"
        ((api_score++))
    else
        echo -e "${RED}❌ Health Check API failed${NC}"
    fi
    
    # Test 3: Contact API Input Validation
    echo -e "${BLUE}   Testing Contact API input validation...${NC}"
    local malicious_payload='{"name":"<script>alert(1)</script>","email":"test@example.com","subject":"test","message":"test"}'
    local contact_response=$(http_request "$PROD_URL/api/contact" "POST" "Content-Type: application/json" <<< "$malicious_payload")
    
    if [[ "$contact_response" != "HTTP_ERROR" ]] && (echo "$contact_response" | grep -q "error\|validation" || echo "$contact_response" | jq -e '.success == false' > /dev/null 2>&1); then
        echo -e "${GREEN}✅ Contact API properly rejects malicious input${NC}"
        ((api_score++))
    else
        echo -e "${RED}❌ Contact API may accept malicious input${NC}"
    fi
    
    # Test 4: Rate Limiting
    echo -e "${BLUE}   Testing rate limiting...${NC}"
    local rate_limit_triggered=false
    
    for i in {1..6}; do
        local payload="{\"name\":\"Test${i}\",\"email\":\"test${i}@example.com\",\"subject\":\"Rate test ${i}\",\"message\":\"Testing rate limits\"}"
        local response=$(http_request "$PROD_URL/api/contact" "POST" "Content-Type: application/json" <<< "$payload")
        
        # Check if we get a rate limit response (429 or rate limit message)
        if echo "$response" | grep -qi "rate limit\|too many\|429" || [[ $(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d "$payload" "$PROD_URL/api/contact") == "429" ]]; then
            echo -e "${GREEN}✅ Rate limiting triggered at request ${i}${NC}"
            rate_limit_triggered=true
            ((api_score++))
            break
        fi
        sleep 0.2
    done
    
    if [ "$rate_limit_triggered" = false ]; then
        echo -e "${YELLOW}⚠️  Rate limiting not triggered (may need adjustment)${NC}"
    fi
    
    # Test 5: HTTP Method Restrictions
    echo -e "${BLUE}   Testing HTTP method restrictions...${NC}"
    local get_response_code=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$PROD_URL/api/contact")
    
    if [ "$get_response_code" = "405" ]; then
        echo -e "${GREEN}✅ Invalid HTTP methods properly rejected${NC}"
        ((api_score++))
    else
        echo -e "${RED}❌ Invalid HTTP methods not properly rejected (got $get_response_code)${NC}"
    fi
    
    # Test 6: Security.txt
    echo -e "${BLUE}   Testing security.txt endpoint...${NC}"
    local security_txt_response=$(http_request "$PROD_URL/.well-known/security.txt")
    
    if [[ "$security_txt_response" != "HTTP_ERROR" ]] && echo "$security_txt_response" | grep -q "Contact:"; then
        echo -e "${GREEN}✅ Security.txt properly configured${NC}"
        ((api_score++))
    else
        echo -e "${YELLOW}⚠️  Security.txt not found or misconfigured${NC}"
    fi
    
    local api_percentage=$((api_score * 100 / api_total))
    echo -e "${BLUE}📊 API Security Score: ${api_score}/${api_total} (${api_percentage}%)${NC}"
    echo ""
}

# Function to test CSP effectiveness
test_csp_effectiveness() {
    echo -e "${YELLOW}🔍 Content Security Policy Analysis...${NC}"
    
    local headers_response=$(get_headers "$PROD_URL")
    local csp_header=$(echo "$headers_response" | grep -i "content-security-policy" | head -1)
    
    if [ -z "$csp_header" ]; then
        echo -e "${RED}❌ No CSP header found${NC}"
        return 1
    fi
    
    local csp_value=$(echo "$csp_header" | sed 's/.*: //')
    echo -e "${BLUE}   CSP Policy: ${csp_value:0:100}...${NC}"
    
    local csp_score=0
    local csp_total=8
    
    # Check for important CSP directives
    local required_directives=(
        "default-src"
        "script-src" 
        "style-src"
        "img-src"
        "connect-src"
        "font-src"
        "object-src"
        "base-uri"
    )
    
    for directive in "${required_directives[@]}"; do
        if echo "$csp_value" | grep -q "$directive"; then
            echo -e "${GREEN}✅ $directive directive present${NC}"
            ((csp_score++))
        else
            echo -e "${YELLOW}⚠️  $directive directive missing${NC}"
        fi
    done
    
    # Check for unsafe directives (should warn)
    if echo "$csp_value" | grep -q "'unsafe-inline'"; then
        echo -e "${YELLOW}⚠️  'unsafe-inline' detected - consider using nonces${NC}"
    else
        echo -e "${GREEN}✅ No 'unsafe-inline' detected${NC}"
    fi
    
    if echo "$csp_value" | grep -q "'unsafe-eval'"; then
        echo -e "${RED}❌ 'unsafe-eval' detected - security risk${NC}"
    else
        echo -e "${GREEN}✅ No 'unsafe-eval' detected${NC}"
    fi
    
    local csp_percentage=$((csp_score * 100 / csp_total))
    echo -e "${BLUE}📊 CSP Score: ${csp_score}/${csp_total} (${csp_percentage}%)${NC}"
    echo ""
}

# Function to test HTTPS configuration
test_https_security() {
    echo -e "${YELLOW}🔍 HTTPS Security Analysis...${NC}"
    
    if [[ ! "$PROD_URL" =~ ^https:// ]]; then
        echo -e "${RED}❌ Production URL is not HTTPS${NC}"
        return 1
    fi
    
    local domain="${PROD_URL#https://}"
    
    # Test SSL/TLS with OpenSSL (if available)
    if command -v openssl &> /dev/null; then
        echo -e "${BLUE}   Testing SSL/TLS configuration...${NC}"
        
        # Get SSL certificate info
        local ssl_info=$(echo | openssl s_client -servername "$domain" -connect "$domain:443" -verify_return_error 2>/dev/null | grep -E "(Certificate chain|verify return)")
        
        if echo "$ssl_info" | grep -q "verify return:1"; then
            echo -e "${GREEN}✅ SSL certificate valid${NC}"
        else
            echo -e "${YELLOW}⚠️  SSL certificate validation issues${NC}"
        fi
        
        # Test for HTTP to HTTPS redirect
        local redirect_response=$(curl -s -o /dev/null -w "%{http_code}|%{redirect_url}" "http://$domain" 2>/dev/null || echo "ERROR")
        
        if [[ "$redirect_response" =~ ^30[1-8] ]] && echo "$redirect_response" | grep -q "https://"; then
            echo -e "${GREEN}✅ HTTP to HTTPS redirect configured${NC}"
        else
            echo -e "${YELLOW}⚠️  HTTP to HTTPS redirect may not be configured${NC}"
        fi
    else
        echo -e "${BLUE}   OpenSSL not available - skipping detailed SSL tests${NC}"
    fi
    
    # Test HSTS header
    local headers_response=$(get_headers "$PROD_URL")
    if echo "$headers_response" | grep -qi "strict-transport-security"; then
        local hsts_header=$(echo "$headers_response" | grep -i "strict-transport-security" | head -1)
        echo -e "${GREEN}✅ HSTS header present${NC}"
        echo -e "${BLUE}   HSTS: $(echo "$hsts_header" | sed 's/.*: //' | tr -d '\r')${NC}"
    else
        echo -e "${RED}❌ HSTS header missing${NC}"
    fi
    
    echo ""
}

# Function to generate security report
generate_security_report() {
    echo -e "${PURPLE}📋 Production Security Report Summary${NC}"
    echo -e "${PURPLE}═══════════════════════════════════${NC}"
    
    local timestamp=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
    
    echo -e "${BLUE}🔗 Tested URL: $PROD_URL${NC}"
    echo -e "${BLUE}⏰ Test Time: $timestamp${NC}"
    echo ""
    
    echo -e "${BLUE}🔍 Manual Verification Links:${NC}"
    local domain="${PROD_URL#https://}"
    domain="${domain#http://}"
    
    echo -e "${BLUE}   Mozilla Observatory: https://observatory.mozilla.org/analyze/$domain${NC}"
    echo -e "${BLUE}   Security Headers: https://securityheaders.com/?q=$PROD_URL${NC}"
    echo -e "${BLUE}   SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=$domain${NC}"
    echo -e "${BLUE}   Security.txt: $PROD_URL/.well-known/security.txt${NC}"
    echo ""
    
    echo -e "${GREEN}✅ Automated security validation completed${NC}"
    echo -e "${GREEN}   Review the results above and use external scanners for additional validation${NC}"
    echo ""
    
    echo -e "${PURPLE}🚨 Next Steps:${NC}"
    echo -e "${PURPLE}   1. Review any warnings or failures above${NC}"
    echo -e "${PURPLE}   2. Run external security scanners manually${NC}"
    echo -e "${PURPLE}   3. Monitor security posture endpoint: $PROD_URL/security-posture${NC}"
    echo -e "${PURPLE}   4. Check health status: $PROD_URL/api/security/health-check${NC}"
}

# Main execution
main() {
    # Check if production URL is accessible
    echo -e "${BLUE}🌐 Checking production availability...${NC}"
    local availability_check=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL")
    
    if [ "$availability_check" != "200" ]; then
        echo -e "${RED}❌ Production URL is not accessible (HTTP $availability_check)${NC}"
        echo -e "${RED}   Please check the URL: $PROD_URL${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Production URL is accessible${NC}"
    echo ""
    
    # Run all security tests
    test_production_headers
    test_api_security  
    test_csp_effectiveness
    test_https_security
    test_external_scanners
    
    # Generate final report
    generate_security_report
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Production Security Testing Script"
        echo ""
        echo "Usage: $0 [URL]"
        echo ""
        echo "Environment Variables:"
        echo "  SECURITY_PORTFOLIO_URL  Production URL to test"
        echo ""
        echo "Examples:"
        echo "  $0 https://my-portfolio.vercel.app"
        echo "  SECURITY_PORTFOLIO_URL=https://example.com $0"
        exit 0
        ;;
    http*://*)
        PROD_URL="$1"
        ;;
esac

# Run main function
main "$@"
