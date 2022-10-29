import React from "react";
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";

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
    name: "",
    status: "",
    species: "",
    gender: "",
  });

  useEffect(() => {
    const urlFilters: FilterType = filters;
    for (const [key, value] of searchParams.entries()) {
      urlFilters[key as keyof FilterType] = value;
    }
    console.log(urlFilters);
    setFilters(urlFilters);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const t = new URLSearchParams(filters);

    onFilterChange(t);
  };

  const handleReset = () => {
    setFilters({
      name: "",
      status: "",
      species: "",
      gender: "",
    });

    onFilterChange(new URLSearchParams());
  };

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    filters[name as keyof FilterType] = value;

    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v != "")
    ) as FilterType;

    setFilters(cleanFilters);
  };

  return (
    <div className="mb-4 flex flex-col rounded border border-solid border-gray-200 p-5">
      <h2 className="mb-4 text-lg font-medium">Filter by...</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 lg:flex-row"
        data-testid="search-form"
        onReset={handleReset}
      >
        <input
          type="search"
          name="name"
          placeholder="Name"
          id="name"
          className="rounded border-2 border-gray-500 p-1 outline-1"
          aria-label="Name"
          onChange={(e) => handleOnChange(e)}
          defaultValue={filters.name}
        />
        <input
          type="search"
          name="species"
          placeholder="Species"
          id="species"
          className="rounded border-2 border-gray-500 p-1 outline-1"
          onChange={(e) => handleOnChange(e)}
          defaultValue={filters.species}
        />
        <select
          name="status"
          onChange={(e) => handleOnChange(e)}
          className="rounded border-2 border-gray-500 p-1 outline-1"
          value={filters.status}
          aria-label="Choose a Status"
        >
          <option value="">Choose a Status</option>
          <option value="dead">Dead</option>
          <option value="alive">Alive</option>
          <option value="unknown">Unknow</option>
        </select>
        <select
          name="gender"
          onChange={(e) => handleOnChange(e)}
          className="rounded border-2 border-gray-500 p-1 outline-1"
          value={filters.gender}
        >
          <option value="">Choose a gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknow</option>
        </select>
        <div className="ml-auto flex">
          <button
            type="reset"
            className="border-1 mr-2 h-10 rounded border-blue-300 px-2 outline-1 hover:bg-blue-300 focus:ring disabled:cursor-not-allowed disabled:opacity-50 "
            disabled={!!Object.values(filters).every((filter) => filter === "")}
          >
            Clear Search
          </button>
          <button
            type="submit"
            className=" border-1 h-10 rounded border-blue-300 bg-blue-300 px-2 outline-1 hover:bg-blue-400 focus:ring"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
