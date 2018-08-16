import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import Accordion from './Accordion';
import OrderHeader from './OrderHeader';
import LabOrderDetails from './LabOrderDetails';
import DrugOrderDetails from './DrugOrderDetails';
import fetchOrders from '../../actions/fetchOrders';

export class OrdersTable extends PureComponent {
  componentDidMount() {
    this.props.dispatch(fetchOrders(null, this.props.patient.uuid));
  }
  componentDidUpdate(prevProps) {
    if (this.props.patient.uuid !== prevProps.patient.uuid) {
      this.props.dispatch(fetchOrders(null, this.props.patient.uuid));
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.props.orders.results && this.props.orders.results.map((order => (
          <Accordion
            title={<OrderHeader status="Active" orderable={order.display} />}
            key={order.uuid}>
            {order.type === 'drugorder' ? (
              <DrugOrderDetails
                dosingInstructions={order.dosingInstructions}
                dispense={order.dispense}
                activeDates={format(order.dateActivated, 'MM/DD/YYYY')}
                orderer={order.orderer.display.split('-')[1]}
              />
            ) : (
              <LabOrderDetails urgency={order.urgency} orderer={order.orderer.display.split('-')[1]} />
            )}
          </Accordion>
        )))}
      </React.Fragment>
    );
  }
}

OrdersTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  orders: PropTypes.shape({
    results: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = ({
  fetchOrdersReducer: { orders },
  patientReducer: { patient },
}) => ({
  orders,
  patient,
});

export default connect(mapStateToProps)(OrdersTable);
