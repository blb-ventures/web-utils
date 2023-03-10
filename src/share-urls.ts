export const linkedInShare = (url: string) =>
  `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

export const facebookShare = (url: string) => `https://www.facebook.com/sharer.php?u=${url}`;

export const twitterShare = (url: string, title?: string, userId?: string, hashTags?: string) =>
  `https://twitter.com/intent/tweet?url=${url}&text=${title ?? ''}&via=${userId ?? ''}&hashtags=${
    hashTags ?? ''
  }`;
