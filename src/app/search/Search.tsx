import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { TPost } from '../types';
import { getUrl } from '../utils/getUrl';
import { PostList } from '../components/PostList';
import { FormGroup } from '../components/FormGroup';
import { Input } from '../components/Input';

const SEARCH_PARAM = 'term';

const SEARCH_ID = 'search';

export const Search: FC = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get(SEARCH_PARAM) || '');
  const [debouncedSearch] = useDebounce(search, 500);

  const fetchPosts = async (term: string, signal?: AbortSignal) => {
    if (!term.trim()) {
      setPosts([]);

      return;
    }

    setLoading(true);
    try {
      const response = await fetch(getUrl(term), { signal });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = (await response.json()) as TPost[];
      setPosts(data);
    } catch (error) {
      setApiError(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchPosts(debouncedSearch, signal);

    return () => {
      controller.abort();
    };
  }, [debouncedSearch]);

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
      {apiError && <div className="text-red-500">{apiError}</div>}
      <section className="space-y-4">
        {loading ? <div>Loading...</div> : posts.length > 0 && <PostList posts={posts} />}
      </section>
    </>
  );
};
