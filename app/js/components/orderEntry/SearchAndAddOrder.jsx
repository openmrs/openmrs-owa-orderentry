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
    if (order.action === 'DISCONTINUE') {
      this.props.setOrderAction('DISCARD_ONE', order.orderNumber);
    } else if (order.action === 'NEW') {
      this.props.setOrderAction('DISCARD_EDIT', order.orderNumber);
    } else {
      this.props.setOrderAction('DISCARD_ONE', this.state.orderNumber);
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

  handleEditActiveDrugOrder = (order) => {
    this.setState({
      editDrugUuid: order.drug.uuid,
      editDrugName: order.drug.display,
      editOrder: order,
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
      <h1> Revise for: {this.state.editDrugName} </h1> :
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
      careSetting={careSetting}
    />
  )

  render() {
    return (
      <div className="body-wrapper">
        <Tabs>
          <Tab
            tabName="OutPatient">
            {this.renderSearchDrug()}
            {this.renderAddForm(this.props.outpatientCareSetting)}
            {this.renderDraftDataTable(this.props.outpatientCareSetting)}
            <Accordion open title="Active Drug Orders">
              <ActiveOrders
                isDelete={this.state.isDelete}
                onDelete={this.onDelete}
                tabName="OutPatient"
                careSetting={this.props.outpatientCareSetting}
                location={this.props.location}
                handleEditActiveDrugOrder={this.handleEditActiveDrugOrder}
              />
            </Accordion>

            <Accordion title="Past Drug Orders">
              <PastOrders
                tabName="OutPatient"
                careSetting={this.props.outpatientCareSetting}
                location={this.props.location} />

              <br />
            </Accordion>
          </Tab>
          <Tab
            tabName="InPatient">
            {this.renderSearchDrug()}
            {this.renderAddForm(this.props.inpatientCareSetting)}
            {this.renderDraftDataTable(this.props.inpatientCareSetting)}
            <Accordion open title="Active Drug Orders">
              <ActiveOrders
                isDelete={this.state.isDelete}
                onDelete={this.onDelete}
                tabName="InPatient"
                careSetting={this.props.inpatientCareSetting}
                location={this.props.location}
                handleEditActiveDrugOrder={this.handleEditActiveDrugOrder}
              />
            </Accordion>

            <Accordion title="Past Drug Orders">
              <PastOrders
                tabName="InPatient"
                careSetting={this.props.inpatientCareSetting}
                location={this.props.location} />
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
}) => ({
  inpatientCareSetting,
  outpatientCareSetting,
  drug: drugSearchReducer.selected,
  draftOrders,
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
