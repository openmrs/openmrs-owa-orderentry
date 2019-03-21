import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrdersTable from './OrdersTable';
import SortAndFilter from './SortAndFilter';
import Paginate from './Paginate';
import fetchOrders from '../../actions/fetchOrders';

const getPreviousOrNextPageUrl = (links, action) => {
  let url = '';
  if (!links) {
    return url;
  }
  links.forEach((link) => {
    if (link.rel === action) {
      url = link.uri;
    }
  });
  return url;
};

export const AllOrders = ({ orders: { totalCount, links }, dispatch, patient: { uuid } }) => (
  <div className="all-orders">
    <div className="orders-breadcrumb">
      <h3>Patient Orders</h3>
    </div>
    <SortAndFilter />
    <br />
    <table className="t-orders">
      <tbody>
        <tr>
          <th>Date</th>
          <th>Details</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        <OrdersTable />
      </tbody>
    </table>
    <br />
    <br />

    <Paginate
      totalPage={totalCount}
      nextPageUrl={getPreviousOrNextPageUrl(links, 'next')}
      prevPageUrl={getPreviousOrNextPageUrl(links, 'prev')}
      dispatch={dispatch}
      fetchNew={fetchOrders}
      patientId={uuid}
    />
  </div>
);

const mapStateToProps = ({ fetchOrdersReducer: { orders }, patientReducer: { patient } }) => ({
  orders,
  patient,
});

export default connect(mapStateToProps)(AllOrders);

AllOrders.defaultProps = {
  patient: {
    uuid: '',
  },
};

AllOrders.propTypes = {
  orders: PropTypes.shape({
    links: PropTypes.array,
    totalCount: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  patient: PropTypes.shape({ uuid: PropTypes.string }),
};
