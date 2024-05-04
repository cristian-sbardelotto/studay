import { PlusCircleIcon } from 'lucide-react';
import { Button } from './ui/button';
import { HomeWorkItem } from './homework-item';

export function List() {
  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-extrabold max-md:text-2xl'>My space</h2>

        <Button className='gap-2 max-md:text-sm'>
          <PlusCircleIcon size={16} /> New
        </Button>
      </div>

      <ul className='flex flex-col gap-4'>
        <li>
          <HomeWorkItem
            title='Prova'
            description='Prova relacionada ao conteúdo de variações de temperatura'
            priority='high'
            subject='Física'
            deadline={new Date()}
          />
        </li>
      </ul>
    </div>
  );
}
