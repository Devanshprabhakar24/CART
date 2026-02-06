# Quick Demo & Testing Guide

## 🚀 Running the Application

### Option 1: Docker (Recommended)

```bash
# From the project root directory
docker-compose up --build
```

Or use the PowerShell script:

```powershell
.\start.ps1
```

Wait for the build to complete. You'll see:

- Backend: `Server is running on port 5000`
- Frontend: Nginx serving on port 3000

### Option 2: Local Development

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
# Update .env: REACT_APP_API_URL=http://localhost:5000/api
npm start
```

## 🧪 Testing the Application

### 1. Product Listing Page

- Open http://localhost:3000
- You should see 6 jewelry products in a responsive grid
- Each card shows:
  - Product image
  - Name and description
  - Category
  - Price in INR
  - "Add to Cart" button

### 2. Add Items to Cart

- Click "Add to Cart" on any product
- Watch for the success message: "✓ Added to cart!"
- Notice the cart badge in the navbar updates
- Try adding multiple different products

### 3. Shopping Cart Functionality

- Click the "Cart" button in the navbar
- Verify all added items appear
- Test quantity controls:
  - Click "+" to increase quantity
  - Click "−" to decrease quantity
  - Note: Minimum is 1, maximum is 99
- Verify price calculations update correctly
- Test the remove button (✕) on any item
- Try the "Clear Cart" button

### 4. Responsive Design

- Resize browser window to test mobile view
- Try on different devices:
  - Desktop (1920px+)
  - Tablet (768px - 1024px)
  - Mobile (< 768px)

### 5. API Testing

#### Using Browser

```
http://localhost:5000/api
http://localhost:5000/api/products
http://localhost:5000/api/cart
```

#### Using cURL

```bash
# Get all products
curl http://localhost:5000/api/products

# Get cart
curl http://localhost:5000/api/cart

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "name": "Diamond Necklace",
    "price": 45000,
    "image": "https://example.com/image.jpg",
    "quantity": 2
  }'

# Update quantity
curl -X PUT http://localhost:5000/api/cart/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'

# Remove item
curl -X DELETE http://localhost:5000/api/cart/1

# Clear cart
curl -X DELETE http://localhost:5000/api/cart
```

#### Using Postman

Import these endpoints:

- GET: http://localhost:5000/api/products
- GET: http://localhost:5000/api/cart
- POST: http://localhost:5000/api/cart
- PUT: http://localhost:5000/api/cart/:id
- DELETE: http://localhost:5000/api/cart/:id

## ✅ Feature Checklist

### Frontend Requirements

- [x] Product listing page using API
- [x] Product card with image, name, price, Add to Cart
- [x] Cart page with quantity update and remove
- [x] State management using Context API
- [x] Responsive design
- [x] Functional components only
- [x] No UI libraries
- [x] Clean folder structure
- [x] Meaningful Git commits

### Backend Requirements

- [x] GET /products API
- [x] POST /cart API
- [x] Additional CRUD operations on cart
- [x] Validation middleware
- [x] Proper error handling
- [x] In-memory data storage
- [x] Environment variables using .env

### Docker Requirements

- [x] Dockerfile for frontend
- [x] Dockerfile for backend
- [x] docker-compose.yml
- [x] Application runs with: `docker-compose up`

## 🐛 Common Issues & Solutions

### Port Already in Use

**Error:** `Port 3000 is already allocated`

**Solution:**

```bash
# Stop Docker containers
docker-compose down

# Or change ports in docker-compose.yml
```

### Docker Build Fails

**Error:** Build errors or timeouts

**Solution:**

```bash
# Clean Docker system
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up
```

### Can't Connect to Backend

**Error:** API requests failing

**Solution:**

1. Check backend logs: `docker logs naksh-jewels-backend`
2. Verify backend is running: `http://localhost:5000/api`
3. Check CORS settings in server.js
4. Ensure frontend .env has correct API URL

### NPM Install Fails (Local Development)

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 Expected Output

### Backend Console

```
Server is running on port 5000
Environment: production
2026-02-07T10:30:00.000Z - GET /api/products
2026-02-07T10:30:05.000Z - POST /api/cart
```

### Frontend Console (Browser DevTools)

- No errors
- Successful API calls visible in Network tab
- React DevTools shows component tree

### Docker Logs

```bash
# View all logs
docker-compose logs

# View backend logs
docker-compose logs backend

# View frontend logs
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

## 📹 Recording a Demo Video (Optional)

### Suggested Flow (2-3 minutes)

1. **Introduction** (15s)
   - Show project structure in VS Code
   - Highlight key files

2. **Start Application** (30s)
   - Run `docker-compose up`
   - Show containers starting

3. **Frontend Demo** (60s)
   - Show product listing
   - Add items to cart
   - Navigate to cart
   - Update quantities
   - Remove items
   - Show responsive design

4. **Backend Demo** (30s)
   - Show API in browser
   - Open DevTools Network tab
   - Demonstrate API calls

5. **Code Walkthrough** (30s)
   - Show React components
   - Show Context API
   - Show Express routes
   - Show Docker files

### Tools for Recording

- OBS Studio (free)
- ShareX (Windows)
- QuickTime (Mac)
- Loom (online)

## 🎯 Evaluation Points to Highlight

1. **Clean Code Structure**
   - Organized folders
   - Separation of concerns
   - Meaningful names

2. **React Best Practices**
   - Functional components
   - Proper hooks usage
   - Context API implementation
   - No prop drilling

3. **Backend Quality**
   - RESTful API design
   - Input validation
   - Error handling
   - Middleware pattern

4. **Docker Excellence**
   - Multi-stage builds
   - Optimized images
   - Proper networking
   - One-command deployment

5. **Professional Touch**
   - Comprehensive README
   - Environment variables
   - Error states
   - Loading states
   - Responsive design

## 📝 Submission Checklist

- [ ] GitHub repository is public
- [ ] README.md is complete
- [ ] All code is committed
- [ ] Docker setup works with `docker-compose up`
- [ ] Application runs without errors
- [ ] Responsive design tested
- [ ] API validation tested
- [ ] Git commits are meaningful
- [ ] .gitignore files present
- [ ] Screenshots added (optional)
- [ ] Demo video recorded (optional)

## 🚀 Deployment (Bonus)

### Deploy to Cloud (Optional)

- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, Heroku
- **Full Stack**: DigitalOcean, AWS

### Example: Railway Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

---

**Good luck with your submission! 🎉**
