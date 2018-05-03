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

export class SearchAndAddOrder extends React.Component {
  state = {
    value: "",
    focused: false,
    editDrugUuid: '',
    editDrugName: '',
    editOrder: {},
    editOrderNumber: '',
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

  clearSearchField = () => {
    this.setState({
      value: "",
      focused: false,
      editDrugUuid: "",
      editDrugName: "",
    });
  }

  clearEditOrderNumber = () => {
    this.setState({ editOrderNumber: '' });
  }

  handleEditActiveDrugOrder = (order) => {
    this.setState({
      editDrugUuid: order.drug.uuid,
      editDrugName: order.drug.display,
      editOrder: order,
      editOrderNumber: order.orderNumber,
    });
  }

  removeOrder = () => {
    this.setState({ editOrder: {} });
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
        clearEditOrderNumber={this.clearEditOrderNumber}
        removeOrder={this.removeOrder}
      />
    </div>
  );

  render() {
    return (
      <div className="body-wrapper">
        <Tabs>
          <Tab
            tabName="OutPatient">
            {this.renderSearchDrug()}
            {this.renderAddForm(this.props.outpatientCareSetting)}
            <Accordion open title="Active Drug Orders">
              <ActiveOrders
                tabName="OutPatient"
                careSetting={this.props.outpatientCareSetting}
                location={this.props.location}
                handleEditActiveDrugOrder={this.handleEditActiveDrugOrder}
                editOrderNumber={this.state.editOrderNumber}
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
            <Accordion open title="Active Drug Orders">
              <ActiveOrders
                tabName="InPatient"
                careSetting={this.props.inpatientCareSetting}
                location={this.props.location}
                handleEditActiveDrugOrder={this.handleEditActiveDrugOrder}
                editOrderNumber={this.state.editOrder.orderNumber}
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
}) => ({
  inpatientCareSetting,
  outpatientCareSetting,
  drug: drugSearchReducer.selected,
});

SearchAndAddOrder.propTypes = {
  drug: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(SearchAndAddOrder);
