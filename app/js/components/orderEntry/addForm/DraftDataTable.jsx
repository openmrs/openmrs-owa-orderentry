import toastr from 'toastr';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEncounterRole } from '../../../actions/encounterRole';
import { postDrugOrder } from '../../../actions/addDrugOrder';
import activeOrderAction from '../../../actions/activeOrderAction';

export class DraftDataTable extends React.Component {
  state = {
    orders: [],
    limit: 10,
    startIndex: 0,
  }

  componentDidMount() {
    this.props.fetchEncounterRole(this.props.settingEncounterRole);
  }

  getUUID = (items, itemName) => items.find(item => item.display === itemName)

  addDrugOrder = (event) => {
    event.preventDefault();

    const {
      drugDispensingUnits,
      drugDosingUnits,
      drugRoutes,
      durationUnits,
      orderFrequencies,
    } = this.props.allConfigurations;

    const orders = this.props.draftOrders.map((order, index) => {
      const {
        action,
        reason,
        careSetting,
        dose,
        dosingUnit,
        drugInstructions,
        dosingType,
        drug,
        duration,
        durationUnit,
        frequency,
        orderer,
        dispensingQuantity,
        dispensingUnit,
        route,
        type,
      } = order;
      return {
        action,
        asNeeded: (reason && true) || false,
        asNeededCondition: reason,
        autoExpireDate: null,
        careSetting,
        commentToFulfiller: '',
        dose: dose || null,
        doseUnits: (
          dosingUnit && this.getUUID(drugDosingUnits, dosingUnit).uuid) || null,
        dosingInstructions: drugInstructions || null,
        dosingType,
        drug,
        duration: duration || null,
        durationUnits: (
          durationUnit && this.getUUID(durationUnits, durationUnit).uuid) || null,
        frequency: (
          frequency && this.getUUID(orderFrequencies, frequency).uuid) || null,
        numRefills: 0,
        orderer,
        previousOrder: null,
        quantity: dispensingQuantity || null,
        quantityUnits: (
          dispensingUnit && this.getUUID(drugDispensingUnits, dispensingUnit).uuid) || null,
        route: (
          route && this.getUUID(drugRoutes, route).uuid) || null,
        type,
      }
    })

    this.setState(
      {
        orders,
      },
      () => {
        const encounterPayload = {
          encounterProviders: [{
            encounterRole: this.props.encounterRole.uuid,
            provider: this.props.sessionReducer.currentProvider.uuid,
          }],
          encounterType: this.props.encounterType.uuid,
          location: this.props.sessionReducer.currentLocation,
          orders: this.state.orders,
          patient: this.props.patient.uuid,
        };
        this.props.postDrugOrder(
          encounterPayload,
          this.state.limit,
          this.state.startIndex,
          this.props.patient.uuid,
          this.props.careSetting.uuid,
        ).then(() => {
          if (this.props.addedOrder.data) {
            this.props.handleDiscardAllOrders();
          } else if (this.props.addOrderError) {
            toastr.error(this.props.addOrderError.data.error.message);
          }
        });
      },
    )
  }

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

    const { handleDiscardOneOrder, handleEditDraftOrder } = this.props;

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
          <a href="#" onClick={() => handleEditDraftOrder(order)}>
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
      <div className="draft-spacing">
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
          onClick={this.addDrugOrder}
          className="button confirm right"
          value="Sign and Save"
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  orderEntryConfigurations,
  drugSearchReducer,
  draftTableReducer: { draftOrders },
  sessionReducer,
  settingEncounterRoleReducer: { settingEncounterRole },
  patientReducer: { patient },
  encounterReducer: { encounterType },
  addDrugOrderReducer: { addedOrder, error },
  encounterRoleReducer: { encounterRole },
}) => ({
  drug: drugSearchReducer.selected,
  draftOrders,
  allConfigurations: ((orderEntryConfigurations || {}).configurations || {}),
  sessionReducer,
  settingEncounterRole,
  encounterRole: encounterRole[0],
  encounterType: encounterType[0],
  patient,
  addedOrder,
  addOrderError: error,
});

DraftDataTable.propTypes = {
  draftOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleDiscardAllOrders: PropTypes.func.isRequired,
  handleDiscardOneOrder: PropTypes.func.isRequired,
  handleEditDraftOrder: PropTypes.func,
  postDrugOrder: PropTypes.func.isRequired,
  fetchEncounterRole: PropTypes.func.isRequired,
  allConfigurations: PropTypes.shape({
    drugDispensingUnits: PropTypes.arrayOf(PropTypes.any),
    drugDosingUnits: PropTypes.arrayOf(PropTypes.any),
    drugRoutes: PropTypes.arrayOf(PropTypes.any),
    durationUnits: PropTypes.arrayOf(PropTypes.any),
    orderFrequencies: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  settingEncounterRole: PropTypes.string.isRequired,
  sessionReducer: PropTypes.shape({
    currentProvider: PropTypes.shape({
      uuid: PropTypes.string,
    }),
    currentLocation: PropTypes.shape({}),
  }).isRequired,
  encounterType: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  encounterRole: PropTypes.shape({
    uuid: PropTypes.string,
  }),
  patient: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  careSetting: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  addedOrder: PropTypes.shape({
    data: PropTypes.shape({}),
  }).isRequired,
  addOrderError: PropTypes.shape({
    data: PropTypes.shape({
      error: PropTypes.shape({
        message: PropTypes.string,
      }),
    }),
  }),
};

DraftDataTable.defaultProps = {
  handleEditDraftOrder: () => {},
  addOrderError: {},
  encounterRole: {},
}

const actionCreators = {
  fetchEncounterRole,
  postDrugOrder,
};

export default connect(mapStateToProps, actionCreators)(DraftDataTable);
