import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sortAndFilterAction from '../../actions/sortAndFilterAction';

export const SortAndFilter = props => (
  <div className="sort-filter-section">
    <div className="sort-type">
      <label className="label-sort">Type:</label>
      <select
        className="sort-select"
        onChange={event => props.sortAndFilterAction('type', event.target.value)}>
        Type:
        <option value="all">All</option>
        <option value="drugorder">Drug Orders</option>
        <option value="testorder">Test Orders</option>
        <option value="orderset">Order from Sets</option>
      </select>
    </div>
    {/* The .sort-status element and it's children is currently hidden from the view
  due to unfinalised decision of the status of lab orders */}
    <div className="sort-status">
      <label className="label-sort">Status:</label>
      <select className="sort-select">
        <option>All</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>
  </div>
);

export default connect(
  null,
  { sortAndFilterAction },
)(SortAndFilter);

SortAndFilter.propTypes = {
  sortAndFilterAction: PropTypes.func.isRequired,
};
