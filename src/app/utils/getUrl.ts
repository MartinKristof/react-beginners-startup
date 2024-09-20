const API_URL = import.meta.env.VITE_API_URL;

export const getUrl = (searchParam?: string) => {
  const url = new URL(API_URL);

  if (searchParam) {
    url.searchParams.append('q', searchParam);
  }

  url.searchParams.append('_sort', 'id');
  url.searchParams.append('_order', 'desc');

  return url;
};
