import { createContext } from 'react';

import { homeworksMock } from '@/data/homeworks-mock';

import { Homework, HomeworkFields } from '@/types';

type HomeworksContextProps = {
  homeworks: Homework[];
  addHomework(homework: Homework): void;
  deleteHomework(id: string): void;
  toggleIsDone(id: string): void;
  editHomework(id: string, homework: HomeworkFields): void;
};

export const HomeworksContext = createContext<HomeworksContextProps>({
  homeworks: homeworksMock,
  addHomework: function () {},
  deleteHomework: function () {},
  toggleIsDone: function () {},
  editHomework: function () {},
});
