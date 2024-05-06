import { z } from 'zod';

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
  deadline: z.date().min(new Date()),
  priority: z.union([z.literal('low'), z.literal('medium'), z.literal('high')]),
  links: z.string().url('This is not a valid link!').array().optional(),
});
