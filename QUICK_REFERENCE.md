# 🚀 Quick Reference Card

## One-Line Commands

### Run Application

```bash
docker-compose up --build
```

### Stop Application

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f
```

## URLs

| Service           | URL                                |
| ----------------- | ---------------------------------- |
| Frontend          | http://localhost:3000              |
| Backend API       | http://localhost:5000/api          |
| Products Endpoint | http://localhost:5000/api/products |
| Cart Endpoint     | http://localhost:5000/api/cart     |

## API Endpoints

```bash
# Get all products
GET /api/products

# Get cart
GET /api/cart

# Add to cart
POST /api/cart
Body: { "productId": 1, "name": "...", "price": 1000, "quantity": 2 }

# Update quantity
PUT /api/cart/:id
Body: { "quantity": 5 }

# Remove item
DELETE /api/cart/:id

# Clear cart
DELETE /api/cart
```

## Project Structure

```
naksh-jewels/
├── backend/          # Node.js + Express API
├── frontend/         # React application
└── docker-compose.yml
```

## Key Files

- [README.md](README.md) - Full documentation
- [DEMO_GUIDE.md](DEMO_GUIDE.md) - Testing guide
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete summary
- [GIT_SETUP.md](GIT_SETUP.md) - Version control setup

## Git Commands

```bash
# Initialize repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete e-commerce module"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/naksh-jewels.git

# Push
git push -u origin main
```

## Docker Commands

```bash
# Build only
docker-compose build

# Run in background
docker-compose up -d

# Stop containers
docker-compose stop

# Remove containers
docker-compose down

# Remove everything including volumes
docker-compose down -v

# View running containers
docker ps

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend
```

## Local Development (Without Docker)

### Backend

```bash
cd backend
npm install
npm start
# Runs on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
# Update .env: REACT_APP_API_URL=http://localhost:5000/api
npm start
# Runs on http://localhost:3001
```

## Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```env
REACT_APP_API_URL=/api
```

## Troubleshooting

### Port in use

```bash
# Change ports in docker-compose.yml
ports:
  - "3001:3000"  # Frontend
  - "5001:5000"  # Backend
```

### Clean Docker

```bash
docker system prune -a
docker-compose build --no-cache
```

### Check if services are running

```bash
curl http://localhost:5000/api
curl http://localhost:5000/api/products
```

## Tech Stack

**Frontend:** React 18, Context API, Custom CSS, Nginx  
**Backend:** Node.js 18, Express, express-validator  
**DevOps:** Docker, Docker Compose

## Features Checklist

- ✅ Product listing with API
- ✅ Shopping cart functionality
- ✅ Context API state management
- ✅ Responsive design
- ✅ No UI libraries
- ✅ RESTful API
- ✅ Validation & error handling
- ✅ Docker containerization
- ✅ One-command deployment

## File Count

- Total files: 35+
- Lines of code: 2000+
- Components: 4
- API routes: 2
- Middlewares: 2

## Browser DevTools

### Check API Calls

1. Open DevTools (F12)
2. Go to Network tab
3. Filter: XHR
4. Add items to cart
5. Watch API requests

### Check React Components

1. Install React DevTools extension
2. Open Components tab
3. View component tree
4. Inspect state/props

## Production Ready

- ✅ Multi-stage Docker builds
- ✅ Nginx for production serving
- ✅ Environment variables
- ✅ Error handling
- ✅ Input validation
- ✅ CORS configured
- ✅ Optimized images

## Support

For issues, check:

1. [DEMO_GUIDE.md](DEMO_GUIDE.md) - Troubleshooting section
2. Docker logs: `docker-compose logs`
3. Network tab in DevTools
4. Console for errors

---

**Ready to submit! All requirements met! 🎉**
