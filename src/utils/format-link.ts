export function formatLink(link: string) {
  if (link.length < 75) return link;

  const formattedLink = `${link.slice(0, 75)}...`; // get first 75 chars and add "..."
  return formattedLink;
}
