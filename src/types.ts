type UrlFilterType = {
  name: string;
  status: string;
  species: string;
  gender: string;
};

type CharacterType = {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: { name: string; url: string };
  name: string;
  origin: { name: string; url: string };
  species: string;
  status: string;
  type: string;
  url: string;
};

type ModalProps = {
  toggleVisibility: () => void;
  data: { label: string; value: string | number }[];
  title: string;
  image: string;
};

type FilterType = {
  name: string;
  status: string;
  species: string;
  gender: string;
};

type FilterPropsType = {
  onFilterChange: (e: URLSearchParams) => void;
  searchParams: URLSearchParams;
};

export type {
  UrlFilterType,
  CharacterType,
  ModalProps,
  FilterPropsType,
  FilterType,
};
