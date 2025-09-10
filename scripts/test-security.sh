#!/bin/bash

# Security Testing Script
# Automated verification of security controls

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default URL
URL="${1:-http://localhost:3000}"

echo -e "${BLUE}🛡️  Security Testing Suite${NC}"
echo -e "${BLUE}Testing URL: ${URL}${NC}"
echo ""

# Function to check if service is running
check_service() {
    echo -e "${YELLOW}⏳ Checking if service is available...${NC}"
    if curl -s --max-time 10 "${URL}" > /dev/null; then
        echo -e "${GREEN}✅ Service is running${NC}"
        return 0
    else
        echo -e "${RED}❌ Service is not accessible at ${URL}${NC}"
        echo -e "${RED}   Please start the development server with: npm run dev${NC}"
        exit 1
    fi
}

# Function to test security headers
test_headers() {
    echo -e "${YELLOW}🔍 Testing Security Headers...${NC}"
    
    local headers_response=$(curl -s -I "${URL}")
    local passed=0
    local total=6
    
    # Test individual headers
    if echo "${headers_response}" | grep -q "content-security-policy"; then
        echo -e "${GREEN}✅ Content-Security-Policy header present${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ Content-Security-Policy header missing${NC}"
    fi
    
    if echo "${headers_response}" | grep -q "strict-transport-security"; then
        echo -e "${GREEN}✅ Strict-Transport-Security header present${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ Strict-Transport-Security header missing${NC}"
    fi
    
    if echo "${headers_response}" | grep -q "x-frame-options"; then
        echo -e "${GREEN}✅ X-Frame-Options header present${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ X-Frame-Options header missing${NC}"
    fi
    
    if echo "${headers_response}" | grep -q "x-content-type-options"; then
        echo -e "${GREEN}✅ X-Content-Type-Options header present${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ X-Content-Type-Options header missing${NC}"
    fi
    
    if echo "${headers_response}" | grep -q "referrer-policy"; then
        echo -e "${GREEN}✅ Referrer-Policy header present${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ Referrer-Policy header missing${NC}"
    fi
    
    if echo "${headers_response}" | grep -q "permissions-policy"; then
        echo -e "${GREEN}✅ Permissions-Policy header present${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ Permissions-Policy header missing${NC}"
    fi
    
    # Check for absence of server info headers
    if echo "${headers_response}" | grep -q "server:"; then
        echo -e "${YELLOW}⚠️  Server header present (information disclosure)${NC}"
    else
        echo -e "${GREEN}✅ Server header properly hidden${NC}"
    fi
    
    if echo "${headers_response}" | grep -q "x-powered-by:"; then
        echo -e "${YELLOW}⚠️  X-Powered-By header present (information disclosure)${NC}"
    else
        echo -e "${GREEN}✅ X-Powered-By header properly hidden${NC}"
    fi
    
    echo -e "${BLUE}📊 Headers Score: ${passed}/${total}${NC}"
    echo ""
    
    return $((total - passed))
}

# Function to test API security
test_api_security() {
    echo -e "${YELLOW}🔍 Testing API Security...${NC}"
    
    local passed=0
    local total=4
    
    # Test contact API exists
    local contact_response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${URL}/api/contact" \
        -H "Content-Type: application/json" \
        -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}')
    
    if [ "${contact_response}" = "200" ] || [ "${contact_response}" = "400" ]; then
        echo -e "${GREEN}✅ Contact API endpoint accessible${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ Contact API endpoint not working (HTTP ${contact_response})${NC}"
    fi
    
    # Test malicious input rejection
    local malicious_response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${URL}/api/contact" \
        -H "Content-Type: application/json" \
        -d '{"name":"<script>alert(1)</script>","email":"test@example.com","subject":"test","message":"test"}')
    
    if [ "${malicious_response}" = "400" ]; then
        echo -e "${GREEN}✅ Malicious input properly rejected${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ Malicious input not rejected (HTTP ${malicious_response})${NC}"
    fi
    
    # Test invalid method rejection
    local method_response=$(curl -s -o /dev/null -w "%{http_code}" -X GET "${URL}/api/contact")
    
    if [ "${method_response}" = "405" ]; then
        echo -e "${GREEN}✅ Invalid HTTP methods properly rejected${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ Invalid HTTP method not rejected (HTTP ${method_response})${NC}"
    fi
    
    # Test security posture API
    local posture_response=$(curl -s "${URL}/api/security-posture")
    
    if echo "${posture_response}" | grep -q "\"score\"" && echo "${posture_response}" | grep -q "\"grade\""; then
        echo -e "${GREEN}✅ Security posture API working${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ Security posture API not working${NC}"
    fi
    
    echo -e "${BLUE}📊 API Security Score: ${passed}/${total}${NC}"
    echo ""
    
    return $((total - passed))
}

# Function to test rate limiting
test_rate_limiting() {
    echo -e "${YELLOW}🔍 Testing Rate Limiting...${NC}"
    
    local passed=0
    local total=2
    
    # Test rate limiting by making multiple requests
    echo -e "${BLUE}   Making multiple requests to test rate limiting...${NC}"
    
    local rate_limit_triggered=false
    
    for i in {1..6}; do
        local response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${URL}/api/contact" \
            -H "Content-Type: application/json" \
            -d "{\"name\":\"Test${i}\",\"email\":\"test${i}@example.com\",\"subject\":\"Rate Limit Test ${i}\",\"message\":\"Testing rate limits\"}")
        
        if [ "${response}" = "429" ]; then
            echo -e "${GREEN}✅ Rate limiting triggered at request ${i}${NC}"
            rate_limit_triggered=true
            ((passed++))
            break
        fi
        
        # Small delay between requests
        sleep 0.1
    done
    
    if [ "${rate_limit_triggered}" = false ]; then
        echo -e "${RED}❌ Rate limiting not triggered after 6 requests${NC}"
    fi
    
    # Test that rate limiting returns proper headers
    local rate_limit_response=$(curl -s -I -X POST "${URL}/api/contact" \
        -H "Content-Type: application/json" \
        -d '{"name":"Test","email":"test@example.com","subject":"Rate Limit Header Test","message":"Testing headers"}')
    
    if echo "${rate_limit_response}" | grep -qi "retry-after"; then
        echo -e "${GREEN}✅ Rate limiting headers present${NC}"
        ((passed++))
    else
        echo -e "${YELLOW}⚠️  Rate limiting headers not found (may not be triggered)${NC}"
    fi
    
    echo -e "${BLUE}📊 Rate Limiting Score: ${passed}/${total}${NC}"
    echo ""
    
    return $((total - passed))
}

# Function to test input validation
test_input_validation() {
    echo -e "${YELLOW}🔍 Testing Input Validation...${NC}"
    
    local passed=0
    local total=5
    
    # Test various malicious inputs
    local malicious_inputs=(
        '{"name":"<script>alert(1)</script>","email":"test@example.com","subject":"test","message":"test"}'
        '{"name":"Test","email":"javascript:alert(1)","subject":"test","message":"test"}'
        '{"name":"Test","email":"test@example.com","subject":"<iframe src=\"javascript:alert(1)\"></iframe>","message":"test"}'
        '{"name":"Test","email":"test@example.com","subject":"test","message":"eval(\"malicious code\")"}'
        '{"name":"' $(printf 'A%.0s' {1..1000}) '","email":"test@example.com","subject":"test","message":"test"}'
    )
    
    for input in "${malicious_inputs[@]}"; do
        local response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${URL}/api/contact" \
            -H "Content-Type: application/json" \
            -d "${input}")
        
        if [ "${response}" = "400" ]; then
            ((passed++))
        fi
    done
    
    if [ ${passed} -eq ${total} ]; then
        echo -e "${GREEN}✅ All malicious inputs properly rejected${NC}"
    else
        echo -e "${RED}❌ Some malicious inputs not rejected (${passed}/${total})${NC}"
    fi
    
    echo -e "${BLUE}📊 Input Validation Score: ${passed}/${total}${NC}"
    echo ""
    
    return $((total - passed))
}

# Function to run external security checks
test_external_checks() {
    echo -e "${YELLOW}🔍 External Security Check Recommendations...${NC}"
    
    echo -e "${BLUE}   Run these external checks manually:${NC}"
    echo -e "${BLUE}   📊 Mozilla Observatory: https://observatory.mozilla.org/analyze/${URL#*://}${NC}"
    echo -e "${BLUE}   📊 Security Headers: https://securityheaders.com/?q=${URL}${NC}"
    
    if [[ "${URL}" == https://* ]]; then
        echo -e "${BLUE}   📊 SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=${URL#https://}${NC}"
    fi
    
    echo ""
}

# Main execution
main() {
    check_service
    
    local total_errors=0
    
    # Run all tests
    test_headers
    total_errors=$((total_errors + $?))
    
    test_api_security
    total_errors=$((total_errors + $?))
    
    test_rate_limiting
    total_errors=$((total_errors + $?))
    
    test_input_validation
    total_errors=$((total_errors + $?))
    
    test_external_checks
    
    # Final summary
    echo -e "${BLUE}📋 Security Test Summary${NC}"
    echo -e "${BLUE}════════════════════════${NC}"
    
    if [ ${total_errors} -eq 0 ]; then
        echo -e "${GREEN}🎉 All security tests passed!${NC}"
        echo -e "${GREEN}   Your application demonstrates excellent security controls.${NC}"
    elif [ ${total_errors} -le 3 ]; then
        echo -e "${YELLOW}⚠️  Minor security issues detected (${total_errors} issues)${NC}"
        echo -e "${YELLOW}   Review the failed tests above.${NC}"
    else
        echo -e "${RED}❌ Multiple security issues detected (${total_errors} issues)${NC}"
        echo -e "${RED}   Please address the failed tests above.${NC}"
    fi
    
    echo ""
    echo -e "${BLUE}🔗 For detailed security information, visit:${NC}"
    echo -e "${BLUE}   ${URL}/security-posture${NC}"
    
    exit ${total_errors}
}

# Run main function
main "$@"
