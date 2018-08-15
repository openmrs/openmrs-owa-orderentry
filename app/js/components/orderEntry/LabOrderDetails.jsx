import React from 'react';
import PropTypes from 'prop-types';

const LabOrderDetails = ({ urgency, orderer }) => (
  <div className="order-details">
    <div className="details">
      <ul>
        <b>Urgency:</b> {urgency}
      </ul>
      <br />
      Ordered by: {orderer}
    </div>
  </div>
);

export default LabOrderDetails;

LabOrderDetails.defaultProps = {
  urgency: '',
  orderer: '',
};

LabOrderDetails.propTypes = {
  urgency: PropTypes.string,
  orderer: PropTypes.string,
};
