import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const PastOrders = ({
  orders,
}) => (
  <div>
    <table className="table bordered mw-958-px">
      <thead>
        <tr>
          <th className="w-155-px">Date</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.uuid}>
            <td>{moment(order.dateActivated).format('DD MMM YYYY')}</td>
            <td>{order.concept.display}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PastOrders;

PastOrders.defaultProps = {
  orders: [
    {
      date: '5-May-2018',
      type: 'Hemoglobin Test',
      status: 'awaiting-results',
      id: 1,
    },
  ],
};

PastOrders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.string,
    id: PropTypes.number,
  })),
};
