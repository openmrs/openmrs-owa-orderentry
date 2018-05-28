import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddForm from './addForm/AddForm';
import PastOrders from '../orderEntry/PastOrders';
import Tabs from '../tabs/Tabs';
import Tab from '../tabs/Tab';
import Accordion from '../accordion';
import SearchDrug from '../searchDrug';
import ActiveOrders from './ActiveOrders';
import { setOrderAction } from '../../actions/orderAction';
import { deleteDraftOrder, deleteAllDraftOrders } from '../../actions/draftTableAction';
import DraftDataTable from './addForm/DraftDataTable';
import { selectDrugSuccess } from '../../actions/drug';

export class SearchAndAddOrder extends React.Component {
  state = {
    value: "",
    focused: false,
    editDrugUuid: '',
    editDrugName: '',
    editOrder: {},
    isDelete: false,
    draftOrder: {},
  };

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

  onDelete = (event) => {
    this.setState({ isDelete: event });
  }

  handleDiscardOneOrder = (order) => {
    this.props.deleteDraftOrder(order);
    if (order.action === 'REVISE') {
      this.props.setOrderAction('DISCARD_EDIT', order.orderNumber);
    } else {
      this.props.setOrderAction('DISCARD_ONE', order.orderNumber);
    }
  }

  handleDiscardAllOrders = () => {
    this.setState({ isDelete: false }, () => {
      this.props.deleteAllDraftOrders();
      this.props.setOrderAction('DISCARD_ALL', '0');
    });
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
    this.setState({ draftOrder: order });
    this.handleDiscardOneOrder(order);
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

  renderDraftDataTable = careSetting => (
    (this.state.isDelete || this.props.draftOrders.length > 0) &&
    <DraftDataTable
      draftOrders={this.props.draftOrders}
      handleDiscardOneOrder={this.handleDiscardOneOrder}
      handleDiscardAllOrders={this.handleDiscardAllOrders}
      handleEditDraftOrder={this.handleEditDraftOrder}
      careSetting={careSetting}
    />
  )

  render() {
    const {
      outpatientCareSetting, inpatientCareSetting, location, dateFormat,
    } = this.props;
    return (
      <div className="body-wrapper">
        <Tabs>
          <Tab
            tabName={outpatientCareSetting.display}>
            {this.renderSearchDrug()}
            {this.renderAddForm(outpatientCareSetting)}
            {this.renderDraftDataTable(outpatientCareSetting)}
            <Accordion open title="Active Drug Orders">
              <ActiveOrders
                isDelete={this.state.isDelete}
                onDelete={this.onDelete}
                tabName={outpatientCareSetting.display}
                careSetting={outpatientCareSetting}
                location={location}
                dateFormat={dateFormat}
                handleEditActiveDrugOrder={this.handleEditActiveDrugOrder}
              />
            </Accordion>

            <Accordion title="Past Drug Orders">
              <PastOrders
                tabName="Outpatient"
                careSetting={outpatientCareSetting}
                dateFormat={dateFormat}
                location={location} />

              <br />
            </Accordion>
          </Tab>
          <Tab
            tabName={inpatientCareSetting.display}>
            {this.renderSearchDrug()}
            {this.renderAddForm(inpatientCareSetting)}
            {this.renderDraftDataTable(this.props.inpatientCareSetting)}
            <Accordion open title="Active Drug Orders">
              <ActiveOrders
                isDelete={this.state.isDelete}
                onDelete={this.onDelete}
                tabName={inpatientCareSetting.display}
                careSetting={inpatientCareSetting}
                location={location}
                dateFormat={dateFormat}
                handleEditActiveDrugOrder={this.handleEditActiveDrugOrder}
              />
            </Accordion>

            <Accordion title="Past Drug Orders">
              <PastOrders
                tabName="Inpatient"
                careSetting={inpatientCareSetting}
                dateFormat={dateFormat}
                location={location} />
            </Accordion>

          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = ({
  careSettingReducer:
  { inpatientCareSetting, outpatientCareSetting },
  drugSearchReducer,
  draftTableReducer: { draftOrders },
  dateFormatReducer: { dateFormat },
}) => ({
  inpatientCareSetting,
  outpatientCareSetting,
  drug: drugSearchReducer.selected,
  draftOrders,
  dateFormat,
});

SearchAndAddOrder.defaultProps = {
  draftOrders: [],
  drug: null,
};

SearchAndAddOrder.propTypes = {
  drug: PropTypes.oneOfType([
    PropTypes.shape({
      uuid: PropTypes.string,
      display: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  draftOrders: PropTypes.arrayOf(PropTypes.any),
  dateFormat: PropTypes.string.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  setOrderAction: PropTypes.func.isRequired,
  deleteDraftOrder: PropTypes.func.isRequired,
  deleteAllDraftOrders: PropTypes.func.isRequired,
  outpatientCareSetting: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  }).isRequired,
  inpatientCareSetting: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  }).isRequired,
  selectDrugSuccess: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    setOrderAction,
    deleteDraftOrder,
    deleteAllDraftOrders,
    selectDrugSuccess,
  },
)(SearchAndAddOrder);
