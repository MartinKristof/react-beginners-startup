import { ChangeEvent, FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormGroup } from '../../components/FormGroup';
import { Input } from '../../components/Input';
import { SEARCH_PARAM } from '../constants';

interface ISearchFormProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  apiError?: string;
}

const SEARCH_ID = 'search';

export const SearchForm: FC<ISearchFormProps> = ({ value, onChange, apiError }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ [SEARCH_PARAM]: value });

    return () => {
      setSearchParams({});
    };
  }, [setSearchParams, value]);

  return (
    <div className="w-1/3">
      <div className="mt-2">
        <form>
          <FormGroup label="Search" id={SEARCH_ID} error={apiError}>
            <Input
              type="text"
              name={SEARCH_ID}
              id={SEARCH_ID}
              placeholder="Search..."
              onChange={onChange}
              value={value}
            />
          </FormGroup>
        </form>
      </div>
    </div>
  );
};
