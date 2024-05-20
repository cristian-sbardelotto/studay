import { z } from 'zod';

import { addDays } from 'date-fns';

export const createHomeWorkFormSchema = z.object({
  title: z.string().min(2, 'Title is too short!').max(50, 'Title is too long!'),
  description: z
    .string()
    .min(2, 'Description is too short!')
    .max(1000, 'Description is too long!'),
  subject: z
    .string()
    .min(2, 'Subject is too short!')
    .max(50, 'Subject is too long!'),
  deadline: z
    .date({ required_error: 'Deadline is required!' })
    .min(new Date())
    .refine(
      data => data > addDays(new Date(), -1),
      'Start date must be in the future'
    ),
  priority: z.union([z.literal('low'), z.literal('medium'), z.literal('high')]),
  currentLink: z
    .string()
    .url('This is not a valid URL!')
    .optional()
    .or(z.literal('')),
  links: z.string().url('This is not a valid URL!').optional().array(),
});
