import StatCard from '@/components/StatCard';
import CircularProgress from '@/components/CircularProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, Moon, Lightbulb } from 'lucide-react';

export default function Dashboard() {
  const todaySteps = 7842;
  const stepGoal = 10000;
  const heartRate = 72;
  const sleepHours = 7.5;

  const healthTips = [
    "Take a 5-minute walk every hour to boost circulation",
    "Drink water before you feel thirsty to stay hydrated",
    "Practice deep breathing for 2 minutes to reduce stress",
    "Eat a handful of nuts for healthy fats and protein"
  ];

  const currentTip = healthTips[Math.floor(Math.random() * healthTips.length)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your health overview for today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Steps Today"
          value={todaySteps.toLocaleString()}
          icon={Activity}
          description={`${Math.round((todaySteps / stepGoal) * 100)}% of daily goal`}
          color="blue"
        />
        <StatCard
          title="Heart Rate"
          value={`${heartRate} bpm`}
          icon={Heart}
          description="Resting heart rate"
          color="red"
        />
        <StatCard
          title="Sleep Last Night"
          value={`${sleepHours}h`}
          icon={Moon}
          description="Good quality sleep"
          color="green"
        />
      </div>

      {/* Activity Progress and AI Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity Goal */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Activity Goal</CardTitle>
            <CardDescription>Keep moving to reach your daily target</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <CircularProgress
              value={todaySteps}
              max={stepGoal}
              size={150}
              strokeWidth={10}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">{todaySteps.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">of {stepGoal.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">steps</div>
              </div>
            </CircularProgress>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {stepGoal - todaySteps > 0 
                  ? `${(stepGoal - todaySteps).toLocaleString()} steps to go!`
                  : "Goal achieved! Great job!"
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AI Health Tip */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Daily AI Health Tip
            </CardTitle>
            <CardDescription>Personalized recommendation for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">{currentTip}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>💡 Powered by AI</span>
                <span>Updated daily</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Health Check</CardTitle>
          <CardDescription>How are you feeling today?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-50 hover:bg-green-100 cursor-pointer transition-colors">
              <div className="text-2xl mb-2">😊</div>
              <p className="text-sm font-medium">Great</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-yellow-50 hover:bg-yellow-100 cursor-pointer transition-colors">
              <div className="text-2xl mb-2">😐</div>
              <p className="text-sm font-medium">Okay</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 hover:bg-orange-100 cursor-pointer transition-colors">
              <div className="text-2xl mb-2">😰</div>
              <p className="text-sm font-medium">Stressed</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-50 hover:bg-red-100 cursor-pointer transition-colors">
              <div className="text-2xl mb-2">🤒</div>
              <p className="text-sm font-medium">Unwell</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}