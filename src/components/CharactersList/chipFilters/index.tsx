import { UrlFilterType } from '../../../types';

const ChipFilters = ({
  filters,
  onRemoveFilter,
}: {
  filters: UrlFilterType;
  onRemoveFilter: (filterKey: keyof UrlFilterType) => void;
}) => (
  <div className="mb-2 flex gap-2.5">
    {Object.keys(filters).map((filterKey) => {
      const filterValue = filters[filterKey as keyof typeof filters];

      // We don't want the pagination to appear as a chip
      if (filterKey == 'page') return null;

      return (
        filterValue && (
          <div
            key={filterKey}
            className="max-w-24 flex items-center justify-between rounded-full bg-violet-100 px-2 py-0.5"
          >
            <span className="capitalize">{filterValue}</span>
            <button
              className="ml-1 flex items-center"
              onClick={() => onRemoveFilter(filterKey as keyof typeof filters)}
            >
              <i className="fa-regular fa-circle-xmark"></i>
            </button>
          </div>
        )
      );
    })}
  </div>
);

export default ChipFilters;
