import React from 'react';
import { format } from 'date-fns';

export const PastOrder = (props) => {
  const {
    drug, dosingType, action, auditInfo, dose, doseUnits, frequency,
    route, duration, durationUnits, dosingInstructions,
    quantityUnits, autoExpireDate, quantity,
  } = props;

  const getStatus = () => {
    if (action === "NEW" && autoExpireDate !== null) {
      return 'Completed';
    } else if (autoExpireDate !== null && action === "REVISE") {
      return 'Revised';
    } else if (autoExpireDate === null) {
      return 'Discontinued';
    }
  };

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
        <small>{format(auditInfo.dateCreated, 'DD/MM/YYYY HH:MM')} &nbsp; {autoExpireDate && `-${format(autoExpireDate, 'DD/MM/YYYY HH:MM')}`}</small>
      </td>
      <td>{action ? `${getStatus()}` : ""}</td>
      <td>
        {details}
      </td>
      <td>&nbsp;&nbsp;<span className="icon-ban-circle" /></td>
    </tr>
  );
};

export default PastOrder;
