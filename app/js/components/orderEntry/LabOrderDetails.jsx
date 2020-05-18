import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from "react-intl";

const LabOrderDetails = ({
  urgency, orderer, activeDates, fulfillerStatus,
}) => (
  <div className="order-details">
    <div className="details">
      <ul>
        <b>
          <FormattedMessage
            id="app.orders.urgency"
            defaultMessage="Urgency" />:
        </b> {urgency}
      </ul>
      <ul>
        <b>
          <FormattedMessage
            id="app.orders.activeDates"
            defaultMessage="Active Dates" />:
        </b> {activeDates}
      </ul>
      { fulfillerStatus && (
        <ul>
          <b>
            <FormattedMessage
              id="app.orders.testStatus"
              defaultMessage="Test Status" />:
          </b>&nbsp;
          <FormattedMessage
            id={`app.orders.testStatus.${fulfillerStatus}`}
            defaultMessage={fulfillerStatus}
          />
        </ul>
      )}
      <FormattedMessage
        id="app.orders.orderedBy"
        defaultMessage="Ordered by" /> {orderer}
    </div>
  </div>
);

export default LabOrderDetails;

LabOrderDetails.defaultProps = {
  urgency: '',
  orderer: '',
  activeDates: '',
  fulfillerStatus: '',
};

LabOrderDetails.propTypes = {
  urgency: PropTypes.string,
  orderer: PropTypes.string,
  activeDates: PropTypes.string,
  fulfillerStatus: PropTypes.string,
};
