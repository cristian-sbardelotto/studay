import { ReactNode, useEffect, useState } from 'react';

import { HomeworksContext } from '@/contexts/homeworks';
import { Homework, HomeworkFields } from '@/types';
import { sendGenericToastError } from '@/utils/send-generic-toast-error';
import { getLocalStorageHomeworks } from '@/utils/get-local-storage-homeworks';

type HomeworksContextProviderProps = {
  children: ReactNode;
};

const { homeworks: initialHomeworks } = getLocalStorageHomeworks();

export function HomeworksContextProvider({
  children,
}: HomeworksContextProviderProps) {
  const [homeworks, setHomeworks] = useState<Homework[]>(initialHomeworks);

  useEffect(() => {
    localStorage.setItem('homeworks', JSON.stringify(homeworks));
  }, [homeworks]);

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

    sendGenericToastError();
  }

  function toggleIsDone(id: string) {
    const doesHomeworkExist = homeworks.find(homework => homework.id === id);
    if (!doesHomeworkExist) {
      sendGenericToastError();
      return;
    }

    const newHomeworks = homeworks.map(homework => {
      if (homework.id === id) {
        homework.done = !homework.done;
      }

      return homework;
    });

    setHomeworks(newHomeworks);
  }

  function editHomework(id: string, data: HomeworkFields) {
    const newHomeworks = homeworks.map(homework => {
      if (homework.id === id) {
        homework = {
          ...data,
          id: homework.id,
          done: homework.done,
        };
      }

      return homework;
    });

    setHomeworks(newHomeworks);
  }

  return (
    <HomeworksContext.Provider
      value={{
        homeworks,
        addHomework,
        deleteHomework,
        toggleIsDone,
        editHomework,
      }}
    >
      {children}
    </HomeworksContext.Provider>
  );
}
