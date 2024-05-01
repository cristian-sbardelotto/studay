import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('en');

export function formatDate(date: Date) {
  return dayjs(date).format('MM/DD/YY');
}

export function formatRelativeDate(date: Date) {
  return dayjs().to(dayjs(date), true);
}
