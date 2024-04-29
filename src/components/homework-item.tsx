import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Checkbox } from './ui/checkbox';

// type HomeWork = {
//   title: string;
//   description: string;
//   subject: string;
//   done: boolean;
//   priority: 'low' | 'medium' | 'high';
// }

export function HomeWorkItem() {
  return (
    <li>
      <Card>
        <CardHeader className='flex flex-row justify-between items-center'>
          <div className='1flex 1flex-col 1gap-2'>
            <CardTitle>Trabalho</CardTitle>

            <CardDescription className='text-ellipsis overflow-hidden whitespace-nowrap'>
              Criar um desenho para representar a variação de temperatura
            </CardDescription>
          </div>

          <Checkbox />
        </CardHeader>

        <CardContent className='flex items-center gap-3'>
          <p>Física</p>

          <Badge variant='outline'>Medium</Badge>
        </CardContent>
      </Card>
    </li>
  );
}
