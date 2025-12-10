# PayU Payment Gateway Setup

## Environment Variables Required

### For Production (Live Mode):

```env
# PayU Credentials (Get from PayU Dashboard)
PAYU_KEY=your_live_merchant_key
PAYU_SALT=your_live_salt_key

# Backend URL (Your live backend URL)
BACKEND_URL=https://your-backend-domain.onrender.com

# Frontend URL (Your live frontend URL)
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Optional: Override callback URLs if needed
PAYU_CALLBACK_SUCCESS_URL=https://your-backend-domain.onrender.com/api/payment/payu/callback?status=success
PAYU_CALLBACK_FAIL_URL=https://your-backend-domain.onrender.com/api/payment/payu/callback?status=fail
PAYU_SUCCESS_URL=https://your-frontend-domain.vercel.app/payment-success
PAYU_FAIL_URL=https://your-frontend-domain.vercel.app/payment-fail

# Node Environment
NODE_ENV=production
```

### For Development (Test Mode):

```env
# PayU Test Credentials
PAYU_KEY=your_test_merchant_key
PAYU_SALT=your_test_salt_key

# Local URLs
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5174

# Node Environment
NODE_ENV=development
```

## PayU URLs

- **Test URL**: `https://test.payu.in/_payment`
- **Live URL**: `https://secure.payu.in/_payment`

## Important Notes

1. **Callback URLs**: PayU will send POST requests to your backend callback URLs. Make sure these URLs are publicly accessible.

2. **Frontend Redirect**: After processing the payment, users are redirected to frontend success/fail pages.

3. **Environment Detection**: 
   - Frontend automatically uses live PayU URL when `NODE_ENV=production` or `VITE_PAYU_MODE=live`
   - Backend uses environment variables to determine URLs

4. **Testing**: Always test with PayU test credentials before going live.

5. **Security**: Never commit `.env` files with real credentials to version control.

