import { z } from 'zod';
import { createHomeWorkFormSchema } from './lib/zod/schemas';

export type FormFields = z.infer<typeof createHomeWorkFormSchema>;
