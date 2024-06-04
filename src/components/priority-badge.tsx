import { Badge } from './ui/badge';

import { Priority } from '@/types';

type PriorityBadgeProps = {
  priority: Priority;
  size?: 'sm' | 'md';
};

export function PriorityBadge({ priority, size = 'md' }: PriorityBadgeProps) {
  const badgeVariantDictionary: Record<
    Priority,
    'success' | 'secondary' | 'destructive'
  > = {
    low: 'success',
    medium: 'secondary',
    high: 'destructive',
  };

  return (
    <Badge
      variant={badgeVariantDictionary[priority]}
      className={`rounded-sm font-normal ${
        size === 'sm' && 'max-sm:py-[0.075rem] max-sm:px-[0.375rem]'
      }`}
    >
      {priority}
    </Badge>
  );
}
