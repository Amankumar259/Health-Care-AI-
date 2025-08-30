import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProgressBar from '@/components/ProgressBar';
import { Trophy, Medal, Award, Target, Users } from 'lucide-react';

export default function Challenges() {
  const [todayCompleted, setTodayCompleted] = useState(false);

  const todayChallenge = {
    title: "Walk 5,000 Steps",
    description: "Take a brisk walk around your neighborhood",
    progress: 3240,
    target: 5000,
    points: 50,
    timeLeft: "6 hours left"
  };

  const leaderboard = [
    { rank: 1, name: "Priya Sharma", points: 2450, avatar: "🥇" },
    { rank: 2, name: "Raj Patel", points: 2180, avatar: "🥈" },
    { rank: 3, name: "Anita Gupta", points: 1950, avatar: "🥉" },
    { rank: 4, name: "Amit Singh", points: 1720, avatar: "👤" },
    { rank: 5, name: "You", points: 1650, avatar: "👤" }
  ];

  const weeklyTasks = [
    { title: "Drink 8 glasses of water daily", completed: 5, total: 7, points: 20 },
    { title: "Sleep 7+ hours nightly", completed: 4, total: 7, points: 30 },
    { title: "Eat 5 servings of fruits/vegetables", completed: 6, total: 7, points: 25 },
    { title: "Exercise for 30 minutes", completed: 3, total: 7, points: 40 }
  ];

  const badges = [
    { name: "Early Bird", icon: "🌅", description: "Complete morning workouts", earned: true },
    { name: "Hydration Hero", icon: "💧", description: "Drink 8+ glasses daily for a week", earned: true },
    { name: "Step Master", icon: "👟", description: "Walk 10,000 steps in a day", earned: false },
    { name: "Consistency King", icon: "👑", description: "Complete daily challenges for 30 days", earned: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Daily Challenges</h1>
        <p className="text-muted-foreground">Complete challenges to earn points and stay healthy!</p>
      </div>

      {/* Today's Challenge */}
      <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Today's Challenge</CardTitle>
                <CardDescription>{todayChallenge.timeLeft}</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              +{todayChallenge.points} points
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{todayChallenge.title}</h3>
            <p className="text-muted-foreground">{todayChallenge.description}</p>
          </div>
          
          <ProgressBar
            value={todayChallenge.progress}
            max={todayChallenge.target}
            label={`${todayChallenge.progress.toLocaleString()} / ${todayChallenge.target.toLocaleString()} steps`}
            color="orange"
          />
          
          <Button 
            className="w-full" 
            onClick={() => setTodayCompleted(!todayCompleted)}
            disabled={todayCompleted}
          >
            {todayCompleted ? "✅ Challenge Completed!" : "Mark as Completed"}
          </Button>
        </CardContent>
      </Card>

      {/* Weekly Tasks and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-purple-600" />
              Weekly Tasks
            </CardTitle>
            <CardDescription>Complete these tasks throughout the week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyTasks.map((task, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">{task.title}</p>
                  <Badge variant="outline" className="ml-2">
                    +{task.points}
                  </Badge>
                </div>
                <ProgressBar
                  value={task.completed}
                  max={task.total}
                  label={`${task.completed}/${task.total} days`}
                  size="sm"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Weekly Leaderboard
            </CardTitle>
            <CardDescription>Top performers this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    user.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{user.avatar}</span>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">#{user.rank}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{user.points} pts</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-600" />
            Achievement Badges
          </CardTitle>
          <CardDescription>Earn badges by completing specific milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <div 
                key={index} 
                className={`text-center p-4 rounded-lg border-2 ${
                  badge.earned 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h3 className="font-semibold text-sm">{badge.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                {badge.earned && (
                  <Badge className="mt-2 bg-green-100 text-green-800">Earned!</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}