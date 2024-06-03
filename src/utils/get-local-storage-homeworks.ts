import { Homework } from '@/types';

export function getLocalStorageHomeworks() {
  const localStorageHomeworks = localStorage.getItem('homeworks') || '[]';
  const initialHomeworks = JSON.parse(localStorageHomeworks) as Homework[];

  const homeworks = initialHomeworks.map(homework => {
    return {
      ...homework,
      deadline: new Date(homework.deadline),
    };
  });

  return { homeworks };
}
