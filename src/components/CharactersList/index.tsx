import { ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

import Card from './card';
import Pagination from './pagination';
import useFetchCharacterList from '../../hooks/useFetchCharacterList';
import ErrorPage from './errorPage';
import SidebarFilters from './sidebarFilters';
import ChipFilters from './chipFilters';
import getFilters from '../../utils/getFilters';
import LoadingIcon from '../../images/loading.svg';
import { CharacterType } from '../../types';

const CharactersList = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useFetchCharacterList(searchParams);

  const currentFilters = getFilters(searchParams);

  const onRemoveFilter = (filter: string) => {
    searchParams.delete(filter);
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="flex">
        <SidebarFilters
          onFilterChange={setSearchParams}
          searchParams={searchParams}
        />
        {isLoading && (
          <div className="flex w-full justify-center">
            <img src={LoadingIcon} className="max-h-md max-w-md" />
          </div>
        )}
        {!isLoading && data.error && <ErrorPage error={data.error} />}
        {!isLoading && !!data && data.results && (
          <div>
            <ChipFilters
              filters={currentFilters}
              onRemoveFilter={onRemoveFilter}
            />

            <ul className="grid grid-cols-1 grid-rows-1 gap-4 rounded bg-slate-50 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {data?.results.map((character: CharacterType) => (
                <Card {...character} key={character.id} />
              ))}
            </ul>
            <Pagination
              totalPages={data.info.pages}
              onPageChange={setSearchParams}
              searchParams={searchParams}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CharactersList;
