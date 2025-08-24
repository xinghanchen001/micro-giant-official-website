# Iframe Embedding Configuration for Micro Giant Website

This website is now configured to allow iframe embedding. Choose the deployment method that matches your hosting environment.

## 🚀 Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Visit:** http://localhost:3000

The website will now be embeddable in iframes!

## 📦 Deployment Options

### Option 1: Node.js/Express Server (Recommended)

**Files:** `server.js`, `package.json`

Deploy to any Node.js hosting service (Heroku, Railway, Render, etc.):

```bash
npm install
npm start
```

The server automatically sets headers to allow iframe embedding from any domain.

### Option 2: Apache Server

**File:** `.htaccess`

Simply upload all files including `.htaccess` to your Apache web server. The `.htaccess` file will automatically configure the necessary headers.

### Option 3: Nginx Server

**File:** `nginx.conf`

Copy the configuration from `nginx.conf` to your server's Nginx configuration file, typically located at `/etc/nginx/sites-available/your-site`.

### Option 4: Vercel

**File:** `vercel.json`

Deploy directly to Vercel:

```bash
vercel
```

The `vercel.json` file includes all necessary header configurations.

### Option 5: Netlify

**File:** `netlify.toml`

Deploy to Netlify by connecting your Git repository or using:

```bash
netlify deploy
```

## 🔒 Security Configuration

The current configuration allows embedding from **any domain** using:

```
Content-Security-Policy: frame-ancestors 'self' *
```

### To Restrict to Specific Domains

Replace the wildcard `*` with specific domains in any configuration file:

**Node.js (server.js):**
```javascript
res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://yourdomain.com https://anotherdomain.com");
```

**Apache (.htaccess):**
```apache
Header always set Content-Security-Policy "frame-ancestors 'self' https://yourdomain.com"
```

**Nginx:**
```nginx
add_header Content-Security-Policy "frame-ancestors 'self' https://yourdomain.com" always;
```

## 🧪 Testing Iframe Embedding

Create a test HTML file:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Iframe Test</title>
</head>
<body>
    <h1>Testing Micro Giant Iframe</h1>
    <iframe 
        src="http://localhost:3000" 
        width="100%" 
        height="600"
        style="border: 2px solid #ccc;">
    </iframe>
</body>
</html>
```

## 🔍 Verify Headers

Use browser developer tools (Network tab) to verify the headers are set correctly:

1. Open Developer Tools (F12)
2. Go to Network tab
3. Load your website
4. Click on the main HTML document
5. Check Response Headers for:
   - `X-Frame-Options: SAMEORIGIN`
   - `Content-Security-Policy: frame-ancestors 'self' *`

## 📝 Notes

- The `SAMEORIGIN` value for `X-Frame-Options` allows embedding on the same domain
- The `frame-ancestors 'self' *` allows embedding from any domain
- Remove or modify these settings based on your security requirements
- For production, consider restricting to specific trusted domains

## 🚨 Troubleshooting

If iframe embedding still doesn't work:

1. **Clear browser cache** - Old headers might be cached
2. **Check console errors** - Look for CSP violations
3. **Verify deployment** - Ensure configuration files are properly deployed
4. **Test locally first** - Use the Node.js server for local testing
5. **Check HTTPS** - Some browsers block mixed content (HTTPS page embedding HTTP iframe)

## 📞 Support

For issues or questions about iframe embedding configuration, please check:
- Browser console for specific error messages
- Network tab for actual response headers
- Server logs for any configuration errors