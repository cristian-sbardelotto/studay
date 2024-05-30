import { LegacyRef, forwardRef, useState } from 'react';

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
import { DialogTrigger } from './ui/dialog';

type Priority = 'low' | 'medium' | 'high';

type HomeWork = {
  title: string;
  description: string;
  subject: string;
  priority: Priority;
  deadline: Date;
};

// forwardRef problem
// how to solve:
// https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-forward-ref
// https://github.com/shadcn-ui/ui/issues/373

// const MyButton = forwardRef((props: HomeWork, forwardedRef) => (
//   <button {...props} ref={forwardedRef} />
// ));

export const HomeWorkItem = forwardRef(
  ({ title, description, subject, priority, deadline }: HomeWork, ref) => {
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
      <DialogTrigger
        ref={ref as LegacyRef<HTMLButtonElement> | undefined}
        asChild
      >
        <Card
          className={twMerge(
            'border-muted space-y-4 hover:bg-muted/25 hover:border-transparent transition-colors',
            isDone && 'border-primary/15 bg-muted/25 hover:border-primary/15'
          )}
        >
          <CardHeader className='flex flex-row gap-4 justify-between items-start overflow-hidden whitespace-nowrap text-ellipsis max-md:p-3 max-md:pb-0'>
            <div
              className={twMerge(
                'flex flex-col gap-1 overflow-hidden',
                isDone && 'line-through text-muted-foreground'
              )}
            >
              <CardTitle className='text-lg max-md:text-base'>
                {title}
              </CardTitle>

              <CardContent
                className={twMerge(
                  'p-0 text-muted-foreground overflow-hidden text-ellipsis max-md:text-sm',
                  isDone && 'line-through text-muted-foreground'
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
                  isDone && 'line-through text-muted-foreground'
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
                  isDone && 'line-through text-muted-foreground'
                )}
              >
                Deadline:{' '}
                <span className='text-muted-foreground'>
                  {formatRelativeDate(deadline)}
                </span>
              </p>
            </div>

            <div className='flex items-center gap-1.5 cursor-pointer rounded-xl max-md:w-full'>
              <Checkbox
                onCheckedChange={toggleIsDone}
                id='done'
              />

              <Label>Done</Label>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
    );
  }
);
