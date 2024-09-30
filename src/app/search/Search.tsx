import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { PostList } from '../components/PostList';
import { useApi } from '../hooks/useApi';
import { SEARCH_PARAM } from './constants';
import { SearchForm } from './components/SearchForm';

export const Search: FC = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get(SEARCH_PARAM) || '');
  const [debouncedSearch] = useDebounce(search, 500);
  const { posts, loading, apiError, getData, setPosts } = useApi();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const searchPosts = async (term: string, signal?: AbortSignal) => {
      if (!term.trim()) {
        setPosts([]);

        return;
      }

      await getData(signal, term);
    };

    const controller = new AbortController();
    const { signal } = controller;

    searchPosts(debouncedSearch, signal);

    return () => {
      controller.abort();
    };
  }, [debouncedSearch, getData, setPosts]);

  return (
    <>
      <title>{`Search ${search}`}</title>
      <SearchForm value={search} onChange={handleChange} apiError={apiError} />
      <PostList posts={posts} isLoading={loading} />
    </>
  );
};
