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
          <td>

            {drug.display}:
            {` ${dose}`}
            {` ${doseUnits.display}`}
            {`, ${frequency.display}`}
            {`, ${route.display}`}
            {duration && `, for ${duration}`}
            {durationUnits && ` ${durationUnits.display} total`}
            {dosingInstructions && `, (${dosingInstructions})`}
            {(quantity && quantityUnits) && `, (Dispense: ${quantity} ${quantityUnits.display})`}

          </td>
        );
      } else {
        details = (
          <td>

            {drug.display}:
            {dosingInstructions && ` ${dosingInstructions}`}
            {(quantity && quantityUnits) && `, (Dispense: ${quantity} ${quantityUnits.display})`}

          </td>
        );
      }

      return (
        <tr key={uuid}>
          <td>
            {format(dateActivated, 'MM-DD-YYYY HH:mm')} {autoExpireDate && (`- ${format(autoExpireDate, 'MM-DD-YYYY HH:mm')}`)}
          </td>
          {details}
          <td className="text-center action-padding">
            <a href="#"> <i className="icon-edit" title="Edit" /> </a>
            <a href="#"> <i className="icon-remove" title="Delete" /> </a>
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
          <p>No Active Orders</p>
        </div>
      );
    }
    return (
      <div>
        <table className="table bordered mw-958-px">
          <thead>
            <tr>
              <th className="w-145-px">Date</th>
              <th>Details</th>
              <th className="w-81-px">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.showOrders(activeOrders)}
          </tbody>
        </table>
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
