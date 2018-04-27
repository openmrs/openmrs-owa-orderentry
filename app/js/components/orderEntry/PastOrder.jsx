import React from 'react';
import { format } from 'date-fns';

export const PastOrder = (props) => {
  const {
    drug, dosingType, action, auditInfo, dose, doseUnits, frequency,
    route, duration, durationUnits, dosingInstructions,
    quantityUnits, autoExpireDate, quantity,
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
        {format(auditInfo.dateCreated, 'DD-MM-YYYY HH:MM')} {autoExpireDate && `- ${format(autoExpireDate, 'DD-MM-YYYY HH:MM')}`}
      </td>
      <td>
        {details}
      </td>
    </tr>
  );
};

export default PastOrder;
