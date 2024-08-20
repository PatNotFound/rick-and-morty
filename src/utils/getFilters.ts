import { UrlFilterType } from '../types';

const getFilters = (searchParams: URLSearchParams) => {
  const filters: UrlFilterType = {
    name: '',
    status: '',
    species: '',
    gender: '',
  };

  for (const [key, value] of searchParams.entries()) {
    filters[key as keyof UrlFilterType] = value;
  }

  return filters;
};

export default getFilters;
