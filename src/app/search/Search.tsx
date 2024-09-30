import { FC } from 'react';
import { PostList } from '../components/PostList';
import { SearchForm } from './components/SearchForm';
import { useSearch } from './hooks/useSearch';

export const Search: FC = () => {
  const { search, handleChange, posts, loading, apiError } = useSearch();

  return (
    <>
      <title>{`Search ${search}`}</title>
      <SearchForm value={search} onChange={handleChange} apiError={apiError} />
      <PostList posts={posts} isLoading={loading} />
    </>
  );
};
