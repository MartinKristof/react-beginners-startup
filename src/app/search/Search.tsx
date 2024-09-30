import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { PostList } from '../components/PostList';
import { FormGroup } from '../components/FormGroup';
import { Input } from '../components/Input';
import { ErrorMessage } from '../components/ErrorMessage';
import { useApi } from '../hooks/useApi';

const SEARCH_PARAM = 'term';

const SEARCH_ID = 'search';

export const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  useEffect(() => {
    setSearchParams({ [SEARCH_PARAM]: search });

    return () => {
      setSearchParams({});
    };
  }, [search, setSearchParams]);

  return (
    <>
      <title>{`Search ${search}`}</title>
      <div className="w-1/3">
        <div className="mt-2">
          <form>
            <FormGroup label="Search" id={SEARCH_ID} error={apiError}>
              <Input
                type="text"
                name={SEARCH_ID}
                id={SEARCH_ID}
                placeholder="Search..."
                onChange={handleChange}
                value={search}
              />
            </FormGroup>
          </form>
        </div>
      </div>
      {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
      <PostList posts={posts} isLoading={loading} />
    </>
  );
};
