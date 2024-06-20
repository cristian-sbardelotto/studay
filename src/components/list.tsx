import { useContext } from 'react';

import { Button } from './ui/button';
import { CreateHomework } from './create-homework';

import { HomeworksContext } from '@/contexts/homeworks';

import { PlusCircleIcon } from 'lucide-react';
import { HomeworksFilter } from './homeworks-filter';

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

      {homeworks.length > 0 ? (
        <HomeworksFilter homeworks={homeworks} />
      ) : (
        <p className='text-muted-foreground'>
          You have no homeworks assigned. Consider yourself lucky!
        </p>
      )}
    </div>
  );
}
