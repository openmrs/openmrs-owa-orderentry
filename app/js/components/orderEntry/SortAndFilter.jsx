import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sortAndFilterAction from '../../actions/sortAndFilterAction';

export const SortAndFilter = props => (
  <div className="sort-filter-section">
    <div className="sort-type">
      <label className="label-sort">
        <FormattedMessage
          id="app.orders.type"
          defaultMessage="Order type"
          description="Order type" />:
      </label>
      <select
        className="sort-select"
        onChange={event => props.sortAndFilterAction('orderType', event.target.value)}>
        <FormattedMessage id="app.orders.all" defaultMessage="All" description="All">
          {m => <option value="all">{m}</option>}
        </FormattedMessage>
        <FormattedMessage id="app.orders.drug" defaultMessage="Drug Orders" description="Drug Orders">
          {m => <option value="2">{m}</option>}
        </FormattedMessage>
        <FormattedMessage id="app.orders.test" defaultMessage="Test Orders" description="Test Orders">
          {m => <option value="3">{m}</option>}
        </FormattedMessage>
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
