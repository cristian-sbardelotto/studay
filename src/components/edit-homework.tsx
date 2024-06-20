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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

import { format } from 'date-fns';
import { cn } from '@/utils';
import { useForm } from 'react-hook-form';
import { FormFields, HomeworkFields, Link } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { editHomeWorkFormSchema as formSchema } from '@/lib/zod/schemas';
import { HomeworksContext } from '@/contexts/homeworks';
import { removeSpaces } from '@/utils/remove-spaces';
import { closeDialog } from '@/utils/close-dialog';
import { toast } from 'sonner';
import { v4 as randomUUID } from 'uuid';

import { CalendarIcon, XIcon } from 'lucide-react';

type EditHomeworkProps = {
  id: string;
};

export function EditHomework({ id }: EditHomeworkProps) {
  const { homeworks, editHomework } = useContext(HomeworksContext);
  const homework = homeworks.find(item => item.id === id);

  const [links, setLinks] = useState<Link[]>(homework?.links || []);

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
    const data: HomeworkFields = {
      title: values.title,
      description: values.description,
      deadline: values.deadline,
      priority: values.priority,
      subject: values.subject,
      links,
    };

    editHomework(id, data);

    closeDialog();
    toast.success('Homework edited successfully!', {
      dismissible: true,
      duration: 3000, // 3 seconds
    });
  }

  function handleAddLink(newLink: string) {
    form.trigger('currentLink');

    const fieldState = form.getFieldState('currentLink');
    if (fieldState.error) return;

    form.resetField('currentLink');

    const isAlreadyCreated = links.some(link => link.url === newLink);
    if (isAlreadyCreated) {
      toast('This link was already created!', {
        position: 'bottom-left',
        dismissible: true,
        duration: 3000, // 3 seconds
      });

      return;
    }

    const formattedNewLink = {
      id: randomUUID(),
      url: removeSpaces(newLink),
    };
    setLinks(previous => [...previous, formattedNewLink]);
  }

  function handleRemoveLink(id: string) {
    const newLinks = links.filter(item => item.id !== id);
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
          <div className='flex gap-3 max-sm:flex-col'>
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
                <FormLabel htmlFor='priority'>Priority</FormLabel>

                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    name='priority'
                  >
                    <SelectTrigger
                      id='priority'
                      className='w-[180px]'
                    >
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
                  <div className='flex gap-2 max-sm:flex-col'>
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

          <div className='flex flex-col gap-1.5'>
            <h4>Links</h4>

            <ul className='flex flex-col gap-1.5 text-muted-foreground'>
              {links.length ? (
                links.map(link => (
                  <li
                    className='flex items-center gap-4'
                    key={link.id}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='size-7 flex-none'
                            onClick={() => handleRemoveLink(link.id)}
                          >
                            <XIcon size={14} />
                          </Button>
                        </TooltipTrigger>

                        <TooltipContent>
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <p className='text-sm break-all'>{link.url}</p>
                  </li>
                ))
              ) : (
                <p className='text-muted-foreground text-sm'>
                  This homework has no links. If you want to add some, use the{' '}
                  <Button
                    variant='link'
                    type='button'
                    className='text-foreground p-0 h-auto'
                    onClick={() => form.setFocus('currentLink')}
                  >
                    Links
                  </Button>{' '}
                  field.
                </p>
              )}
            </ul>
          </div>
        </form>
      </Form>

      <SheetFooter>
        <SheetClose asChild>
          <Button variant='destructive'>Cancel</Button>
        </SheetClose>

        <Button
          type='submit'
          onClick={form.handleSubmit(onSubmit)}
        >
          Save changes
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
