# PayU Payment Integration Analysis

## Problem Statement
PayU payment works locally but fails in production (Backend: AWS, Frontend: Vercel)

## Code Analysis

### 1. Frontend PayU URL Selection (Address.jsx:139-142)

**Current Code:**
```javascript
const isProduction = import.meta.env.PROD || import.meta.env.VITE_PAYU_MODE === 'live';
form.action = isProduction 
  ? 'https://secure.payu.in/_payment' // PayU live URL
  : 'https://test.payu.in/_payment';  // PayU test URL
```

**Issues:**
- `import.meta.env.PROD` might not be correctly set in Vercel production builds
- Relies on Vite's build mode which can be inconsistent
- No explicit environment variable check for production mode

**Fix Required:**
- Use explicit `VITE_PAYU_MODE` environment variable
- Add fallback logic that checks for production domain

---

### 2. Backend Environment Variables (payment.controller.js)

#### 2.1 PayU Credentials (Lines 42-47)
```javascript
const key = process.env.PAYU_KEY;
let salt = process.env.PAYU_SALT;

if (!key || !salt) {
  return res.status(500).json({ error: 'PayU keys not configured on server' });
}
```

**Status:** ✅ Correct - checks for missing credentials

**Required in AWS:**
- `PAYU_KEY` - Your PayU merchant key
- `PAYU_SALT` - Your PayU salt (live or test)

---

#### 2.2 Backend URL Configuration (Lines 89-94)
```javascript
const BACKEND_URL = process.env.BACKEND_URL || (process.env.NODE_ENV === 'production' 
  ? `https://your-backend-domain.com`  // ❌ PLACEHOLDER - WON'T WORK
  : `http://localhost:${process.env.PORT || 5000}`);
```

**Issues:**
- Hardcoded placeholder `https://your-backend-domain.com` won't work
- If `BACKEND_URL` env var is not set in AWS, it uses placeholder
- PayU callbacks will fail because URL is invalid

**Required in AWS:**
- `BACKEND_URL` - Your actual AWS backend URL (e.g., `https://your-api.aws.com`)

---

#### 2.3 Frontend URL Configuration (Lines 98-103)
```javascript
const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production'
  ? 'https://your-frontend-domain.com'  // ❌ PLACEHOLDER - WON'T WORK
  : 'http://localhost:5174');
```

**Issues:**
- Hardcoded placeholder `https://your-frontend-domain.com` won't work
- If `FRONTEND_URL` env var is not set in AWS, redirects will fail
- Users will be redirected to invalid URL after payment

**Required in AWS:**
- `FRONTEND_URL` - Your actual Vercel frontend URL (e.g., `https://your-app.vercel.app`)

---

### 3. Callback URLs (payment.controller.js:93-94, 102-103)

**Success Callback:**
```javascript
const callbackSuccessUrl = process.env.PAYU_CALLBACK_SUCCESS_URL || 
  `${BACKEND_URL}/api/payment/payu/callback?status=success`;
```

**Fail Callback:**
```javascript
const callbackFailUrl = process.env.PAYU_CALLBACK_FAIL_URL || 
  `${BACKEND_URL}/api/payment/payu/callback?status=fail`;
```

**Issues:**
- Depends on `BACKEND_URL` being correctly set
- If `BACKEND_URL` is placeholder, PayU can't reach your backend

---

### 4. Frontend Redirect URLs (payment.controller.js:167-168)

**Used in verifyPayUPayment:**
```javascript
const frontendSuccessUrl = process.env.PAYU_SUCCESS_URL || `${FRONTEND_URL}/payment-success`;
const frontendFailUrl = process.env.PAYU_FAIL_URL || `${FRONTEND_URL}/payment-fail`;
```

**Issues:**
- Depends on `FRONTEND_URL` being correctly set
- If `FRONTEND_URL` is placeholder, users redirected to invalid URL

---

### 5. Hash Verification (payment.controller.js:193)

**Current Code:**
```javascript
const hashString = `${payuKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${status}|||||||||||${salt}`;
const expectedHash = crypto.createHash('sha512').update(hashString).digest('hex');
```

**Status:** ✅ Correct - matches PayU's hash format

---

## Root Causes

### Primary Issues:

1. **Missing Environment Variables in AWS:**
   - `BACKEND_URL` not set → Uses placeholder URL
   - `FRONTEND_URL` not set → Uses placeholder URL
   - PayU callbacks fail because backend URL is invalid

2. **Frontend Production Detection:**
   - `import.meta.env.PROD` might not work correctly in Vercel
   - No explicit `VITE_PAYU_MODE` variable set
   - Might be using test PayU URL in production

3. **PayU Credentials:**
   - Using test credentials (`PAYU_KEY`, `PAYU_SALT`) in production
   - Or using live credentials but pointing to test PayU URL

---

## Required Environment Variables

### Backend (AWS):
```bash
PAYU_KEY=your_live_payu_key
PAYU_SALT=your_live_payu_salt
BACKEND_URL=https://your-actual-aws-backend-url.com
FRONTEND_URL=https://your-actual-vercel-frontend-url.vercel.app
NODE_ENV=production
```

### Frontend (Vercel):
```bash
VITE_BACKEND_URL=https://your-actual-aws-backend-url.com
VITE_PAYU_MODE=live  # Set to 'live' for production, 'test' for development
```

---

## Recommended Fixes

### Fix 1: Update Frontend PayU URL Detection
Make the production detection more explicit and reliable.

### Fix 2: Remove Placeholder URLs
Add better error handling when environment variables are missing.

### Fix 3: Add Environment Variable Validation
Add startup checks to ensure all required variables are set.

---

## Testing Checklist

- [ ] Verify `BACKEND_URL` is set correctly in AWS
- [ ] Verify `FRONTEND_URL` is set correctly in AWS
- [ ] Verify `PAYU_KEY` and `PAYU_SALT` are live credentials (not test)
- [ ] Verify `VITE_PAYU_MODE=live` is set in Vercel
- [ ] Verify `VITE_BACKEND_URL` points to AWS backend in Vercel
- [ ] Test PayU callback URLs are accessible from internet
- [ ] Verify PayU merchant account is activated for live payments

---

## Debugging Steps

1. Check AWS backend logs for PayU environment variable loading:
   ```
   PayU env loaded: true true
   ```
   Should show `true true` if both `PAYU_KEY` and `PAYU_SALT` are loaded.

2. Check which PayU URL frontend is using:
   - Open browser console in production
   - Look for form action URL in network tab
   - Should be `https://secure.payu.in/_payment` for production

3. Check backend callback URLs:
   - Log `callbackSuccessUrl` and `callbackFailUrl` in `createPayUTxn`
   - Verify they point to your actual AWS backend URL

4. Test callback endpoint manually:
   - Try accessing: `https://your-backend-url.com/api/payment/payu/callback?status=success`
   - Should redirect to frontend (even if it fails, redirect should work)

