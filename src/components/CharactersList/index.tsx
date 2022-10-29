import React from "react";
import { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "./Card";
import Pagination from "./Pagination";
import Filters from "./Filters";
import useFetchCharacterList from "../../hooks/useFetchCharacterList";
import { CharacterType } from "../../types/character";

const CharactersList = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useFetchCharacterList(searchParams);

  return (
    <>
      <Filters onFilterChange={setSearchParams} searchParams={searchParams} />
      {isLoading && <span>Loading...</span>}
      {!isLoading && !!data && data.error && (
        <div
          className="mt-8 flex w-80 justify-center self-center rounded-xl border border-red-100	p-6 shadow-xl shadow-red-100	"
          data-testid="error-message"
        >
          {data.error} 🥲
          <br />
          Please try another search
        </div>
      )}
      {!isLoading && !!data && data.results && (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.results.map((character: CharacterType) => (
              <Card {...character} key={character.id} />
            ))}
          </ul>
          <Pagination
            totalPages={data.info.pages}
            onPageChange={setSearchParams}
            searchParams={searchParams}
          />
        </>
      )}
    </>
  );
};

export default CharactersList;
