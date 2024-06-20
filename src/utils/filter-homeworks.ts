import { Homework } from '@/types';

export function filterHomeworks(homeworks: Homework[]) {
  const pendingHomeworks = homeworks.filter(homework => !homework.done);
  const doneHomeworks = homeworks.filter(homework => homework.done);

  return {
    pendingHomeworks,
    doneHomeworks,
  };
}
