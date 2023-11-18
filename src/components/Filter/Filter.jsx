import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Filter.module.css'

class Filter extends Component {
  render() {
    const { filter, addFilter } = this.props;
    return (
      <div className={css.filter}>
        <input
          type="text"
          name="filter"
          className={css.filterInput}
          value={filter}
          onChange={addFilter}
          placeholder="Enter name"
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  addFilter: PropTypes.func,
};

export default Filter