import { Link } from '@/types';

export function removeRepeatedLinks(links: Link[]) {
  const uniqueUrls = new Set();

  const filteredLinks = links.filter(item => {
    if (!uniqueUrls.has(item.url)) {
      uniqueUrls.add(item.url);
      return true;
    }

    return false;
  });

  return filteredLinks;
}
