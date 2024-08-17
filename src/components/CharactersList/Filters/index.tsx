import React from 'react';
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';

type FilterType = {
  name: string;
  status: string;
  species: string;
  gender: string;
};

export type FilterPropsType = {
  onFilterChange: (e: URLSearchParams) => void;
  searchParams: URLSearchParams;
};

const Filters = ({
  onFilterChange,
  searchParams,
}: FilterPropsType): ReactElement => {
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: '',
  });

  // Sets the filters with the data that comes from the url
  useEffect(() => {
    const urlFilters: FilterType = filters;

    for (const [key, value] of searchParams.entries()) {
      urlFilters[key as keyof FilterType] = value;
    }

    setFilters(urlFilters);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onFilterChange(new URLSearchParams(filters));
  };

  const handleReset = () => {
    setFilters({
      name: '',
      status: '',
      species: '',
      gender: '',
    });

    onFilterChange(new URLSearchParams());
  };

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    filters[name as keyof FilterType] = value;

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== '')
    ) as FilterType;

    setFilters(cleanFilters);
  };

  return (
    <div className="mb-4 flex flex-col rounded bg-slate-50 p-5">
      <h2 className="mb-4 text-lg font-medium">Filter by...</h2>
      <form
        data-testid="search-form"
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 grid-rows-2 gap-5">
          <label htmlFor="name" className="flex flex-col">
            Name
            <input
              aria-label="Name"
              className="rounded border-2 border-gray-500 p-3 outline outline-1"
              defaultValue={filters.name}
              id="name"
              name="name"
              onChange={(e) => handleOnChange(e)}
              placeholder="Character name"
              type="search"
            />
          </label>
          <label htmlFor="species" className="flex flex-col">
            Species
            <input
              aria-label="Species"
              className="rounded border-2 border-gray-500 p-3 outline outline-1"
              defaultValue={filters.species}
              id="species"
              name="species"
              onChange={(e) => handleOnChange(e)}
              placeholder="Character species"
              type="search"
            />
          </label>
          <label htmlFor="status" className="flex flex-col">
            Status
            <select
              aria-label="Choose a status"
              className="rounded border-2 border-gray-500 p-3"
              id="status"
              name="status"
              onChange={(e) => handleOnChange(e)}
              value={filters.status}
            >
              <option value="">Choose a Status</option>
              <option value="dead">Dead</option>
              <option value="alive">Alive</option>
              <option value="unknown">Unknow</option>
            </select>
          </label>
          <label htmlFor="gender" className="flex flex-col">
            Gender
            <select
              aria-label="Choose a gender"
              className="rounded border-2 border-gray-500 p-3"
              id="gender"
              name="gender"
              onChange={(e) => handleOnChange(e)}
              value={filters.gender}
            >
              <option value="">Choose a gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknow</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="reset"
            className="border-1 mr-2 h-10 rounded border-blue-300 px-2 outline-1 hover:bg-blue-300 focus:outline disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!!Object.values(filters).every((filter) => filter === '')}
          >
            Clear Search
          </button>
          <button
            type="submit"
            className=" border-1 h-10 rounded border-blue-300 bg-blue-300 px-2 outline-1 hover:bg-blue-400 focus:outline"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
