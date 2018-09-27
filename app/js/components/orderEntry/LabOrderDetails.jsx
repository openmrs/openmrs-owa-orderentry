import React from 'react';
import PropTypes from 'prop-types';

const LabOrderDetails = ({ urgency, orderer, activeDates }) => (
  <div className="order-details">
    <div className="details">
      <ul>
        <b>Urgency:</b> {urgency}
      </ul>
      <br />
      <ul>
        <b>Active Dates:</b> {activeDates}
      </ul>
      <br />
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
