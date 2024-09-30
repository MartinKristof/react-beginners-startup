import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { getAbortController } from '../../utils/getAbortController';

export const usePosts = () => {
  const { posts, loading, apiError, getData, postData } = useApi();

  const handleSubmit = async (name: string, text: string) => {
    await postData({ name, text, publishedAt: new Date().getTime() });

    await getData();
  };

  useEffect(() => {
    const { controller, signal } = getAbortController();
    getData(signal);

    return () => {
      controller.abort();
    };
  }, [getData]);

  return { posts, loading, apiError, handleSubmit };
};
