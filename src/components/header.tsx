import { GithubIcon } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className='border-b border-muted'>
      <div className='container px-4 py-7 flex items-center justify-between max-sm:flex-wrap'>
        <h1 className='text-3xl max-sm:text-2xl font-bold'>
          stu<span className='text-muted-foreground'>day</span>
        </h1>

        <Button
          variant='outline'
          className='rounded-md p-4 text-muted-foreground gap-2 max-sm:text-sm max-sm:p-3'
          asChild
        >
          <a
            href='https://github.com/cristian-sbardelotto/studay'
            target='_blank'
          >
            <GithubIcon
              size={18}
              className='max-sm:size-3.5'
            />{' '}
            Github
          </a>
        </Button>
      </div>
    </header>
  );
}
