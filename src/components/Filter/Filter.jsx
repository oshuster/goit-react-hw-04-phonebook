import { Component } from 'react';
import css from './filter.module.css';

class Filter extends Component {
  filterValue = e => {
    const key = e.target.value.toLowerCase().trim();
    this.props.filterKey(key);
  };

  render() {
    return (
      <input
        className={`form-control me-2 ${css.search}`}
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={this.filterValue}
      />
    );
  }
}

export default Filter;
