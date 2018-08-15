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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.patient.uuid !== prevProps.patient.uuid) {
      this.props.dispatch(fetchOrders(null, this.props.patient.uuid));
    }
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
              title={<OrderHeader status="Active" orderable={order.display} />}
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
}

OrdersTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  filteredOrders: PropTypes.shape({
    results: PropTypes.array,
  }).isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  dateFormat: PropTypes.string,
};

const mapStateToProps = ({
  fetchOrdersReducer: { filteredOrders, status },
  patientReducer: { patient },
  dateFormatReducer: { dateFormat },
}) => ({
  filteredOrders,
  patient,
  status,
  dateFormat,
});

export default connect(mapStateToProps)(OrdersTable);
