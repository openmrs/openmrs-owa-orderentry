import React from 'react';
import PropTypes from 'prop-types';

const DraftDataTable = ({
  draftOrders,
  handleEditDrugOrder,
  handleDiscardOneOrder,
  handleCancel,
  handleSubmit,
}) => (
  <div>
    <h2>Unsaved Draft Orders ({draftOrders.length})</h2>
    <table className="table bordered mw-958-px">
      <thead>
        <tr>
          <th className="w-120-px">Status</th>
          <th>Details</th>
          <th className="w-81-px">Actions</th>
        </tr>
      </thead>
      <tbody>
        {draftOrders.map((order) => {
          const {
            drugName,
            action,
            dose,
            dosingUnit,
            frequency,
            route,
            duration,
            durationUnit,
            reason,
            note,
            dispensingQuantity,
            dispensingUnit,
            orderNumber,
          } = order;
          return (
            <tr key={orderNumber}>
              <td>{action}</td>
              <td>
                {drugName}:
                {dose && ` ${dose}` }
                {dosingUnit && ` ${dosingUnit},` }
                {frequency && ` ${frequency},` }
                {route && ` ${route}` }
                {duration && `, for ${duration} ${durationUnit} total` }
                {reason && `, (Reason: ${reason})` }
                {note && ` (${note})`}
                {dispensingQuantity && `, (Dispense: ${dispensingQuantity} ${dispensingUnit})`}
              </td>
              <td>
                <a href="#" onClick={() => handleEditDrugOrder(order, order.drug, order.dosingType)}>
                  <i className="icon-edit" title="Edit" />
                </a>
                <a href="#" onClick={() => handleDiscardOneOrder(order)}>
                  <i className="icon-remove" title="Delete" />
                </a>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <br />
    <input type="button" onClick={handleCancel} className="button cancel" value="Discard" />
    <input type="submit" onClick={handleSubmit} className="button confirm right" value="Sign and Save" />
  </div>
);

DraftDataTable.propTypes = {
  draftOrders: PropTypes.array.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleEditDrugOrder: PropTypes.func.isRequired,
  handleDiscardOneOrder: PropTypes.func.isRequired,
};

export default DraftDataTable;
