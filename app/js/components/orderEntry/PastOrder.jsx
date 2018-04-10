import React from 'react';
import { format } from 'date-fns';

export const PastOrder = (props) => {
  const {
    drug, auditInfo, dose, doseUnits, frequency,
    route, duration, durationUnits, dosingInstructions,
    quantityUnits, quantity,
  } = props;
  return (
    <tr>
      <td>
        {format(auditInfo.dateCreated, 'DD/MM/YYYY | HH:MM:SS')}
      </td>
      <td>Inactive</td>
      <td>
        {drug.display}:
        {dose ? ` ${dose}` : ""}
        {doseUnits.display ? ` ${doseUnits.display}` : ""}
        {frequency.display ? `, ${frequency.display}` : ""}
        {route.display ? `, ${route.display}` : ""}
        {duration ? `, for ${duration}` : ""}
        {durationUnits.display ? ` ${durationUnits.display} total` : ""}
        {dosingInstructions ? `, (${dosingInstructions})` : ""}
        {(dosingInstructions && quantityUnits.display) ? `, (Dispense: ${quantity} ${quantityUnits.display})` : ""}
      </td>
      <td>&nbsp;&nbsp;<span className="icon-ban-circle" /></td>
    </tr>
  );
};
export default PastOrder;
