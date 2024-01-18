import css from './filter.module.css';

const Filter = ({ filterKey }) => {
  const filterValue = e => {
    const key = e.target.value.toLowerCase().trim();
    filterKey(key);
  };

  return (
    <input
      className={`form-control me-2 ${css.search}`}
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={filterValue}
    />
  );
};

export default Filter;
