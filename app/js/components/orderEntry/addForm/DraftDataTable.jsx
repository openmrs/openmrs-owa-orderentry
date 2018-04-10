import React from 'react';
import PropTypes from 'prop-types';

const DraftDataTable = ({
  drugName,
  fields,
  status,
  handleCancel,
  handleSubmit,
}) => {
  const {
    completeInstructions,
    dose,
    dosingUnit,
    frequency,
    route,
    duration,
    durationUnit,
    dispensingUnit,
    dispensingQuantity,
    reason,
    note,
  } = fields;
  return (
    <div>
      <h2>Unsaved Draft Data</h2>
      <table>
        <thead>
          <tr>
            <td><h3>Status</h3></td>
            <td><h3>Instructions</h3></td>
            <td><h3>Edit</h3></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{status}</td>
            <td>
              {drugName}:
              {dose && `${dose}` }
              {dosingUnit && `${dosingUnit},` }
              {frequency && `${frequency},` }
              {route && `${route},` }
              {duration && `for ${duration} ${durationUnit} total,` }
              {reason && `(Reason: ${reason}),` }
              {note && `(Other notes: ${note}),`}
              {dispensingUnit && `(Dispense: ${dispensingUnit} ${dispensingQuantity})`}
            </td>
            <td>
              <span className="icon-edit" />
              <span className="icon-remove" />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <input type="button" onClick={handleCancel} className="button cancel" value="Discard" />
      <input type="submit" onClick={handleSubmit} className="button confirm right" value="Confirm Save" />
    </div>
  );
};

DraftDataTable.propTypes = {
  drugName: PropTypes.string.isRequired,
  fields: PropTypes.shape({}).isRequired,
  status: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default DraftDataTable;
