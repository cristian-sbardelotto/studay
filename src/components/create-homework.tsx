import { ReactNode, useState } from 'react';

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
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';

import { createHomeWorkFormSchema as formSchema } from '../lib/zod/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { format } from 'date-fns';
import { cn } from '@/utils';
import { FormFields } from '@/types';
import { CalendarIcon } from 'lucide-react';

type CreateHomeworkProps = {
  children: ReactNode;
};

export function CreateHomework({ children }: CreateHomeworkProps) {
  const [links, setLinks] = useState<string[]>([]);

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
    const data: Omit<FormFields, 'currentLink'> = {
      title: values.title,
      description: values.description,
      subject: values.subject,
      priority: values.priority,
      deadline: values.deadline,
      links,
    };

    console.table(data);
  }

  function handleAddLink(newValue: string) {
    form.trigger('currentLink');

    const fieldState = form.getFieldState('currentLink');
    if (fieldState.error) return;

    form.resetField('currentLink');
    setLinks(previous => [...previous, newValue]);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-[425px] border-muted overflow-y-scroll max-h-screen scrollbar-hide'>
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
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Input
                      placeholder='Research about surrealism'
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
                        <SelectItem
                          className='text-emerald-500'
                          value='low'
                        >
                          low
                        </SelectItem>

                        <SelectItem value='medium'>medium</SelectItem>
                        <SelectItem
                          className='text-destructive'
                          value='high'
                        >
                          high
                        </SelectItem>
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
                  <FormLabel>Deadline</FormLabel>

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
                          form.trigger('currentLink');
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
            <Button variant='destructive'>Cancel</Button>
          </DialogClose>

          <Button
            type='submit'
            onClick={form.handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
