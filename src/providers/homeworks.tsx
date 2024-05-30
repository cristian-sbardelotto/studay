import { ReactNode, useState } from 'react';

import { HomeworksContext } from '@/contexts/homeworks';
import { Homework } from '@/types';
import { homeworksMock } from '@/data/homeworks-mock';
import { toast } from 'sonner';

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

  function deleteHomework(id: string) {
    const newHomeworks = homeworks.filter(homework => homework.id !== id);

    const isValidHomework = newHomeworks.length < homeworks.length;

    if (isValidHomework) {
      setHomeworks(newHomeworks);
      return;
    }

    toast.error('Something went wrong!', {
      description: 'Try again later.',
    });
  }

  return (
    <HomeworksContext.Provider
      value={{ homeworks, addHomework, deleteHomework }}
    >
      {children}
    </HomeworksContext.Provider>
  );
}
