import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

import { LucideIcon } from 'lucide-react';

type ButtonLinkProps = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export function ButtonLink({ name, href, icon: Icon }: ButtonLinkProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <li>
          <Button
            asChild
            variant='outline'
            size='icon'
            className='py-0.5 px-2'
          >
            <a
              href={href}
              target='_blank'
            >
              <Icon size={18} />
            </a>
          </Button>
        </li>
      </TooltipTrigger>

      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
