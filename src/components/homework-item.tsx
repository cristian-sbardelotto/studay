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
import { Separator } from './ui/separator';

import { twMerge } from 'tailwind-merge';
import { formatRelativeDate } from '@/utils/format-date';

type Priority = 'low' | 'medium' | 'high';

type HomeWork = {
  title: string;
  description: string;
  subject: string;
  priority: Priority;
  deadline: Date;
};

export function HomeWorkItem({
  title,
  description,
  subject,
  priority,
  deadline,
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
          'border-muted space-y-4 hover:bg-muted/25 hover:border-transparent transition-colors',
          isDone && 'border-primary/15 bg-muted/25 hover:border-primary/15'
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
          <div className='flex items-center space-x-4 h-5'>
            <p className={isDone ? 'line-through text-muted-foreground' : ''}>
              Subject: <span className='text-muted-foreground'>{subject}</span>
            </p>

            <Separator orientation='vertical' />

            <p
              className={twMerge(
                'text-muted-foreground text-sm',
                isDone && 'line-through'
              )}
            >
              <span
                className={twMerge(
                  'text-primary',
                  isDone && 'text-muted-foreground'
                )}
              >
                Deadline:
              </span>{' '}
              {formatRelativeDate(deadline)}
            </p>
          </div>

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
