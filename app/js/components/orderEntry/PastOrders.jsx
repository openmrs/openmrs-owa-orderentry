import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPastOrders } from '../../actions/pastOrders';
import PastOrder from './PastOrder';
import imageLoder from '../../../img/loading.gif';

export class PastOrders extends React.Component {
  componentDidMount() {
    this.getAllPastOrders(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tabName !== this.props.tabName) {
      this.getAllPastOrders(nextProps);
    }
  }
  getAllPastOrders=(props) => {
    const query = new URLSearchParams(this.props.location.search);
    const patientUuid = query.get('patient');
    this.props.getPastOrders(patientUuid, props.careSetting.uuid);
  }
  render() {
    const { loading, pastOrders } = this.props.pastOrders;

    if (!pastOrders || loading) {
      return (
        <div
          style={{ textAlign: "center" }}>
          <img src={imageLoder} alt="loader" />
        </div>
      );
    }
    return (
      <div>
        {pastOrders.length > 0 ?
          <table className="table bordered">
            <tbody>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
              {pastOrders.map(pastOrder =>
                <PastOrder key={pastOrder.uuid} {...pastOrder} />)}
            </tbody>
          </table>
          : <p>No Past Orders</p>}
        <div />
      </div>
    );
  }
}
const mapStateToProps = ({ careSettingReducer, pastOrdersReducer }) => ({
  pastOrders: pastOrdersReducer,
});

const mapDispatchToProps = dispatch => ({
  getPastOrders: (uuid, careSetting) => dispatch(getPastOrders(uuid, careSetting)),
});

PastOrders.propTypes = {
  getPastOrders: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PastOrders);
