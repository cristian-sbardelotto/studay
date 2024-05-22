import { ReactNode, useState } from 'react';

import { HomeworksContext } from '@/contexts/homeworks';
import { Homework } from '@/types';
import { homeworksMock } from '@/data/homeworks-mock';

type HomeworksContextProviderProps = {
  children: ReactNode;
};

export function HomeworksContextProvider({
  children,
}: HomeworksContextProviderProps) {
  const [homeworks, setHomeworks] = useState<Homework[]>(homeworksMock);

  function addHomework(homework: Homework) {
    setHomeworks(previous => [...previous, homework]);
  }

  return (
    <HomeworksContext.Provider value={{ homeworks, addHomework }}>
      {children}
    </HomeworksContext.Provider>
  );
}
