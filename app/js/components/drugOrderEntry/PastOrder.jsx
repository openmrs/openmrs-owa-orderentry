import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

export const PastOrder = (props) => {
  const {
    drug, dosingType, dose, doseUnits, frequency,
    route, duration, durationUnits, dosingInstructions,
    quantityUnits, dateStopped, autoExpireDate, quantity, dateActivated, dateFormat,
  } = props;

  let details;
  if (dosingType === 'org.openmrs.SimpleDosingInstructions') {
    details = (
      <p>
        {drug.display}:
        {` ${dose}`}
        {` ${doseUnits.display},`}
        {` ${frequency.display},`}
        {` ${route.display}, for `}
        {duration && ` ${duration}`}
        {durationUnits && ` ${durationUnits.display}`}
        {dosingInstructions && ` (${dosingInstructions})`}
        {(dosingInstructions && quantityUnits) && ` (Dispense: ${quantity} ${quantityUnits.display})`}
      </p>
    );
  } else {
    details = (
      <p>
        {drug.display}:
        {dosingInstructions && ` ${dosingInstructions}`}
        {(dosingInstructions && quantityUnits) && ` (Dispense: ${quantity} ${quantityUnits.display})`}

      </p>
    );
  }
  return (
    <tr>
      <td>
        {format(dateActivated, dateFormat)}
        {(dateStopped || autoExpireDate) && `- ${format((dateStopped || autoExpireDate), dateFormat)}`}
      </td>
      <td>
        {details}
      </td>
    </tr>
  );
};

PastOrder.propTypes = {
  drug: PropTypes.shape({}).isRequired,
  dateFormat: PropTypes.string.isRequired,
  dosingType: PropTypes.string,
  dose: PropTypes.number,
  doseUnits: PropTypes.shape({}),
  frequency: PropTypes.shape({}),
  route: PropTypes.shape({}),
  duration: PropTypes.number,
  durationUnits: PropTypes.shape({}),
  dosingInstructions: PropTypes.string,
  quantityUnits: PropTypes.shape({}),
  autoExpireDate: PropTypes.string,
  dateActivated: PropTypes.string,
  dateStopped: PropTypes.string,
  quantity: PropTypes.number,
};

PastOrder.defaultProps = {
  dosingType: '',
  dose: 0,
  doseUnits: null,
  frequency: null,
  route: null,
  duration: 0,
  durationUnits: null,
  dosingInstructions: '',
  quantityUnits: null,
  autoExpireDate: '',
  dateActivated: '',
  dateStopped: '',
  quantity: null,
};

export default PastOrder;
