import React from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import activeOrderAction from '../../actions/activeOrderAction';
import imageLoader from '../../../img/loading.gif';

export class ActiveOrders extends React.Component {
  componentDidMount() {
    this.fetchActiveOrders(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tabName !== this.props.tabName) {
      this.fetchActiveOrders(nextProps);
    }
  }

  fetchActiveOrders(props) {
    const { location, careSetting } = this.props;

    const query = new URLSearchParams(location.search);
    const patientUuid = query.get('patient');
    const caresettingUuid = careSetting.uuid;

    this.props.activeOrderAction(props.careSetting.uuid, patientUuid);
  }

  showOrders = activeOrders => activeOrders
    .map((order) => {
      const {
        uuid,
        dateActivated,
        autoExpireDate,
        drug,
        dose,
        doseUnits,
        frequency,
        route,
        duration,
        durationUnits,
        dosingInstructions,
        quantity,
        quantityUnits,
        dosingType,
      } = order;

      let details;

      if (dosingType === 'org.openmrs.SimpleDosingInstructions') {
        details = (
          <td className="fs-14-px">

            {drug.display}:
            {dose && ` ${dose}`}
            {doseUnits.display && ` ${doseUnits.display}`}
            {frequency.display && `, ${frequency.display}`}
            {route.display && `, ${route.display}`}
            {duration && `, for ${duration}`}
            {durationUnits.display && ` ${durationUnits.display} total`}
            {dosingInstructions && `, (${dosingInstructions})`}
            {(quantity && quantityUnits.display) && `, (Dispense: ${quantity} ${quantityUnits.display})`}

          </td>
        );
      } else {
        details = (
          <td className="fs-14-px">

            {drug.display}:
            {dosingInstructions && ` (${dosingInstructions})`}
            {(quantity && quantityUnits.display) && `, (Dispense: ${quantity} ${quantityUnits.display})`}

          </td>
        );
      }

      return (
        <tr key={uuid}>
          <td className="text-center fs-14-px">
            {format(dateActivated, 'MM/DD/YYYY')} {autoExpireDate && (`- ${format(autoExpireDate, 'MM/DD/YYYY HH:mm')}`)}
          </td>
          <td className="text-center fs-14-px">
            Active
          </td>

          {details}

          <td className="text-center">
            <a href="#"> <i className="icon-edit" /> </a>
            <a href="#"> <i className="icon-remove" /> </a>
          </td>
        </tr>
      );
    })


  render() {
    const { activeOrders, loading } = this.props.drugOrder;

    if (!activeOrders || loading) {
      return (
        <div className="text-align-center">
          <img src={imageLoader} alt="loader" />
        </div>
      );
    } else if (activeOrders.length === 0) {
      return (
        <div>
          <h4> Active Orders </h4>
          <p>No Active Orders</p>
        </div>
      );
    }
    return (
      <div>
        <br /> <br />
        <div>
          <h4> Active Orders </h4>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center w-18-percent">Date</th>
                  <th className="text-center w-10-percent">Status</th>
                  <th className="text-center w-44-percent">Details</th>
                  <th className="text-center w-10-percent">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.showOrders(activeOrders)}
              </tbody>
            </table>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

ActiveOrders.propTypes = {
  activeOrderAction: PropTypes.func.isRequired,
  drugOrder: PropTypes.shape({
    loading: PropTypes.bool,
  }).isRequired,
  careSetting: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ activeOrderReducer }) => ({
  drugOrder: activeOrderReducer,
});

const mapDispatchToProps = dispatch => ({
  activeOrderAction: (careSetting, patientUuid) =>
    dispatch(activeOrderAction(careSetting, patientUuid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrders);
