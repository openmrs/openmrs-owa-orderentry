import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from "react-intl";

const DrugOrderDetails = ({
  dosingInstructions, dispense, activeDates, orderer,
}) => (
  <div className="order-details">
    <div className="details">
      <ul>
        <b>
          <FormattedMessage
            id="app.orders.dosingInstructions"
            defaultMessage="Dosing Instructions" />:
        </b> {dosingInstructions}
      </ul>
      <ul>
        <b>
          <FormattedMessage
            id="app.orders.dispense"
            defaultMessage="Dispense" />:
        </b> {dispense}
      </ul>
      <ul>
        <b>
          <FormattedMessage
            id="app.orders.activeDates"
            defaultMessage="Active Dates" />:
        </b> {activeDates}
      </ul>
      <p><FormattedMessage
        id="app.orders.orderedBy"
        defaultMessage="Ordered by" /> {orderer}
      </p>
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
