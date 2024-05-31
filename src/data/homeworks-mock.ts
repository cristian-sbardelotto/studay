import { Homework } from '@/types';

import { v4 as randomUUID } from 'uuid';

export const homeworksMock: Homework[] = [
  {
    id: randomUUID(),
    title: 'Prova',
    description: 'Prova relacionada ao conteúdo de variações de temperatura',
    priority: 'high',
    subject: 'Física',
    deadline: new Date(),
    links: [
      'https://github.com/',
      'https://linkedin.com/',
      'https://ui.shadcn.com/docs/components/button#icon',
    ],
    done: false,
  },
  {
    id: randomUUID(),
    title: 'Trabalho',
    description:
      'Trabalho de pesquisa em dupla sobre o teorema de Pitágoras e sua criação',
    priority: 'medium',
    subject: 'Matemática',
    deadline: new Date(),
    done: false,
  },
  {
    id: randomUUID(),
    title: 'Desenho',
    description:
      'Desenho que envolva conceitos como surrealismo, trabalhados em aula',
    priority: 'low',
    subject: 'Física',
    deadline: new Date(),
    done: false,
  },
];
