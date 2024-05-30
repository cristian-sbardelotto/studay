import { z } from 'zod';
import { createHomeWorkFormSchema } from './lib/zod/schemas';

export type Homework = {
  id: string;
  title: string;
  description: string;
  subject: string;
  deadline: Date;
  done: boolean;
  priority: 'low' | 'medium' | 'high';
  links?: string[];
};

export type Priority = 'low' | 'medium' | 'high';

export type FormFields = z.infer<typeof createHomeWorkFormSchema>;
