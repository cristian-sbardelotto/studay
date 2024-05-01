import { useState } from 'react';

import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

import { twMerge } from 'tailwind-merge';

type Priority = 'low' | 'medium' | 'high';

type HomeWork = {
  title: string;
  description: string;
  subject: string;
  priority: Priority;
};

export function HomeWorkItem({
  title,
  description,
  subject,
  priority,
}: HomeWork) {
  const [isDone, setIsDone] = useState(false);

  function toggleIsDone() {
    setIsDone(previous => !previous);
  }

  const badgeVariantDictionary: Record<
    Priority,
    'success' | 'secondary' | 'destructive'
  > = {
    low: 'success',
    medium: 'secondary',
    high: 'destructive',
  };

  return (
    <li>
      <Card
        className={twMerge(
          'border-muted space-y-4 hover:bg-muted/15 hover:border-transparent transition-colors',
          isDone &&
            'border-emerald-500/20 bg-muted/25 hover:border-emerald-500/20'
        )}
      >
        <CardHeader className='flex flex-row gap-4 justify-between items-start overflow-hidden whitespace-nowrap text-ellipsis'>
          <div
            className={twMerge(
              'flex flex-col gap-1 overflow-hidden',
              isDone && 'line-through text-muted-foreground'
            )}
          >
            <CardTitle className='text-lg'>{title}</CardTitle>

            <CardContent
              className={twMerge(
                'p-0 text-muted-foreground overflow-hidden text-ellipsis',
                isDone && 'line-through text-muted-foreground'
              )}
            >
              {description}
            </CardContent>
          </div>

          <Badge
            variant={badgeVariantDictionary[priority]}
            className='rounded-sm'
          >
            {priority}-priority
          </Badge>
        </CardHeader>

        <CardFooter className='flex items-center justify-between'>
          <p className={isDone ? 'line-through text-muted-foreground' : ''}>
            Subject: <span className='text-muted-foreground'>{subject}</span>
          </p>

          <div className='flex items-center gap-1.5 cursor-pointer'>
            <Checkbox
              onCheckedChange={toggleIsDone}
              id='done'
            />

            <Label
              htmlFor='done'
              className='cursor-pointer'
            >
              Done
            </Label>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
}
