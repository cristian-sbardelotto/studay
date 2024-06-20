import { Homework } from '@/types';

const priorityOrder = ['high', 'medium', 'low'];

function getPendingHomeworks(homeworks: Homework[]) {
  return homeworks.filter(homework => !homework.done);
}

function getDoneHomeworks(homeworks: Homework[]) {
  return homeworks.filter(homework => homework.done);
}

function sortHomeworksByPriority(homeworks: Homework[]) {
  const newHomeworks = [...homeworks];
  return newHomeworks.sort(
    (a, b) =>
      priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
  );
}

function sortHomeworksByDeadline(homeworks: Homework[]) {
  const newHomeworks = [...homeworks];
  return newHomeworks.sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );
}

export function filterHomeworks(homeworks: Homework[]) {
  const pendingHomeworks = getPendingHomeworks(homeworks);
  const doneHomeworks = getDoneHomeworks(homeworks);
  const prioritySortedHomeworks = sortHomeworksByPriority(homeworks);
  const deadlineSortedHomeworks = sortHomeworksByDeadline(homeworks);

  return {
    pendingHomeworks,
    doneHomeworks,
    prioritySortedHomeworks,
    deadlineSortedHomeworks,
  };
}
