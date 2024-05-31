import { useContext, useState } from 'react';

import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from './ui/sheet';
import { Textarea } from './ui/textarea';

import { format } from 'date-fns';
import { cn } from '@/utils';
import { useForm } from 'react-hook-form';
import { FormFields } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { editHomeWorkFormSchema as formSchema } from '@/lib/zod/schemas';
import { HomeworksContext } from '@/contexts/homeworks';
import { removeSpaces } from '@/utils/remove-spaces';

import { CalendarIcon, XIcon } from 'lucide-react';

type EditHomeworkProps = {
  id: string;
};

export function EditHomework({ id }: EditHomeworkProps) {
  const { homeworks } = useContext(HomeworksContext);
  const homework = homeworks.find(item => item.id === id);

  const [links, setLinks] = useState<string[]>(homework?.links || []);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: homework?.title,
      description: homework?.description,
      subject: homework?.subject,
      priority: homework?.priority,
      deadline: homework?.deadline,
      currentLink: '',
      links: homework?.links,
    },
  });

  function onSubmit(values: FormFields) {
    console.table(values);
  }

  function handleAddLink(newLink: string) {
    form.trigger('currentLink');

    const fieldState = form.getFieldState('currentLink');
    if (fieldState.error) return;

    form.resetField('currentLink');

    const formattedNewLink = removeSpaces(newLink);
    setLinks(previous => [...previous, formattedNewLink]);
  }

  function handleRemoveLink(link: string) {
    const newLinks = links.filter(item => item !== link);
    setLinks(newLinks);
  }

  return (
    <SheetContent className='overflow-y-auto'>
      <SheetHeader>
        <SheetTitle>Edit homework</SheetTitle>

        <SheetDescription>
          Make changes in your homework here. Click save changes when you're
          done.
        </SheetDescription>
      </SheetHeader>

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
                          {format(field.value, 'PPP')}
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

          <ul className='flex flex-col gap-1.5 text-muted-foreground'>
            {links.length ? (
              links.map(link => (
                <li
                  className='flex items-center gap-4'
                  key={link}
                >
                  <Button
                    variant='ghost'
                    size='icon'
                    className='size-7 flex-none'
                  >
                    <XIcon size={14} />
                    <span className='sr-only'>Delete</span>
                  </Button>

                  <p className='text-sm break-all'>{link}</p>
                </li>
              ))
            ) : (
              <p className='text-muted-foreground'>
                This homework has no links. If you want to add some, use the{' '}
                <span className='text-foreground'>Links</span> field.
              </p>
            )}
          </ul>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant='destructive'>Cancel</Button>
            </SheetClose>

            <Button type='submit'>Save changes</Button>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}