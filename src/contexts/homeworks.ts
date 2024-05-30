import { createContext } from 'react';

import { homeworksMock } from '@/data/homeworks-mock';

import { Homework } from '@/types';

type HomeworksContextProps = {
  homeworks: Homework[];
  addHomework(homework: Homework): void;
  deleteHomework(id: string): void;
  toggleIsDone(id: string): void;
};

export const HomeworksContext = createContext<HomeworksContextProps>({
  homeworks: homeworksMock,
  addHomework: function () {},
  deleteHomework: function () {},
  toggleIsDone: function () {},
});
