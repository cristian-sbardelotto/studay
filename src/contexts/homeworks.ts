import { createContext } from 'react';

import { Homework } from '@/types';

export const HomeworksContext = createContext<Homework[]>([]);
