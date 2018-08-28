import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import Accordion from './Accordion';
import OrderHeader from './OrderHeader';
import LabOrderDetails from './LabOrderDetails';
import DrugOrderDetails from './DrugOrderDetails';
import fetchOrders from '../../actions/fetchOrders';
import { DRUG_ORDER } from './orderTypes';
import { setSelectedOrder } from '../../actions/orderAction';
import createLabOrder from '../../actions/createLabOrder';
import { successToast, errorToast } from '../../utils/toast';
import toggleUrgency from '../../actions/labOrders/toggleUrgency';

export class OrdersTable extends PureComponent {
  state = {
    recentUrgency: '',
    previousOrderId: '',
  };

  componentDidMount() {
    this.props.dispatch(fetchOrders(null, this.props.patient.uuid));
  }

  componentDidUpdate(prevProps) {
    const { previousOrderId, recentUrgency } = this.state;
    const {
      status: { added, error },
      errorMessage,
      labOrderData,
    } = this.props.createLabOrderReducer;
    if (this.props.patient.uuid !== prevProps.patient.uuid) {
      this.props.dispatch(fetchOrders(null, this.props.patient.uuid));
    }
    if (added && labOrderData !== prevProps.createLabOrderReducer.labOrderData) {
      this.props.dispatch(toggleUrgency(
        previousOrderId,
        labOrderData.orders[0].uuid,
        recentUrgency,
      ));
      successToast('urgency successfully changed');
    }
    if (error) {
      errorToast(errorMessage);
    }
  }

  handleActiveOrderEdit = (order) => {
    this.props.dispatch(setSelectedOrder({
      order: { ...order, status: 'EDIT' },
      currentOrderType: DRUG_ORDER,
      activity: 'EDIT',
    }));
  };

  toggleUrgency = (order) => {
    const urgencyToggler = { ROUTINE: 'STAT', STAT: 'ROUTINE' };
    const {
      concept, careSetting, encounter, orderer, patient, type, urgency, uuid,
    } = order;
    const editableLabOrder = [
      {
        concept: concept.uuid,
        careSetting: careSetting.uuid,
        encounter: encounter.uuid,
        orderer: orderer.uuid,
        patient: patient.uuid,
        urgency: urgencyToggler[urgency],
        action: 'REVISE',
        previousOrder: uuid,
        type,
      },
    ];
    this.setState({
      recentUrgency: urgencyToggler[urgency],
      previousOrderId: uuid,
    });
    const encounterPayload = {
      encounterProviders: [
        {
          encounterRole: this.props.encounterRole.uuid,
          provider: this.props.session.currentProvider.uuid,
        },
      ],
      encounterType: this.props.encounterType.uuid,
      orders: editableLabOrder,
      patient: order.patient.uuid,
    };
    this.props.dispatch(createLabOrder(encounterPayload));
  };

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
                  order={order}
                  toggleUrgency={this.toggleUrgency}
                  handleEdit={this.handleActiveOrderEdit}
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
  createLabOrderReducer: {
    status: {},
    errorMessage: '',
  },
  encounterRole: {
    uuid: '',
  },
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
  createLabOrderReducer: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    errorMessage: PropTypes.string,
    labOrderData: PropTypes.object,
  }),
  session: PropTypes.shape({
    currentProvider: PropTypes.shape({
      person: PropTypes.shape({
        uuid: PropTypes.string,
      }),
      uuid: PropTypes.string,
    }),
    currentLocation: PropTypes.object,
  }),
  encounterType: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  encounterRole: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

const mapStateToProps = ({
  fetchOrdersReducer: { filteredOrders, status },
  patientReducer: { patient },
  dateFormatReducer: { dateFormat },
  encounterRoleReducer: { encounterRole },
  encounterReducer: { encounterType },
  createLabOrderReducer,
  openmrs: { session },
}) => ({
  filteredOrders,
  patient,
  status,
  dateFormat,
  createLabOrderReducer,
  encounterRole,
  encounterType,
  session,
});

export default connect(mapStateToProps)(OrdersTable);
