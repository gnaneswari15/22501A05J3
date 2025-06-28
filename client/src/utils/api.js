export const storeShortenedUrls = (urls) => {
  localStorage.setItem('shortened', JSON.stringify(urls));
};

export const getShortenedUrls = () => {
  return JSON.parse(localStorage.getItem('shortened') || '[]');
};

export const storeClickStats = (stats) => {
  localStorage.setItem('clickStats', JSON.stringify(stats));
};

export const getClickStats = () => {
  return JSON.parse(localStorage.getItem('clickStats') || '[]');
};