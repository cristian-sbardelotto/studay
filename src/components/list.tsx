import { PlusCircleIcon } from 'lucide-react';
import { Button } from './ui/button';
import { HomeWorkItem } from './homework-item';

export function List() {
  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-extrabold'>My space</h2>

        <Button className='gap-2'>
          <PlusCircleIcon size={16} /> New
        </Button>
      </div>

      <ul className='flex flex-col gap-4'>
        <HomeWorkItem />
      </ul>
    </div>
  );
}
