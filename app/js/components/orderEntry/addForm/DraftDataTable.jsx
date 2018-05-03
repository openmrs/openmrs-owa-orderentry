import React from 'react';
import PropTypes from 'prop-types';

class DraftDataTable extends React.Component {
  showOrders = draftOrders => draftOrders.map((order) => {
    const {
      drugName,
      uuid,
      action,
      dose,
      dosingUnit,
      frequency,
      route,
      duration,
      durationUnit,
      reason,
      drugInstructions,
      dispensingQuantity,
      dispensingUnit,
      orderNumber,
    } = order;

    const { handleDiscardOneOrder } = this.props;

    const details = (
      <p>
        {drugName}:
        {dose && ` ${dose}`}
        {dosingUnit && ` ${dosingUnit},`}
        {frequency && ` ${frequency},`}
        {route && ` ${route}`}
        {duration && `, for ${duration} ${durationUnit} total`}
        {reason && `, (Reason: ${reason})`}
        {drugInstructions && ` (${drugInstructions})`}
        {dispensingQuantity && ` (Dispense: ${dispensingQuantity} ${dispensingUnit})`}
      </p>
    );

    const discontinueForm = (
      <div>
        <p> Discontinue {drugName} </p>
        <p className="left label-margin">
          <label name="reason">For</label>
        </p>
        <p className="left">
          <input
            name="reason"
            placeholder="reason"
            id="discontinueReason"
            type="text"
            size="50" />
        </p>
      </div>
    );

    return (
      <tr key={orderNumber}>
        <td>{action}</td>
        <td >
          {action === "DISCONTINUE" ?
            discontinueForm :
            details
          }
        </td>
        <td>
          <a href="#" >
            <i className="icon-edit" title="Edit" />
          </a>
          <a href="#" onClick={() => handleDiscardOneOrder(order)}>
            <i className="icon-remove" title="Delete" />
          </a>
        </td>
      </tr>
    );
  })


  render() {
    const { draftOrders, handleDiscardAllOrders } = this.props;

    return (
      <div className="draft-spacing ">
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
            {this.showOrders(draftOrders)}
          </tbody>
        </table>
        <br />
        <input
          type="button"
          onClick={handleDiscardAllOrders}
          className="button cancel"
          value={draftOrders.length > 1 ? "Discard All" : "Discard"}
        />
        <input
          type="submit"

          className="button confirm right"
          value="Sign and Save"
        />
      </div>
    );
  }
}


DraftDataTable.propTypes = {
  draftOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleDiscardAllOrders: PropTypes.func.isRequired,
  handleDiscardOneOrder: PropTypes.func.isRequired,
};

export default DraftDataTable;
