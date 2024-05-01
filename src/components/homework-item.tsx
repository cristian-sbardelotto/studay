import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

type HomeWork = {
  title: string;
  description: string;
  subject: string;
  done: boolean;
  priority: 'low' | 'medium' | 'high';
};

export function HomeWorkItem({}: HomeWork) {
  return (
    <>
      <li>
        <Card className='border-muted space-y-4 hover:bg-muted/15 hover:border-transparent transition-colors'>
          <CardHeader className='flex flex-row gap-4 justify-between items-start overflow-hidden whitespace-nowrap text-ellipsis'>
            <div className='flex flex-col gap-1 overflow-hidden'>
              <CardTitle className='text-lg'>Trabalho</CardTitle>

              <CardContent className='p-0 text-muted-foreground overflow-hidden text-ellipsis'>
                Criar um desenho para representar a variação de temperatura
              </CardContent>
            </div>

            <Badge
              variant='secondary'
              className='rounded-sm'
            >
              Medium
            </Badge>
          </CardHeader>

          <CardFooter className='flex items-center justify-between'>
            <p>
              Subject: <span className='text-muted-foreground'>física</span>
            </p>

            <div className='flex items-center gap-1.5 cursor-pointer'>
              <Checkbox id='done' />

              <Label
                htmlFor='done'
                className='cursor-pointer'
              >
                Done
              </Label>
            </div>
          </CardFooter>
        </Card>
      </li>

      <li>
        <Card className='border-emerald-500/20 space-y-4 bg-muted/25'>
          <CardHeader className='flex flex-row gap-4 justify-between items-start overflow-hidden whitespace-nowrap text-ellipsis'>
            <div className='flex flex-col gap-1 overflow-hidden'>
              <CardTitle className='text-lg text-muted-foreground line-through'>
                Trabalho
              </CardTitle>

              <CardContent className='p-0 text-muted-foreground overflow-hidden text-ellipsis line-through'>
                Criar um desenho para representar a variação de temperatura
              </CardContent>
            </div>

            <Badge
              variant='secondary'
              className='rounded-sm'
            >
              Medium
            </Badge>
          </CardHeader>

          <CardFooter className='flex items-center justify-between'>
            <p className='line-through text-muted-foreground'>
              Subject: <span className='text-muted-foreground'>física</span>
            </p>

            <div className='flex items-center gap-1.5 cursor-pointer'>
              <Checkbox
                defaultChecked
                id='done'
              />

              <Label
                htmlFor='done'
                className='cursor-pointer'
              >
                Done
              </Label>
            </div>
          </CardFooter>
        </Card>
      </li>
    </>
  );
}
