import { createContext } from 'react';

import { homeworksMock } from '@/data/homeworks-mock';

import { Homework } from '@/types';

type HomeworksContextProps = {
  homeworks: Homework[];
  addHomework(homework: Homework): void;
};

export const HomeworksContext = createContext<HomeworksContextProps>({
  homeworks: homeworksMock,
  addHomework: () => {},
});
