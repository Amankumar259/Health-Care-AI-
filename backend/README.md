# HealthAI Backend API

AI-powered preventive healthcare backend built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based auth with Google OAuth support
- **Health Tracking**: Store and analyze health statistics
- **Gamification**: Challenges and leaderboard system
- **AI Chatbot**: Health advice with multi-language support
- **Community**: Community challenges and social features
- **Privacy**: Configurable privacy settings and data sharing

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcryptjs
- **Validation**: Mongoose built-in validation
- **Security**: CORS enabled, password hashing

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Health Tracking
- `POST /api/health/add` - Add health statistics
- `GET /api/health/:userId` - Get health statistics

### Challenges
- `POST /api/challenges/create` - Create new challenge
- `GET /api/challenges/active` - Get active challenges
- `POST /api/challenges/:id/join` - Join a challenge
- `POST /api/challenges/:id/complete` - Complete challenge
- `GET /api/challenges/leaderboard/:id` - Get challenge leaderboard

### AI Chatbot
- `POST /api/chat` - Process chat message

### Community
- `GET /api/community` - Get community challenges
- `POST /api/community/update` - Update community progress

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   PORT=4000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/healthai
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start MongoDB**
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Use connection string in MONGODB_URI

4. **Run the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Verify installation**
   Visit: `http://localhost:4000/api/health-check`

## Database Models

### User
- Personal information (name, age, gender, etc.)
- Authentication credentials
- Preferences and privacy settings
- Points and achievements

### HealthStats
- Daily health metrics (steps, sleep, heart rate, etc.)
- Risk assessment calculations
- Time-series health data

### Challenge
- Challenge details and rules
- Participant tracking
- Progress monitoring
- Leaderboard functionality

### Community
- Community information
- Member management
- Collective challenges
- Progress tracking

## API Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error info (development only)"
}
```

## Development Notes

- All passwords are hashed using bcrypt
- JWT tokens expire in 7 days by default
- MongoDB indexes are created for optimal query performance
- CORS is configured for frontend integration
- Request logging is enabled for debugging

## Production Deployment

1. Set `NODE_ENV=production`
2. Use MongoDB Atlas for database
3. Configure proper CORS origins
4. Set up environment variables securely
5. Use PM2 or similar for process management
6. Set up SSL/TLS termination
7. Configure rate limiting and security headers

## Future Enhancements

- OpenAI integration for advanced AI responses
- Push notifications for challenges
- Real-time WebSocket connections
- Advanced analytics and reporting
- Integration with fitness devices
- Multi-tenancy for healthcare organizations