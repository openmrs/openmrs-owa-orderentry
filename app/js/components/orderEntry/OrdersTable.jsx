import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import swal from 'sweetalert';
import format from 'date-fns/format';
import Accordion from './Accordion';
import OrderHeader from './OrderHeader';
import LabOrderDetails from './LabOrderDetails';
import DrugOrderDetails from './DrugOrderDetails';
import fetchOrders from '../../actions/fetchOrders';
import { DRUG_ORDER } from './orderTypes';
import { setSelectedOrder } from '../../actions/orderAction';
import { discontinueOrder } from '../../actions/createOrder';
import { getConceptShortName } from '../../utils/helpers';

/* eslint-disable max-len */
export class OrdersTable extends PureComponent {
  state = {
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
    const { intl } = this.props;
    const {
      orderNumber,
    } = order;

    const discontinueQuestion = intl.formatMessage({ id: "app.orders.discontinue.question", defaultMessage: "Are you sure you want to discontinue this order ?" });
    const discontinueMsg = intl.formatMessage({ id: "app.orders.discontinue", defaultMessage: "DISCONTINUE" });
    const reasonToDiscontinue = intl.formatMessage({ id: "app.orders.discontinue.reason", defaultMessage: "Reason for discontinuing" });
    const yesMsg = intl.formatMessage({ id: "reactcomponents.yes", defaultMessage: "YES" });
    const noMsg = intl.formatMessage({ id: "reactcomponents.no", defaultMessage: "NO" });

    const discontinueDecision = await swal(discontinueQuestion, {
      buttons: {
        YES: yesMsg,
        NO: noMsg,
      },
    });
    if (discontinueDecision === "YES") {
      const reason = await swal({
        text: reasonToDiscontinue,
        content: "input",
        button: {
          text: discontinueMsg,
          closeModal: true,
        },
      });
      const discontinuedOrder = order.orderType.name.match(/drug/i)
        ? this.formatDrugOrderData(order, reason)
        : this.formatLabOrderData(order);
      this.discontinueOrder(discontinuedOrder, orderNumber);
    }
  };

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
    const payload = {
      encounterProviders: [{
        encounterRole: this.props.encounterRole.uuid,
        provider: this.props.sessionReducer.currentProvider.uuid,
      }],
      encounterType: this.props.encounterType.uuid,
      location: {
        uuid: this.props.sessionReducer.sessionLocation.uuid,
      },
      orders: [order],
      patient: this.props.patient.uuid,
    };
    await this.props.dispatch(discontinueOrder(payload, orderNumber));
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
    const {
      filteredOrders, dateFormat, sessionReducer, orderType,
    } = this.props;

    const ordersToDisplay = filteredOrders.filter((order) => {
      if (orderType) {
        if (orderType === 'drugorders') {
          return order.orderType.name.match(/drug/i);
        } else if (orderType === 'laborders') {
          return order.orderType.name.match(/test/i);
        }
      }
      return true;
    });

    return (
      <React.Fragment>
        {ordersToDisplay &&
          ordersToDisplay.map(order => (
            <Accordion
              title={
                <OrderHeader
                  status="Active"
                  orderable={order.drug ? order.drug.display : getConceptShortName(order.concept, sessionReducer.locale)}
                  order={order}
                  handleEdit={this.handleActiveOrderEdit}
                  handleDiscontinue={this.setDiscontinuedOrder}
                />
              }
              key={order.uuid}
              dateFormat={dateFormat}
              date={order.dateActivated}>
              {order.orderType.name.match(/drug/i) ? (
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
                  fulfillerStatus={order.fulfillerStatus}
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

const mapStateToProps = state => ({
  allConfigurations: ((state.orderEntryConfigurations || {}).configurations || {}),
  careSetting: state.careSettingReducer.outpatientCareSetting,
  dateFormat: state.dateFormatReducer.dateFormat,
  encounterRole: state.encounterRoleReducer.encounterRole,
  encounterType: state.encounterReducer.encounterType,
  filteredOrders: state.fetchOrdersReducer.filteredOrders,
  inpatientCareSetting: state.careSettingReducer.inpatientCareSetting,
  orderType: state.contextReducer.orderType,
  outpatientCareSetting: state.careSettingReducer.outpatientCareSetting,
  patient: state.patientReducer.patient,
  session: state.openmrs.session,
  sessionReducer: state.openmrs.session,
  status: state.fetchOrdersReducer.status,
});

export default connect(mapStateToProps)(injectIntl(OrdersTable));
