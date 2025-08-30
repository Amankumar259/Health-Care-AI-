import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MapPin, Trophy, Target, Calendar, TrendingUp } from 'lucide-react';

export default function Community() {
  const [joinedChallenge, setJoinedChallenge] = useState(false);

  const communityChallenge = {
    title: "Village Walkathon 2024",
    description: "Join your community in a month-long walking challenge to promote health and wellness together!",
    totalSteps: 2450000,
    targetSteps: 5000000,
    participants: 156,
    daysLeft: 18,
    prize: "Health screening camp for top village"
  };

  const topCommunities = [
    { rank: 1, name: "Green Valley Community", steps: 450000, members: 45, avatar: "🏘️" },
    { rank: 2, name: "Riverside Neighborhood", steps: 420000, members: 38, avatar: "🏞️" },
    { rank: 3, name: "Sunset Heights", steps: 380000, members: 52, avatar: "🌅" },
    { rank: 4, name: "Market Square Area", steps: 350000, members: 29, avatar: "🏪" },
    { rank: 5, name: "Temple Road Community", steps: 320000, members: 41, avatar: "🏛️" }
  ];

  const recentActivities = [
    {
      user: "Rajesh Kumar",
      action: "completed daily challenge",
      time: "2 hours ago",
      points: "+50 points"
    },
    {
      user: "Meera Patel",
      action: "joined the community challenge",
      time: "4 hours ago",
      points: "Welcome!"
    },
    {
      user: "Amit Singh",
      action: "walked 12,000 steps",
      time: "6 hours ago",
      points: "+75 points"
    },
    {
      user: "Sunita Devi",
      action: "achieved weekly goal",
      time: "1 day ago",
      points: "+100 points"
    }
  ];

  const progressPercentage = Math.round((communityChallenge.totalSteps / communityChallenge.targetSteps) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Community Challenges</h1>
        <p className="text-muted-foreground">Connect with your community and achieve health goals together</p>
      </div>

      {/* Main Community Challenge */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-600 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{communityChallenge.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4" />
                  {communityChallenge.daysLeft} days left
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              🏆 {communityChallenge.prize}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{communityChallenge.description}</p>
          
          {/* Progress Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Community Progress</span>
              <span className="text-sm text-muted-foreground">
                {communityChallenge.totalSteps.toLocaleString()} / {communityChallenge.targetSteps.toLocaleString()} steps
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{progressPercentage}%</p>
              <p className="text-sm text-muted-foreground">of target achieved</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{communityChallenge.participants}</div>
              <p className="text-sm text-muted-foreground">Participants</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{Math.round(communityChallenge.totalSteps / communityChallenge.participants).toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Avg Steps/Person</p>
            </div>
          </div>

          {/* Join Button */}
          <Button 
            className="w-full"
            onClick={() => setJoinedChallenge(!joinedChallenge)}
            variant={joinedChallenge ? "outline" : "default"}
          >
            {joinedChallenge ? "✅ Challenge Joined!" : "Join Challenge"}
          </Button>
        </CardContent>
      </Card>

      {/* Community Leaderboard and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Community Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Community Leaderboard
            </CardTitle>
            <CardDescription>Top performing communities this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCommunities.map((community) => (
                <div 
                  key={community.rank}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{community.avatar}</div>
                    <div>
                      <p className="font-medium">{community.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {community.members} members
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">#{community.rank}</p>
                    <p className="text-sm text-muted-foreground">
                      {community.steps.toLocaleString()} steps
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Community Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>What's happening in your community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <Badge variant="outline" className="text-xs">
                        {activity.points}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Local Health Initiatives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Local Health Initiatives
          </CardTitle>
          <CardDescription>Health programs and events in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏥</span>
                <h3 className="font-semibold">Free Health Checkup Camp</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Monthly health screening at Community Center
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Next: Jan 25, 2024</span>
                <Button size="sm" variant="outline">Register</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🧘</span>
                <h3 className="font-semibold">Morning Yoga Sessions</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Daily yoga classes in the park
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Daily: 6:00 AM</span>
                <Button size="sm" variant="outline">Join</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}