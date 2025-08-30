const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// API client with automatic token handling
class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('healthai_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('healthai_token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('healthai_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async signup(userData: any) {
    const response = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.success && response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async googleLogin(googleData: any) {
    const response = await this.request('/auth/google', {
      method: 'POST',
      body: JSON.stringify(googleData),
    });
    
    if (response.success && response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  // User profile
  async getProfile() {
    return this.request('/user/profile');
  }

  async updateProfile(profileData: any) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Health stats
  async addHealthStats(healthData: any) {
    return this.request('/health/add', {
      method: 'POST',
      body: JSON.stringify(healthData),
    });
  }

  async getHealthStats(userId?: string, period?: string) {
    const query = new URLSearchParams();
    if (period) query.append('period', period);
    
    const endpoint = userId ? `/health/${userId}` : '/health';
    return this.request(`${endpoint}?${query.toString()}`);
  }

  // Challenges
  async getActiveChallenges(type?: string, category?: string) {
    const query = new URLSearchParams();
    if (type) query.append('type', type);
    if (category) query.append('category', category);
    
    return this.request(`/challenges/active?${query.toString()}`);
  }

  async joinChallenge(challengeId: string) {
    return this.request(`/challenges/${challengeId}/join`, {
      method: 'POST',
    });
  }

  async completeChallenge(challengeId: string, progress: number) {
    return this.request(`/challenges/${challengeId}/complete`, {
      method: 'POST',
      body: JSON.stringify({ progress }),
    });
  }

  async getChallengeLeaderboard(challengeId: string) {
    return this.request(`/challenges/leaderboard/${challengeId}`);
  }

  // Chat
  async sendChatMessage(message: string, language?: string) {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, language }),
    });
  }

  // Community
  async getCommunityChallenge() {
    return this.request('/community');
  }

  async updateCommunityProgress(steps: number, challengeId?: string) {
    return this.request('/community/update', {
      method: 'POST',
      body: JSON.stringify({ steps, challengeId }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health-check');
  }
}

export const apiClient = new ApiClient();
export default apiClient;