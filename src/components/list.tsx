import { useContext } from 'react';

import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
import { HomeworkInfo } from './homework-info';
import { HomeWorkItem } from './homework-item';
import { CreateHomework } from './create-homework';
import { HomeworksContext } from '@/contexts/homeworks';

import { PlusCircleIcon } from 'lucide-react';

export function List() {
  const { homeworks } = useContext(HomeworksContext);

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-extrabold max-md:text-2xl'>My space</h2>

        <CreateHomework>
          <Button className='gap-2 max-md:text-sm'>
            <PlusCircleIcon size={16} /> New
          </Button>
        </CreateHomework>
      </div>

      <ul className='flex flex-col gap-4'>
        <Dialog>
          {homeworks.map(homework => (
            <li key={homework.id}>
              <HomeWorkItem {...homework} />

              <HomeworkInfo />
            </li>
          ))}
        </Dialog>
      </ul>
    </div>
  );
}
