import React from 'react';
import PropTypes from 'prop-types';

const ActiveOrders = ({ labOrderData, tests }) => (
  <div>
    <table className="table bordered mw-958-px">
      <thead>
        <tr>
          <th>Name</th>
          <th>tests</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        <tr key={labOrderData.uuid}>
          <td>{labOrderData.display}</td>
          <td>{tests.join(', ')}</td>
          <td>awaiting-results</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ActiveOrders;

ActiveOrders.defaultProps = {
  labOrderData: {
    uuid: '',
    display: '',
  },
  tests: [''],
};

ActiveOrders.propTypes = {
  labOrderData: PropTypes.shape({
    uuid: PropTypes.string,
    display: PropTypes.string,
  }),
  tests: PropTypes.arrayOf(PropTypes.string),
};
