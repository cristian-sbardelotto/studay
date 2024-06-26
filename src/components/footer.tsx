import { ButtonLink } from './button-link';
import { Button } from './ui/button';
import { TooltipProvider } from './ui/tooltip';

import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className='border-t border-muted'>
      <div className='container px-4 py-7 flex items-center justify-between max-sm:flex-col max-sm:gap-3'>
        <p className='text-muted-foreground max-sm:text-center'>
          Made with 🧡 by{' '}
          <Button
            className='p-0 m-0 text-base'
            asChild
            variant='link'
          >
            <a
              href='https://linkedin.com/in/cristian-k-sbardelotto/'
              target='_blank'
              className='text-primary'
            >
              Cristian Sbardelotto.
            </a>
          </Button>
        </p>

        <nav>
          <ul className='flex h-6 items-center gap-3 text-muted-foreground'>
            <TooltipProvider>
              <ButtonLink
                name='Github'
                href='https://github.com/cristian-sbardelotto/'
                icon={GithubIcon}
              />

              <ButtonLink
                name='LinkedIn'
                href='https://linkedin.com/in/cristian-k-sbardelotto'
                icon={LinkedinIcon}
              />

              <ButtonLink
                name='Gmail'
                href='https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=cristian.k.sbardelotto@gmail.com'
                icon={MailIcon}
              />
            </TooltipProvider>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
