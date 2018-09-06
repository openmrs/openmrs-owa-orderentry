import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Accordion } from '@openmrs/react-components';
import AddForm from './addForm/AddForm';
import PastOrders from './PastOrders';
import Tabs from '../tabs/Tabs';
import Tab from '../tabs/Tab';
import SearchDrug from '../searchDrug';
import ActiveOrders from './ActiveOrders';
import { setOrderAction } from '../../actions/orderAction';
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


  clearSearchField = () => {
    this.setState({
      value: "",
      focused: false,
      editDrugUuid: "",
      editDrugName: "",
    });
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

  closeFormsOnTabChange = () => {
    this.clearSearchField();
    this.props.selectDrugSuccess();
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
        drugName={this.state.editDrugName ? this.state.editDrugName : this.props.drug.display}
        drugUuid={this.state.editDrugUuid ? this.state.editDrugUuid : this.props.drug.uuid}
        editOrder={this.state.editOrder}
        careSetting={careSetting}
        clearSearchField={this.clearSearchField}
        removeOrder={this.removeOrder}
        draftOrder={this.state.draftOrder}
        orderNumber={this.state.orderNumber}
      />
    </div>
  );


  render() {
    const {
      outpatientCareSetting, location, dateFormat,
    } = this.props;
    return (
      <div className="body-wrapper drug-order-entry">
        <h5 className="drug-form-header">New Drug Order</h5>
        {this.renderSearchDrug()}
        {this.renderAddForm(outpatientCareSetting)}
        <Accordion open title="Active Drug Orders">
          <ActiveOrders
            careSetting={outpatientCareSetting}
            location={location}
            dateFormat={dateFormat}
            handleEditActiveDrugOrder={this.handleEditActiveDrugOrder}
          />
        </Accordion>

        <Accordion title="Past Drug Orders">
          <PastOrders
            careSetting={outpatientCareSetting}
            dateFormat={dateFormat}
            location={location}
          />
          <br />
        </Accordion>
      </div>
    );
  }
}

const mapStateToProps = ({
  careSettingReducer:
  { outpatientCareSetting },
  drugSearchReducer,
  dateFormatReducer: { dateFormat },
  orderSelectionReducer: { activity, selectedOrder },
}) => ({
  outpatientCareSetting,
  drug: drugSearchReducer.selected,
  dateFormat,
  activity,
  selectedOrder,
});

SearchAndAddOrder.defaultProps = {
  drug: null,
  selectedOrder: {},
  activity: '',
};

SearchAndAddOrder.propTypes = {
  drug: PropTypes.oneOfType([
    PropTypes.shape({
      uuid: PropTypes.string,
      display: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  dateFormat: PropTypes.string.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  setOrderAction: PropTypes.func.isRequired,
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
    selectDrugSuccess,
  },
)(SearchAndAddOrder);
