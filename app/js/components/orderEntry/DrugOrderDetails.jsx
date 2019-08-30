import React from 'react';
import PropTypes from 'prop-types';

const DrugOrderDetails = ({
  dosingInstructions, dispense, activeDates, orderer,
}) => (
  <div className="order-details">
    <div className="details">
      <ul>
        <b>Dosing Instructions:</b> {dosingInstructions}
      </ul>
      <ul>
        <b>Dispense:</b> {dispense}
      </ul>
      <ul>
        <b>Active Dates:</b> {activeDates}
      </ul>
      <p>Ordered by {orderer}</p>
    </div>
  </div>
);

export default DrugOrderDetails;

DrugOrderDetails.defaultProps = {
  activeDates: '',
  dispense: '',
  orderer: '',
  dosingInstructions: '',
};

DrugOrderDetails.propTypes = {
  activeDates: PropTypes.string,
  dispense: PropTypes.string,
  orderer: PropTypes.string,
  dosingInstructions: PropTypes.string,
};
