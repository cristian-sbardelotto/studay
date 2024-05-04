import { PlusCircleIcon } from 'lucide-react';
import { Button } from './ui/button';
import { HomeWorkItem } from './homework-item';

const homeworks: {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  subject: string;
  deadline: Date;
}[] = [
  {
    title: 'Prova',
    description: 'Prova relacionada ao conteúdo de variações de temperatura',
    priority: 'high',
    subject: 'Física',
    deadline: new Date(),
  },
  {
    title: 'Trabalho',
    description:
      'Trabalho de pesquisa em dupla sobre o teorema de Pitágoras e sua criação',
    priority: 'medium',
    subject: 'Matematica',
    deadline: new Date(),
  },
  {
    title: 'Desenho',
    description:
      'Desenho que envolva conceitos como surrealismo, trabalhados em aula',
    priority: 'low',
    subject: 'Física',
    deadline: new Date(),
  },
];

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
        {homeworks.map(homework => (
          <li key={homework.description}>
            <HomeWorkItem {...homework} />
          </li>
        ))}
      </ul>
    </div>
  );
}
