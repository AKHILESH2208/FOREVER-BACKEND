# E-Commerce Backend API

## Deployment Instructions

### Deploy to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables in Vercel Dashboard:
   - Go to your project on Vercel
   - Settings > Environment Variables
   - Add all variables from your .env file:
     - `MONGO_DB_URI`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_SECRET_KEY`
     - `CLOUDINARY_NAME`
     - `JWT_SECRET`
     - `ADMIN_EMAIL`
     - `ADMIN_PASSWORD`

### Deploy to Netlify

1. Install serverless-http package:
   ```bash
   npm install serverless-http
   ```

2. Install Netlify CLI (if not already installed):
   ```bash
   npm i -g netlify-cli
   ```

3. Login to Netlify:
   ```bash
   netlify login
   ```

4. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

5. Add environment variables in Netlify Dashboard:
   - Go to your site on Netlify
   - Site settings > Environment variables
   - Add all variables from your .env file

### Environment Variables Required

```
PORT=4000
MONGO_DB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### CORS Configuration

The backend is now configured to accept requests from any origin. CORS is fully enabled with:
- All origins allowed
- Credentials enabled
- All standard HTTP methods
- Preflight requests handled

### API Endpoints

- `/api/user` - User management
- `/api/product` - Product management
- `/api/cart` - Shopping cart
- `/api/order` - Order management
- `/api/review` - Product reviews

### Local Development

```bash
npm install
npm run server
```

Server will run on http://localhost:4000
