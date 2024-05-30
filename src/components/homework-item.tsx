import { LegacyRef, forwardRef } from 'react';

import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';
import { DialogTrigger } from './ui/dialog';

import { twMerge } from 'tailwind-merge';
import { formatRelativeDate } from '@/utils/format-date';
import { Homework, Priority } from '@/types';

export const HomeworkItem = forwardRef(
  (
    { title, description, subject, priority, deadline, done }: Homework,
    ref
  ) => {
    const badgeVariantDictionary: Record<
      Priority,
      'success' | 'secondary' | 'destructive'
    > = {
      low: 'success',
      medium: 'secondary',
      high: 'destructive',
    };

    return (
      <DialogTrigger
        ref={ref as LegacyRef<HTMLButtonElement> | undefined}
        asChild
      >
        <Card
          className={twMerge(
            'border-muted space-y-4 hover:bg-muted/25 hover:border-transparent transition-colors cursor-pointer',
            done && 'border-primary/15 bg-muted/25 hover:border-primary/15'
          )}
        >
          <CardHeader className='flex flex-row gap-4 justify-between items-start overflow-hidden whitespace-nowrap text-ellipsis max-md:p-3 max-md:pb-0'>
            <div
              className={twMerge(
                'flex flex-col gap-1 overflow-hidden',
                done && 'line-through text-muted-foreground'
              )}
            >
              <CardTitle className='text-lg max-md:text-base'>
                {title}
              </CardTitle>

              <CardContent
                className={twMerge(
                  'p-0 text-muted-foreground overflow-hidden text-ellipsis max-md:text-sm',
                  done && 'line-through text-muted-foreground'
                )}
              >
                {description}
              </CardContent>
            </div>

            <Badge
              variant={badgeVariantDictionary[priority]}
              className='rounded-sm max-sm:py-[0.075rem] max-sm:px-[0.375rem]'
            >
              {priority}
            </Badge>
          </CardHeader>

          <CardFooter className='flex items-center justify-between max-md:p-3 max-md:pt-0 max-md:flex-col max-md:items-start max-md:gap-4'>
            <div className='flex items-center gap-4 h-5 max-sm:flex-col max-sm:items-start max-sm:h-auto max-sm:gap-0'>
              <p
                className={twMerge(
                  'max-md:text-sm',
                  done && 'line-through text-muted-foreground'
                )}
              >
                Subject:{' '}
                <span className='text-muted-foreground'>{subject}</span>
              </p>

              <Separator
                orientation='vertical'
                className='max-sm:hidden'
              />

              <p
                className={twMerge(
                  'max-md:text-sm',
                  done && 'line-through text-muted-foreground'
                )}
              >
                Deadline:{' '}
                <span className='text-muted-foreground'>
                  {formatRelativeDate(deadline)}
                </span>
              </p>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
    );
  }
);
