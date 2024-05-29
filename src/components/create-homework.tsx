import { ReactNode, useContext, useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';

import { createHomeWorkFormSchema as formSchema } from '../lib/zod/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { format } from 'date-fns';
import { cn } from '@/utils';
import { FormFields, Homework } from '@/types';
import { HomeworksContext } from '@/contexts/homeworks';
import { v4 as randomUUID } from 'uuid';
import { toast } from 'sonner';

import { CalendarIcon } from 'lucide-react';
import { removeSpaces } from '@/utils/remove-spaces';

type CreateHomeworkProps = {
  children: ReactNode;
};

export function CreateHomework({ children }: CreateHomeworkProps) {
  const [links, setLinks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { addHomework } = useContext(HomeworksContext);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      subject: '',
      priority: 'medium',
      deadline: undefined,
      currentLink: '',
      links: [],
    },
  });

  function onSubmit(values: FormFields) {
    setIsLoading(true);

    const data: Homework = {
      id: randomUUID(),
      title: values.title,
      description: values.description,
      subject: values.subject,
      priority: values.priority,
      deadline: values.deadline,
      done: false,
      links,
    };

    addHomework(data);

    form.reset();

    setIsLoading(false);
    handleCloseDialog();
  }

  function handleRemoveLink(link: string) {
    const newLinks = links.filter(item => item !== link);
    setLinks(newLinks);
  }

  function handleAddLink(newLink: string) {
    form.trigger('currentLink');

    const fieldState = form.getFieldState('currentLink');
    if (fieldState.error) return;

    form.resetField('currentLink');

    const formattedNewLink = removeSpaces(newLink);
    setLinks(previous => [...previous, formattedNewLink]);

    toast.success(`Successfully added.`, {
      description: `Link ${formattedNewLink} was added.`,
      dismissible: true,
      duration: 3000, // 3 seconds
      action: {
        label: 'Undo',
        onClick: () => handleRemoveLink(newLink),
      },
    });
  }

  // TODO: MOVE TO UTILS FOLDER
  function handleCloseDialog() {
    const closeButton = document.querySelector(
      'button[data-close-modal]'
    ) as HTMLButtonElement;
    closeButton.click();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        onPointerDownOutside={e => {
          // don't dismiss dialog when clicking inside the toast
          if (
            e.target instanceof Element &&
            e.target.closest('[data-sonner-toast]')
          )
            e.preventDefault();
        }}
        className='sm:max-w-[425px] border-muted overflow-y-scroll max-h-screen scrollbar-hide'
      >
        <DialogHeader className='max-sm:pt-10'>
          <DialogTitle>New homework</DialogTitle>

          <DialogDescription>
            Create your task with complete options and customize it in your way.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 py-4 max-sm:gap-1'
          >
            <div className='flex gap-3'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>

                    <FormControl>
                      <Input
                        placeholder='Research'
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='subject'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>

                    <FormControl>
                      <Input
                        placeholder='Arts'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder='Research about surrealism'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>

                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Priority' />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value='low'>low</SelectItem>
                        <SelectItem value='medium'>medium</SelectItem>
                        <SelectItem value='high'>high</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='deadline'
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2'>
                  <FormLabel className='w-fit'>Deadline</FormLabel>

                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto size-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className='w-auto p-0'
                        align='start'
                      >
                        <Calendar
                          mode='single'
                          disabled={date => date < new Date()}
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='currentLink'
              rules={{ required: false, shouldUnregister: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='currentLink'>
                    Links{' '}
                    <span className='text-muted-foreground'>(optional)</span>
                  </FormLabel>

                  <FormControl>
                    <div className='flex gap-2'>
                      <Input
                        placeholder='https://useful-link.com'
                        id='currentLink'
                        {...field}
                        onChange={event => {
                          field.onChange(event);
                          form.trigger(field.name);
                        }}
                      />

                      <Button
                        type='button'
                        variant='secondary'
                        onClick={() => handleAddLink(field.value!)}
                        disabled={!field.value}
                      >
                        Add
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className='max-sm:pb-10'>
          <DialogClose asChild>
            <Button
              variant='destructive'
              data-close-modal
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type='submit'
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
