import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { FilterPropsType, FilterType } from '../../../types';

const defaultFilters = {
  name: '',
  status: '',
  species: '',
  gender: '',
};

const SidebarFilters = ({
  onFilterChange,
  searchParams,
}: FilterPropsType): ReactElement => {
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    const urlFilters: FilterType = { ...defaultFilters };
    if (searchParams.size === 0) {
      // Reset to defaultFilters when searchParams is empty
      setFilters(urlFilters);
    } else {
      // Update urlFilters based on searchParams
      for (const [key, value] of searchParams.entries()) {
        if (key !== 'page') urlFilters[key as keyof FilterType] = value;
      }
      setFilters(urlFilters);
    }
  }, [searchParams]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== '')
    ) as FilterType;

    onFilterChange(new URLSearchParams(cleanFilters));
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
    setFilters({
      ...filters,
      [event.target.name]: event.target.value || '',
    });
  };

  return (
    <div className="mb-4 mr-10 flex flex-col rounded bg-slate-50 p-5">
      <h2 className="mb-4 text-lg font-medium">Filter by:</h2>
      <hr />
      <form
        data-testid="search-form"
        onReset={handleReset}
        onSubmit={handleSubmit}
        className="mt-4"
      >
        <div className="grid gap-5">
          <label
            htmlFor="name"
            className="flex flex-col text-sm text-slate-600"
          >
            Name
            <input
              aria-label="Name"
              className="rounded border border-gray-500 p-2.5 focus:outline focus:outline-2"
              value={filters.name}
              id="name"
              name="name"
              onChange={(e) => handleOnChange(e)}
              placeholder="Character name"
              type="search"
            />
          </label>
          <label
            htmlFor="species"
            className="flex flex-col text-sm text-slate-600"
          >
            Species
            <input
              aria-label="Species"
              className="rounded border border-gray-500 p-2.5 focus:outline focus:outline-2"
              value={filters.species}
              id="species"
              name="species"
              onChange={(e) => handleOnChange(e)}
              placeholder="Character species"
              type="search"
            />
          </label>
          <label
            htmlFor="status"
            className="flex flex-col text-sm text-slate-600"
          >
            Status
            <select
              aria-label="Choose a status"
              className="rounded border border-gray-500 p-3"
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
          <label
            htmlFor="gender"
            className="flex flex-col text-sm text-slate-600"
          >
            Gender
            <select
              aria-label="Choose a gender"
              className="rounded border border-gray-500 p-3"
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
            className="border-1 mr-2 h-10 rounded border-violet-300 px-2 outline-1 hover:bg-violet-300 focus:outline disabled:cursor-not-allowed disabled:opacity-50"
            disabled={Object.values(filters).every((filter) => filter === '')}
          >
            Clear
          </button>
          <button
            type="submit"
            className=" border-1 h-10 rounded border-violet-200 bg-violet-200 px-2 outline-1 hover:bg-violet-400 focus:outline"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SidebarFilters;
