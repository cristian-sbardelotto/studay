import { ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

type CreateHomeworkProps = {
  children: ReactNode;
};

export function CreateHomework({ children }: CreateHomeworkProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-[425px] border-muted'>
        <DialogHeader>
          <DialogTitle>New homework</DialogTitle>

          <DialogDescription>
            Create your task with complete options and customize it in your way.
          </DialogDescription>
        </DialogHeader>

        <form className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='name'
              className='text-right'
            >
              Name
            </Label>

            <Input
              id='name'
              className='col-span-3'
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label
              htmlFor='username'
              className='text-right'
            >
              Username
            </Label>

            <Input
              id='username'
              className='col-span-3'
            />
          </div>
        </form>

        <DialogFooter>
          <Button type='submit'>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
