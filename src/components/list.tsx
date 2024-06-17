import { useContext } from 'react';

import { Button } from './ui/button';
import { HomeworkItem } from './homework-item';
import { CreateHomework } from './create-homework';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

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

      {homeworks.length > 0 ? (
        <Tabs defaultValue='all'>
          <TabsList>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='pending'>Pending</TabsTrigger>
            <TabsTrigger value='done'>Done</TabsTrigger>
          </TabsList>
          <TabsContent value='all'>
            <ul className='flex flex-col gap-4'>
              {homeworks.map(homework => (
                <li key={homework.id}>
                  <HomeworkItem {...homework} />
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value='pending'>Change your password here.</TabsContent>
          <TabsContent value='done'>
            Here are all the things you've done.
          </TabsContent>
        </Tabs>
      ) : (
        <p className='text-muted-foreground'>
          You have no homeworks assigned. Consider yourself lucky!
        </p>
      )}
    </div>
  );
}
