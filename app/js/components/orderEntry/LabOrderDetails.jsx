import React from 'react';
import PropTypes from 'prop-types';

const LabOrderDetails = ({ urgency, orderer, activeDates, fulfillerStatus }) => (
  <div className="order-details">
    <div className="details">
      <ul>
        <b>Urgency:</b> {urgency}
      </ul>
      <ul>
        <b>Active Dates:</b> {activeDates}
      </ul>
      { fulfillerStatus && (
        <ul>
          <b>Test Status:</b> {fulfillerStatus}
        </ul>
      )}
      Ordered by {orderer}
    </div>
  </div>
);

export default LabOrderDetails;

LabOrderDetails.defaultProps = {
  urgency: '',
  orderer: '',
  activeDates: '',
};

LabOrderDetails.propTypes = {
  urgency: PropTypes.string,
  orderer: PropTypes.string,
  activeDates: PropTypes.string,
};
