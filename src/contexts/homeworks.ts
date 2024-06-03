import { createContext } from 'react';

import { Homework, HomeworkFields } from '@/types';

type HomeworksContextProps = {
  homeworks: Homework[];
  addHomework(homework: Homework): void;
  deleteHomework(id: string): void;
  toggleIsDone(id: string): void;
  editHomework(id: string, homework: HomeworkFields): void;
};

export const HomeworksContext = createContext<HomeworksContextProps>({
  homeworks: [],
  addHomework: function () {},
  deleteHomework: function () {},
  toggleIsDone: function () {},
  editHomework: function () {},
});
