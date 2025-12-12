# PayU Payment Setup Guide for Production

## Environment Variables Required

### Backend (AWS) - Required Variables

Add these environment variables in your AWS deployment configuration:

```bash
# PayU Credentials (LIVE credentials for production)
PAYU_KEY=your_live_payu_merchant_key
PAYU_SALT=your_live_payu_salt

# Backend URL (Your AWS backend URL)
BACKEND_URL=https://your-actual-aws-backend-url.com

# Frontend URL (Your Vercel frontend URL)
FRONTEND_URL=https://your-actual-vercel-frontend-url.vercel.app

# Node Environment
NODE_ENV=production
```

**Important Notes:**
- Use **LIVE** PayU credentials (`PAYU_KEY` and `PAYU_SALT`), not test credentials
- `BACKEND_URL` must be publicly accessible (PayU needs to send callbacks)
- `FRONTEND_URL` must match your actual Vercel deployment URL
- URLs should NOT have trailing slashes

---

### Frontend (Vercel) - Required Variables

Add these environment variables in your Vercel project settings:

```bash
# Backend API URL
VITE_BACKEND_URL=https://your-actual-aws-backend-url.com

# PayU Mode (set to 'live' for production)
VITE_PAYU_MODE=live
```

**Important Notes:**
- `VITE_PAYU_MODE` must be set to `'live'` for production payments
- Set to `'test'` only for local development/testing
- `VITE_BACKEND_URL` must match your AWS backend URL

---

## How to Set Environment Variables

### AWS (Backend)

1. Log in to your AWS Console
2. Navigate to your deployment service (EC2, Elastic Beanstalk, ECS, etc.)
3. Find "Environment Variables" or "Configuration" section
4. Add all required variables listed above
5. Restart your backend service

### Vercel (Frontend)

1. Log in to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add all required variables listed above
5. Redeploy your frontend (or it will auto-deploy)

---

## Verification Steps

### 1. Check Backend Logs

After deploying, check your AWS backend logs. You should see:

```
✅ All PayU environment variables are configured
Backend URL: https://your-backend-url.com
Frontend URL: https://your-frontend-url.vercel.app
PayU env loaded: true true
```

If you see errors about missing variables, they are not set correctly.

### 2. Check Frontend Console

In production, open browser console and look for:

```
PayU Configuration: {
  payuMode: "live",
  isProduction: true,
  payuUrl: "https://secure.payu.in/_payment",
  envProd: true
}
```

If `payuUrl` shows test URL (`https://test.payu.in/_payment`), check `VITE_PAYU_MODE` is set to `'live'`.

### 3. Test Payment Flow

1. Add items to cart
2. Go to checkout/address page
3. Click "Proceed to Payment"
4. Should redirect to PayU live payment page (`https://secure.payu.in/_payment`)
5. Complete test payment
6. Should redirect back to your frontend success page

---

## Common Issues & Solutions

### Issue 1: "PayU keys not configured on server"

**Solution:** 
- Check `PAYU_KEY` and `PAYU_SALT` are set in AWS
- Verify they are LIVE credentials (not test)
- Restart backend after adding variables

### Issue 2: Payment redirects to test PayU URL

**Solution:**
- Check `VITE_PAYU_MODE=live` is set in Vercel
- Redeploy frontend after adding variable
- Clear browser cache and try again

### Issue 3: Payment callback fails

**Solution:**
- Verify `BACKEND_URL` is set correctly in AWS
- Check backend URL is publicly accessible
- Test callback URL manually: `https://your-backend-url.com/api/payment/payu/callback?status=success`
- Should redirect to frontend (even if it fails, redirect should work)

### Issue 4: Payment success but order not created

**Solution:**
- Check backend logs for PayU callback errors
- Verify database connection is working
- Check user email matches PayU callback email
- Verify cart has items before payment

### Issue 5: "Server configuration error: BACKEND_URL not set"

**Solution:**
- Add `BACKEND_URL` environment variable in AWS
- Set it to your actual backend URL
- Restart backend service

### Issue 6: "Server configuration error: FRONTEND_URL not set"

**Solution:**
- Add `FRONTEND_URL` environment variable in AWS
- Set it to your actual Vercel frontend URL
- Restart backend service

---

## PayU Account Setup

### For Live Payments:

1. **Activate PayU Account:**
   - Complete KYC verification
   - Submit required business documents
   - Wait for account activation (usually 2-3 business days)

2. **Get Live Credentials:**
   - Log in to PayU Merchant Dashboard
   - Go to Settings → API Credentials
   - Copy your **Live Merchant Key** (`PAYU_KEY`)
   - Copy your **Live Salt** (`PAYU_SALT`)

3. **Configure Webhook URLs:**
   - In PayU Dashboard, set Success URL: `https://your-backend-url.com/api/payment/payu/callback?status=success`
   - Set Failure URL: `https://your-backend-url.com/api/payment/payu/callback?status=fail`
   - Note: These are automatically set by backend, but verify in PayU dashboard

---

## Testing Checklist

Before going live:

- [ ] All environment variables set in AWS
- [ ] All environment variables set in Vercel
- [ ] Backend logs show all variables loaded
- [ ] Frontend console shows `payuUrl: "https://secure.payu.in/_payment"`
- [ ] PayU account is activated for live payments
- [ ] Using LIVE PayU credentials (not test)
- [ ] Backend URL is publicly accessible
- [ ] Test payment flow end-to-end
- [ ] Verify order is created after successful payment
- [ ] Verify cart is cleared after successful payment
- [ ] Test payment failure scenario

---

## Support

If issues persist after following this guide:

1. Check backend logs for specific error messages
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Test callback URLs are accessible
5. Contact PayU support if payment gateway issues

