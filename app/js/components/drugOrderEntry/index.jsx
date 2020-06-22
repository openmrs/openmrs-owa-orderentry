import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddForm from './addForm/AddForm';
import SearchDrug from '../searchDrug';
import { setOrderAction } from '../../actions/orderAction';
import { deleteDraftOrder } from '../../actions/draftTableAction';
import { selectDrugSuccess } from '../../actions/drug';
import './styles.scss';

export class SearchAndAddOrder extends React.PureComponent {
  state = {
    value: "",
    focused: false,
    editDrugUuid: '',
    editDrugName: '',
    editOrder: {},
    draftOrder: {},
  };

  componentDidMount() {
    const { selectedOrder, activity } = this.props;
    if (activity === 'EDIT' && !this.state.formattedDetails) {
      const details = (
        <td>
          {selectedOrder.drug.display}:
          {selectedOrder.dosingInstructions && ` ${selectedOrder.dosingInstructions}`}
          {(selectedOrder.quantity && selectedOrder.quantityUnits) && `, (Dispense: ${selectedOrder.quantity} ${selectedOrder.quantityUnits.display})`}
        </td>
      );
      this.handleEditActiveDrugOrder({ ...selectedOrder, status: activity }, details);
    } else if (activity === 'DRAFT_ORDER_EDIT' && selectedOrder) {
      this.setState({
        draftOrder: selectedOrder,
        editDrugUuid: selectedOrder.drug,
        editDrugName: selectedOrder.drugName,
        orderNumber: selectedOrder.orderNumber,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedOrder, activity } = this.props;
    if (activity === 'DRAFT_ORDER_EDIT' && selectedOrder &&
      ((!this.state.editDrugUuid && selectedOrder) ||
      (this.state.editDrugUuid &&
        (this.state.editDrugUuid !== selectedOrder.drug)
      ))
    ) {
      this.setState({
        draftOrder: selectedOrder,
        editDrugUuid: selectedOrder.drug,
        editDrugName: selectedOrder.drugName,
        orderNumber: selectedOrder.orderNumber,
      });
    }
    if (!selectedOrder && this.state.editDrugUuid) {
      this.setState({
        draftOrder: {},
        editDrugUuid: '',
        editDrugName: '',
        orderNumber: '',
      });
    }
  }

  onSelectDrug = (drugName) => {
    this.setState(() => ({
      value: drugName,
      focused: false,
    }));
  }

  onChange = (value) => {
    this.setState(() => ({
      value,
      focused: true,
    }));
  }

  handleDiscardOneOrder = (order) => {
    this.props.deleteDraftOrder(order);
    if (order.action === 'REVISE') {
      this.props.setOrderAction('DISCARD_EDIT', order.orderNumber);
    } else {
      this.props.setOrderAction('DISCARD_ONE', order.orderNumber);
    }
  }

  clearSearchField = () => {
    this.setState({
      value: "",
      focused: false,
      editDrugUuid: "",
      editDrugName: "",
    });
  }

  handleEditDraftOrder = (order) => {
    this.props.selectDrugSuccess(order.drug);
    this.setState({
      draftOrder: order,
      editDrugUuid: order.drug,
      editDrugName: order.drugName,
      orderNumber: order.orderNumber,
    }, () => {
      this.props.setOrderAction('EDIT', order.orderNumber);
    });
    this.props.deleteDraftOrder(order);
  }

  handleEditActiveDrugOrder = (order, details) => {
    let formattedDetails = details.props.children.join("");
    if (formattedDetails.length > 250) {
      formattedDetails = `${formattedDetails.substring(0, 250)}...`;
    }
    const editOrder = order;
    editOrder.action = "REVISE";
    this.setState({
      formattedDetails,
      editDrugUuid: order.drug.uuid,
      editDrugName: order.drug.display,
      editOrder,
      orderNumber: order.orderNumber,
    }, () => {
      this.props.setOrderAction('EDIT', order.orderNumber);
    });
  }

  removeOrder = () => {
    this.setState({
      editOrder: {},
      draftOrder: {},
    });
  }

  renderSearchDrug = () => (
    this.state.editDrugName ?
      <p className="revise-order-padding">
        <b className="revised-order-text"> Revise for: {this.state.editDrugName} </b><br />
        <b className="current-order-color">Current Order: <em>{this.state.formattedDetails}</em></b>
      </p>
      :
      <SearchDrug
        value={this.state.value}
        focused={this.state.focused}
        onChange={this.onChange}
        onSelectDrug={this.onSelectDrug}
      />
  )

  renderAddForm = careSetting => (
    <div>
      <AddForm
        currentOrderType={this.props.currentOrderType}
        drugName={this.state.editDrugName ? this.state.editDrugName : this.props.drug.display}
        drugUuid={this.state.editDrugUuid ? this.state.editDrugUuid : this.props.drug.uuid}
        editOrder={this.state.editOrder}
        careSetting={careSetting}
        clearSearchField={this.clearSearchField}
        removeOrder={this.removeOrder}
        draftOrder={this.state.draftOrder}
        orderNumber={`${this.state.orderNumber}`}
      />
    </div>
  );

  render() {
    const {
      outpatientCareSetting, draftOrders, draftLabOrders, backLink,
    } = this.props;
    const allDraftOrders = [...draftOrders, ...draftLabOrders.orders].length;
    return (
      <div className="drug-order-entry">
        <h5 className="drug-form-header">New Drug Order</h5>
        {this.renderSearchDrug()}
        {this.renderAddForm(outpatientCareSetting)}
      </div>
    );
  }
}

const mapStateToProps = ({
  careSettingReducer:
  { outpatientCareSetting },
  drugSearchReducer,
  draftReducer: { draftDrugOrders, draftLabOrders },
  dateFormatReducer: { dateFormat },
  orderSelectionReducer: { activity, selectedOrder, currentOrderType },
}) => ({
  outpatientCareSetting,
  drug: drugSearchReducer.selected,
  draftOrders: draftDrugOrders,
  draftLabOrders,
  activity,
  selectedOrder,
  currentOrderType,
});

SearchAndAddOrder.defaultProps = {
  currentOrderType: {},
  drug: null,
  selectedOrder: {},
  activity: '',
};

SearchAndAddOrder.propTypes = {
  currentOrderType: PropTypes.object,
  drug: PropTypes.oneOfType([
    PropTypes.shape({
      uuid: PropTypes.string,
      display: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  draftLabOrders: PropTypes.object.isRequired,
  draftOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
  setOrderAction: PropTypes.func.isRequired,
  deleteDraftOrder: PropTypes.func.isRequired,
  outpatientCareSetting: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  }).isRequired,
  selectDrugSuccess: PropTypes.func.isRequired,
  selectedOrder: PropTypes.object,
  activity: PropTypes.string,
};

export default connect(
  mapStateToProps,
  {
    setOrderAction,
    deleteDraftOrder,
    selectDrugSuccess,
  },
)(SearchAndAddOrder);
