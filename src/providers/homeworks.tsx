import { ReactNode } from 'react';

import { HomeworksContext } from '@/contexts/homeworks';
import { Homework } from '@/types';
import { homeworksMock } from '@/data/homeworks-mock';

type HomeworksContextProviderProps = {
  children: ReactNode;
};

export function HomeworksContextProvider({
  children,
}: HomeworksContextProviderProps) {
  function addHomework(homework: Homework) {
    console.log('added', homework);
  }

  return (
    <HomeworksContext.Provider
      value={{ homeworks: homeworksMock, addHomework }}
    >
      {children}
    </HomeworksContext.Provider>
  );
}
