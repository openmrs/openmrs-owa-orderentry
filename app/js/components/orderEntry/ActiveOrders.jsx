import React from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import activeOrderAction from '../../actions/activeOrderAction';
import { addDraftOrder } from '../../actions/draftTableAction';
import imageLoader from '../../../img/loading.gif';

export class ActiveOrders extends React.Component {
  state = {
    draftOrder: {},
  };

  componentDidMount() {
    this.fetchActiveOrders(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tabName !== this.props.tabName) {
      this.fetchActiveOrders(nextProps);
    }
  }

  onClickDiscontinue = (order) => {
    const {
      uuid,
      drug,
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

    this.setState({
      draftOrder: {
        uuid,
        drugName: drug.display,
        action: 'DISCONTINUE',
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
      },
    }, () => {
      this.props.onDelete(true);
      this.props.addDraftOrder(this.state.draftOrder);
    });
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
        action,
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

      let showStatus;

      if (this.props.editOrderNumber === order.orderNumber) {
        showStatus = (
          <p> will REVISE </p>
        );
      } else if (this.props.isDelete) {
        showStatus = (
          <p> Will DISCONTINUE </p>
        );
      } else {
        showStatus = (
          <div>
            <a
              href="#"
              onClick={() => this.props.handleEditActiveDrugOrder(order)}
            > <i className="icon-edit" title="Edit" />
            </a>
            <a > <i
              className="icon-remove icon-color"
              title="Delete"
              id="delete"
              role="button"
              tabIndex="0"
              onKeyPress={this.handleKeyPress}
              onClick={() => this.onClickDiscontinue(order)} />
            </a>
          </div>
        );
      }

      return (
        <tr key={uuid} >
          <td>
            {format(dateActivated, 'MM-DD-YYYY HH:mm')} {autoExpireDate && (`- ${format(autoExpireDate, 'MM-DD-YYYY HH:mm')}`)}
          </td>
          {details}
          <td className="text-center action-padding" >
            {showStatus}
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
  handleEditActiveDrugOrder: PropTypes.func.isRequired,
  editOrderNumber: PropTypes.string,
  activeOrderAction: PropTypes.func.isRequired,
  addDraftOrder: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isDelete: PropTypes.bool.isRequired,
  drugOrder: PropTypes.shape({
    loading: PropTypes.bool,
  }).isRequired,
  careSetting: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

ActiveOrders.defaultProps = {
  editOrderNumber: "",
};

const mapStateToProps = ({ activeOrderReducer }) => ({
  drugOrder: activeOrderReducer,
});

const mapDispatchToProps = dispatch => ({
  activeOrderAction: (careSetting, patientUuid) =>
    dispatch(activeOrderAction(careSetting, patientUuid)),
  addDraftOrder: order =>
    dispatch(addDraftOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrders);
