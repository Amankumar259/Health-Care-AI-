import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'orange' | 'red';
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  className, 
  size = 'md',
  showPercentage = true,
  color = 'blue'
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showPercentage && <span className="font-medium">{percentage}%</span>}
        </div>
      )}
      <Progress 
        value={percentage} 
        className={cn('w-full', sizeClasses[size])}
      />
    </div>
  );
}