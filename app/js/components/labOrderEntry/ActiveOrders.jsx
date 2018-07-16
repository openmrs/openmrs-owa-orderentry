import React from 'react';
import PropTypes from 'prop-types';

const ActiveOrders = ({ orders }) => (
  <div>
    <table className="table bordered mw-958-px">
      <thead>
        <tr>
          <th className="w-155-px">Date</th>
          <th>Details</th>
          <th className="w-81-px">Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.date}</td>
            <td>{order.details}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ActiveOrders;

ActiveOrders.defaultProps = {
  orders: [
    {
      date: '5-May-2018',
      type: 'Hemoglobin Test',
      status: 'awaiting-results',
      id: 1,
    },
  ],
};

ActiveOrders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.string,
    id: PropTypes.number,
  })),
};
