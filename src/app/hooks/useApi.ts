import { useCallback, useState } from 'react';
import { TPost } from '../types';
import { getUrl } from '../utils/getUrl';

const getErrorMessage = (error: unknown, method: 'get' | 'post') =>
  `Failed to ${method} posts: ${error instanceof Error ? error.message : 'Unknown error'}`;

export const useApi = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async (signal?: AbortSignal, searchParam?: string) => {
    setLoading(true);
    try {
      const response = await fetch(getUrl(searchParam), { signal });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = (await response.json()) as TPost[];
      setPosts(data);
    } catch (error) {
      setApiError(getErrorMessage(error, 'get'));
    } finally {
      setLoading(false);
    }
  }, []);

  const postData = async (payload: Omit<TPost, 'id'>) => {
    try {
      const response = await fetch(getUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      (await response.json()) as TPost;
    } catch (error) {
      setApiError(getErrorMessage(error, 'post'));
      throw error;
    }
  };

  return { getData, postData, posts, apiError, loading, setPosts };
};
