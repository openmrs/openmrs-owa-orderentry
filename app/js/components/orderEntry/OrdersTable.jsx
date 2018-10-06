import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import format from 'date-fns/format';
import Accordion from './Accordion';
import OrderHeader from './OrderHeader';
import LabOrderDetails from './LabOrderDetails';
import DrugOrderDetails from './DrugOrderDetails';
import fetchOrders from '../../actions/fetchOrders';
import { DRUG_ORDER } from './orderTypes';
import { setSelectedOrder, setOrderAction } from '../../actions/orderAction';
import createOrder from '../../actions/createOrder';


export class OrdersTable extends PureComponent {
  state = {
    limit: 10,
    startIndex: 0,
    discontinueReason: '',
  };
  componentDidMount() {
    this.props.dispatch(fetchOrders(null, this.props.patient.uuid));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.patient.uuid !== prevProps.patient.uuid) {
      this.props.dispatch(fetchOrders(null, this.props.patient.uuid));
    }
  }

  getUUID = (items, itemName) => items.find(item => item.display === itemName)

  setDiscontinuedOrder = async (order) => {
    const {
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
      previousOrder,
      orderNumber,
    } = order;

    const discontinueDecision = await swal("Are you sure you want to discontinue this order ?", {
      buttons: {
        YES: "YES",
        NO: 'NO',
      },
    });
    if (discontinueDecision === "YES") {
      const reason = await swal({
        text: 'Reason for discontinuing',
        content: "input",
        button: {
          text: "DISCONTINUE!",
          closeModal: true,
        },
      });
      const discontinuedOrder = order.type === 'drugorder'
        ? this.formatDrugOrderData(order, reason)
        : this.formatLabOrderData(order);
      this.discontinueOrder(discontinuedOrder, orderNumber);
    }
  }

  formatDrugOrderData = (order, reason) => {
    const {
      drugDispensingUnits,
      drugDosingUnits,
      drugRoutes,
      durationUnits,
      orderFrequencies,
    } = this.props.allConfigurations;
    const {
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
      previousOrder,
      orderNumber,
    } = order;
    return {
      action: 'DISCONTINUE',
      asNeeded: (reason && true) || false,
      asNeededCondition: reason,
      autoExpireDate: null,
      orderReasonNonCoded: this.state.discontinueReason || null,
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
      previousOrder,
      quantity: dispensingQuantity || null,
      quantityUnits: (
        dispensingUnit && this.getUUID(drugDispensingUnits, dispensingUnit).uuid) || null,
      route: (
        route && this.getUUID(drugRoutes, route).uuid) || null,
      type,
    };
  };

  formatLabOrderData = order => ({
    action: 'DISCONTINUE',
    concept: order.concept,
    careSetting: order.careSetting,
    encounter: this.props.encounterType.uuid,
    orderer: this.props.session.currentProvider.uuid,
    patient: this.props.patient.uuid,
    type: 'testorder',
    urgency: order.urgency || 'ROUTINE',
    previousOrder: order.uuid,
  });

  handleActiveOrderEdit = (order) => {
    this.props.dispatch(setSelectedOrder({ order: { ...order, status: 'EDIT' }, currentOrderType: DRUG_ORDER, activity: 'EDIT' }));
  }

  discontinueOrder = async (order, orderNumber) => {
    const encounterPayload = {
      encounterProviders: [{
        encounterRole: this.props.encounterRole.uuid,
        provider: this.props.sessionReducer.currentProvider.uuid,
      }],
      encounterType: this.props.encounterType.uuid,
      location: this.props.sessionReducer.sessionLocation,
      orders: [order],
      patient: this.props.patient.uuid,
    };

    const meta = {
      activity: order.action,
      orderNumber,
    };
    await this.props.dispatch(createOrder(
      encounterPayload,
      this.state.limit,
      this.state.startIndex,
      meta,
    )).then(() => this.props.dispatch(fetchOrders(null, this.props.patient.uuid)));
  }

  renderNoFilterResults = () => {
    const {
      filteredOrders,
      status: { fetched },
    } = this.props;
    if (fetched && filteredOrders.length === 0) {
      return (
        <tr>
          <td className="th-invisible" />
          <td className="no-results th-invisible">
            <h4 className="no-result-info">No Orders</h4>
          </td>
          <td className="th-invisible" />
          <td className="th-invisible" />
        </tr>
      );
    }
    return null;
  };

  render() {
    const { filteredOrders, dateFormat } = this.props;
    return (
      <React.Fragment>
        {filteredOrders &&
          filteredOrders.length !== 0 &&
          filteredOrders.map(order => (
            <Accordion
              title={
                <OrderHeader
                  status="Active"
                  orderable={order.drug ? order.drug.display : order.display}
                  order={order}
                  handleEdit={this.handleActiveOrderEdit}
                  handleDiscontinue={this.setDiscontinuedOrder}
                />
              }
              key={order.uuid}
              dateFormat={dateFormat}
              date={order.dateActivated}>
              {order.type === 'drugorder' ? (
                <DrugOrderDetails
                  dosingInstructions={order.dosingInstructions}
                  dispense={order.dispense}
                  activeDates={format(order.dateActivated, dateFormat)}
                  orderer={order.orderer.display.split('-')[1]}
                />
              ) : (
                <LabOrderDetails
                  urgency={order.urgency}
                  orderer={order.orderer.display.split('-')[1]}
                  activeDates={format(order.dateActivated, dateFormat)}
                />
              )}
            </Accordion>
          ))}
        {this.renderNoFilterResults()}
      </React.Fragment>
    );
  }
}

OrdersTable.defaultProps = {
  dateFormat: '',
  filteredOrders: [],
  session: {
    currentProvider: {
      person: {
        uuid: '',
      },
    },
  },
};

OrdersTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  filteredOrders: PropTypes.array,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  dateFormat: PropTypes.string,
  allConfigurations: PropTypes.shape({
    drugDispensingUnits: PropTypes.arrayOf(PropTypes.any),
    drugDosingUnits: PropTypes.arrayOf(PropTypes.any),
    drugRoutes: PropTypes.arrayOf(PropTypes.any),
    durationUnits: PropTypes.arrayOf(PropTypes.any),
    orderFrequencies: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  sessionReducer: PropTypes.shape({
    currentProvider: PropTypes.shape({
      uuid: PropTypes.string,
    }),
    sessionLocation: PropTypes.shape({}),
  }).isRequired,
  encounterType: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  encounterRole: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  session: PropTypes.shape({
    currentProvider: PropTypes.shape({
      person: PropTypes.shape({
        uuid: PropTypes.string,
      }),
      uuid: PropTypes.string,
    }),
    currentLocation: PropTypes.object,
  }),
};

const mapStateToProps = ({
  fetchOrdersReducer: { filteredOrders, status },
  patientReducer: { patient },
  openmrs: { session },
  encounterReducer: { encounterType },
  encounterRoleReducer: { encounterRole },
  dateFormatReducer: { dateFormat },
  orderEntryConfigurations,
  careSettingReducer:
  { outpatientCareSetting, inpatientCareSetting },
}) => ({
  filteredOrders,
  patient,
  status,
  dateFormat,
  careSetting: outpatientCareSetting,
  outpatientCareSetting,
  inpatientCareSetting,
  sessionReducer: session,
  encounterRole,
  encounterType,
  allConfigurations: ((orderEntryConfigurations || {}).configurations || {}),
  session,
});

export default connect(mapStateToProps)(OrdersTable);
