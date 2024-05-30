import { toast } from 'sonner';

export function sendGenericToastError() {
  return toast.error('Something went wrong!', {
    description: 'Try again later.',
  });
}
