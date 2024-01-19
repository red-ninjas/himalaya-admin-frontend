export const calculateTimeToRead = (content: string) => {
  const wordsPerMinute = 250; // Adjust  reading speed estimation
  const text = content.replace(/<\/?[^>]+(>|$)/g, '');
  const wordCount = text.trim().split(/\s+/).length;
  const timeToRead = Math.ceil(wordCount / wordsPerMinute);
  return timeToRead;
};

export const extractAvatarText = (str?: string) => {
  if (!str) {
    return;
  }

  return `${str[0]}${str[1] ?? ''}`.toUpperCase();
};
export const isServer = typeof window === 'undefined';
