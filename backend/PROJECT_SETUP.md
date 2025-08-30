# HealthAI - Complete Full-Stack Setup Guide

## 🚀 Project Overview

HealthAI is a complete full-stack AI Preventive Healthcare Web Application featuring:

**Frontend (React + TypeScript + Tailwind + shadcn/ui)**
- Modern, responsive UI with accessibility features
- Dashboard with health statistics and AI tips  
- Gamified daily challenges and leaderboards
- AI-powered health chatbot with multi-language support
- Profile management with risk assessment
- Community challenges and social features
- Comprehensive settings and preferences

**Backend (Node.js + Express + MongoDB)**
- RESTful API with JWT authentication
- Google OAuth integration
- Health data tracking and analytics
- Challenge management system
- AI chatbot with contextual responses
- Community features and leaderboards
- Privacy controls and data management

## 📁 Project Structure

```
healthai/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── lib/            # Utilities and API client
│   │   └── ...
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js API server
│   ├── controllers/        # Route handlers
│   ├── models/            # Database schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Auth and validation
│   ├── config/            # Database configuration
│   └── server.js          # Main server file
└── PROJECT_SETUP.md       # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Frontend Setup

```bash
# Navigate to frontend directory
cd /workspace/shadcn-ui

# Install dependencies (already installed)
pnpm install

# Create environment file
# .env file is already created with VITE_API_URL=http://localhost:4000/api

# Start development server (already running)
pnpm run dev
```

Frontend will be available at: `http://localhost:5173`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd /workspace/shadcn-ui/backend

# Install dependencies (already installed)
npm install

# Set up environment variables
# .env file is already created with:
# - PORT=4000
# - MONGODB_URI=mongodb://localhost:27017/healthai
# - JWT_SECRET=your-super-secret-jwt-key

# Start MongoDB (if using local MongoDB)
# mongod

# Start the server
npm run dev
```

Backend will be available at: `http://localhost:4000`

### 3. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# The application will automatically create the database and collections
```

#### Option B: MongoDB Atlas (Recommended for production)
1. Create account at https://mongodb.com/atlas
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend/.env

### 4. Verify Setup

1. **Backend Health Check**
   ```bash
   curl http://localhost:4000/api/health-check
   ```

2. **Frontend Access**
   - Open `http://localhost:5173`
   - You should see the HealthAI login page

3. **Full Integration Test**
   - Try creating an account
   - Login and navigate through different pages
   - Test the chatbot functionality

## 🔧 Configuration

### Frontend Configuration (.env)
```env
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=HealthAI
VITE_APP_VERSION=1.0.0
```

### Backend Configuration (backend/.env)
```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/healthai
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional: OpenAI API
OPENAI_API_KEY=your-openai-api-key
```

## 🚀 Development Workflow

### Starting Both Services
```bash
# Terminal 1: Frontend
cd /workspace/shadcn-ui
pnpm run dev

# Terminal 2: Backend
cd /workspace/shadcn-ui/backend
npm run dev
```

### Making Changes
- Frontend changes auto-reload via Vite HMR
- Backend changes auto-reload via nodemon
- Database changes persist automatically

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login  
- `POST /api/auth/google` - Google OAuth login

### Core Features
- `GET /api/user/profile` - Get user profile
- `POST /api/health/add` - Add health statistics
- `GET /api/challenges/active` - Get active challenges
- `POST /api/chat` - AI chatbot interaction
- `GET /api/community` - Community challenges

Full API documentation available in `backend/README.md`

## 🎯 Key Features Implemented

### ✅ Frontend Features
- [x] Responsive login/signup with validation
- [x] Dashboard with health stats and circular progress
- [x] Daily challenges with gamification
- [x] AI chatbot with WhatsApp-like interface
- [x] Profile management with BMI calculator
- [x] Community challenges with leaderboards
- [x] Settings with privacy controls and language toggle
- [x] Sidebar navigation with mobile support
- [x] Modern UI with shadcn/ui components

### ✅ Backend Features  
- [x] JWT authentication with bcrypt password hashing
- [x] Google OAuth integration structure
- [x] Health data models with risk assessment
- [x] Challenge system with participant tracking
- [x] AI chatbot with contextual health responses
- [x] Community features with progress tracking
- [x] User preferences and privacy settings
- [x] Comprehensive error handling
- [x] Request logging and validation

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation and sanitization
- Privacy controls for data sharing
- Secure environment variable handling

## 🌐 Production Deployment

### Frontend Deployment
```bash
# Build for production
pnpm run build

# Deploy dist/ directory to your hosting service
# (Vercel, Netlify, AWS S3, etc.)
```

### Backend Deployment
```bash
# Set production environment variables
export NODE_ENV=production
export MONGODB_URI=your-atlas-connection-string

# Start production server
npm start

# Or use PM2 for process management
pm2 start server.js --name healthai-api
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Profile creation and editing
- [ ] Health data entry and visualization
- [ ] Challenge participation and completion
- [ ] Chatbot conversations
- [ ] Community challenge interaction
- [ ] Settings and preferences
- [ ] Mobile responsiveness

### API Testing
```bash
# Test backend health
curl http://localhost:4000/api/health-check

# Test user registration
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Backend not connecting to MongoDB**
   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify network connectivity

2. **Frontend API calls failing**
   - Check VITE_API_URL in .env
   - Ensure backend is running on correct port
   - Check browser console for CORS errors

3. **Authentication issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Clear localStorage and try again

### Support
For issues and questions, please check the troubleshooting section or create an issue in the repository.

---

**HealthAI v1.0.0** - AI-Powered Preventive Healthcare Platform