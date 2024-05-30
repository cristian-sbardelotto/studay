import { Badge } from './ui/badge';
import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';

import { Homework, Priority } from '@/types';
import { formatDate } from '@/utils/format-date';

type HomeworkInfoProps = {
  homework: Homework;
};

export function HomeworkInfo({ homework }: HomeworkInfoProps) {
  const badgeVariantDictionary: Record<
    Priority,
    'success' | 'secondary' | 'destructive'
  > = {
    low: 'success',
    medium: 'secondary',
    high: 'destructive',
  };

  return (
    <DialogContent className='border-muted outline-none'>
      <DialogHeader className='pr-4 flex flex-row gap-8 items-center space-y-0'>
        <DialogTitle>{homework.title}</DialogTitle>

        <Badge
          variant={badgeVariantDictionary[homework.priority]}
          className='rounded-sm font-normal'
        >
          {homework.priority}
        </Badge>
      </DialogHeader>

      <div className='text-sm space-y-4'>
        <div className='flex items-center gap-2'>
          <p>Due to {formatDate(homework.deadline)}</p>
          <p>-</p>
          <p>{homework.subject}</p>
        </div>

        <DialogDescription>{homework.description}</DialogDescription>

        <div className='flex flex-col gap-1.5'>
          <h4>Links</h4>

          <ul className='flex flex-col gap-0.5 text-muted-foreground'>
            {homework.links ? (
              homework.links.map(link => (
                <a
                  href={link}
                  target='_blank'
                  key={link}
                  className='underline-offset-4 hover:underline w-fit'
                >
                  {link}
                </a>
              ))
            ) : (
              <p className='text-muted-foreground'>
                This homework has no links. If you want to add some, please{' '}
                <span className='text-foreground'>edit</span> the homework.
              </p>
            )}
          </ul>
        </div>
      </div>
    </DialogContent>
  );
}
