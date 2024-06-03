import { useContext } from 'react';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import { Sheet, SheetTrigger } from './ui/sheet';
import { EditHomework } from './edit-homework';

import { Homework, Priority } from '@/types';
import { formatDate } from '@/utils/format-date';
import { closeDialog } from '@/utils/close-dialog';
import { formatLink } from '@/utils/format-link';
import { HomeworksContext } from '@/contexts/homeworks';

import { SquarePenIcon, Trash2Icon } from 'lucide-react';

type HomeworkInfoProps = {
  homework: Homework;
};

export function HomeworkInfo({ homework }: HomeworkInfoProps) {
  const { deleteHomework, toggleIsDone } = useContext(HomeworksContext);

  const badgeVariantDictionary: Record<
    Priority,
    'success' | 'secondary' | 'destructive'
  > = {
    low: 'success',
    medium: 'secondary',
    high: 'destructive',
  };

  function handleDeleteHomework(id: string) {
    deleteHomework(id);
    closeDialog();
  }

  function handleToggleIsDone(id: string) {
    toggleIsDone(id);
    closeDialog();
  }

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
            {homework.links?.length ? (
              homework.links.map(link => (
                <li key={link}>
                  <a
                    href={link}
                    title={link}
                    target='_blank'
                    className='underline-offset-4 hover:underline w-fit break-all'
                  >
                    {formatLink(link)}
                  </a>
                </li>
              ))
            ) : (
              <p className='text-muted-foreground'>
                This homework has no links. If you want to add some, please{' '}
                <span className='text-foreground'>edit</span> the homework.
              </p>
            )}
          </ul>
        </div>

        <DialogFooter className='flex sm:justify-between'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className='gap-1.5 text-muted-foreground px-2.5'
                variant='ghost'
              >
                Edit <SquarePenIcon size={16} />
              </Button>
            </SheetTrigger>

            <EditHomework id={homework.id} />
          </Sheet>

          <div className='flex gap-2'>
            <Button
              className='px-3 max-sm:flex-1'
              variant='destructive'
              onClick={() => handleDeleteHomework(homework.id)}
            >
              <Trash2Icon size={16} />
              <span className='sr-only'>Delete</span>
            </Button>

            <Button
              className='max-sm:flex-1'
              variant={homework.done ? 'default' : 'success'}
              onClick={() => handleToggleIsDone(homework.id)}
            >
              {homework.done ? 'Mark as pending' : 'Mark as done'}
            </Button>
          </div>

          <DialogClose asChild>
            <Button
              className='sr-only'
              data-close-modal
            >
              Close Dialog
            </Button>
          </DialogClose>
        </DialogFooter>
      </div>
    </DialogContent>
  );
}
