import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import OrdersTable from './OrdersTable';
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

export const AllOrders = ({
  orders: { totalCount, links }, dispatch, patient: { uuid }, backLink,
}) => (
  <div className="all-orders">
    { /*    <SortAndFilter /> */ }
    <br />
    <table className="t-orders">
      <tbody>
        <tr>
          <th>
            <FormattedMessage
              id="reactcomponents.date"
              defaultMessage="Date"
              description="Date" />
          </th>
          <th>
            <FormattedMessage
              id="app.orders.number"
              defaultMessage="Order number"
              description="Order number" />
          </th>
          <th id="details">
            <FormattedMessage
              id="app.orders.details"
              defaultMessage="Details"
              description="Details" />
          </th>
          <th>
            <FormattedMessage
              id="reactcomponents.status"
              defaultMessage="Status"
              description="Status" />
          </th>
          <th>
            <FormattedMessage
              id="app.orders.actions"
              defaultMessage="Actions"
              description="Actions" />
          </th>
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
    <button className="cancel" onClick={() => window.location.assign(backLink)}>Return</button>
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
  backLink: PropTypes.string.isRequired,
};
