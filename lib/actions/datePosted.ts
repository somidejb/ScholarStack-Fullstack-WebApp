
export const daysSincePosted = (postedAt: Date) => {
    const now = new Date();
    const postedDate = new Date(postedAt);
    const diffTime = Math.abs(now.getTime() - postedDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  