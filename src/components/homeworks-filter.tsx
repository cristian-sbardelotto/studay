import { HomeworkItem } from './homework-item';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

import { Homework } from '@/types';
import { filterHomeworks } from '@/utils/filter-homeworks';

type HomeworksFilterProps = {
  homeworks: Homework[];
};

export function HomeworksFilter({ homeworks }: HomeworksFilterProps) {
  const {
    doneHomeworks,
    pendingHomeworks,
    prioritySortedHomeworks,
    deadlineSortedHomeworks,
  } = filterHomeworks(homeworks);

  return (
    <Tabs defaultValue='all'>
      <TabsList className='mb-4'>
        <TabsTrigger value='all'>All</TabsTrigger>
        <TabsTrigger value='pending'>Pending</TabsTrigger>
        <TabsTrigger value='done'>Done</TabsTrigger>
        <TabsTrigger value='sort-priority'>Priority</TabsTrigger>
        <TabsTrigger value='sort-deadline'>Deadline</TabsTrigger>
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
      <TabsContent value='pending'>
        <ul className='flex flex-col gap-4'>
          {pendingHomeworks.length > 0 ? (
            pendingHomeworks.map(homework => (
              <li key={homework.id}>
                <HomeworkItem {...homework} />
              </li>
            ))
          ) : (
            <p className='text-muted-foreground'>No pending homeworks.</p>
          )}
        </ul>
      </TabsContent>
      <TabsContent value='done'>
        <ul className='flex flex-col gap-4'>
          {doneHomeworks.length > 0 ? (
            doneHomeworks.map(homework => (
              <li key={homework.id}>
                <HomeworkItem {...homework} />
              </li>
            ))
          ) : (
            <p className='text-muted-foreground'>
              You haven't finished any of your homework yet.
            </p>
          )}
        </ul>
      </TabsContent>
      <TabsContent value='sort-priority'>
        <ul className='flex flex-col gap-4'>
          {prioritySortedHomeworks.map(homework => (
            <li key={homework.id}>
              <HomeworkItem {...homework} />
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value='sort-deadline'>
        <ul className='flex flex-col gap-4'>
          {deadlineSortedHomeworks.map(homework => (
            <li key={homework.id}>
              <HomeworkItem {...homework} />
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
