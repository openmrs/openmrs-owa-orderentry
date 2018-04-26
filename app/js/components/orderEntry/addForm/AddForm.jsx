import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FreeText from './FreeText';
import StandardDose from './StandardDose';
import DraftDataTable from './DraftDataTable';
import DosageTabs from '../../tabs/DosageTabs';
import DosageTab from '../../tabs/DosageTab';
import { getOrderEntryConfigurations } from '../../../actions/orderEntryActions';
import { selectDrugSuccess } from '../../../actions/drug';

export class AddForm extends React.Component {
  state = {
    action: '',
    fields: {
      dose: '',
      dosingUnit: '',
      frequency: '',
      route: '',
      duration: '',
      durationUnit: '',
      dispensingUnit: '',
      dispensingQuantity: '',
      reason: '',
      note: '',
    },
    draftOrders: [],
    orders: [],
    orderNumber: 0,
    formType: 'Standard Dosage',
    dosingType: '',
    activeTabIndex: 0,
  };

  componentDidMount() {
    this.props.getOrderEntryConfigurations();
  }

  handleFormTabs = (tabIndex) => {
    this.setState({
      activeTabIndex: tabIndex,
    });
  }

  handleFormType = (formType) => {
    this.setState({ formType });
  }

  handleSubmitDrugForm = () => {
    const {
      dose,
      dosingUnit,
      frequency,
      route,
      duration,
      durationUnit,
      dispensingQuantity,
      dispensingUnit,
      reason,
      note,
    } = this.state.fields;
    this.setState({
      draftOrders: [
        ...this.state.draftOrders,
        {
          drugName: this.props.drugName,
          action: "NEW",
          dose,
          dosingUnit,
          frequency,
          route,
          duration,
          durationUnit,
          dispensingUnit,
          dispensingQuantity,
          reason,
          note,
          careSetting: this.props.careSetting.uuid,
          drug: this.props.drugUuid,
          dosingType: this.state.formType === 'Standard Dosage' ?
            'org.openmrs.SimpleDosingInstructions' :
            'org.openmrs.FreeTextDosingInstructions',
          type: "drugorder",
          orderNumber: this.state.orders.length,
        },
      ],
    });
    this.props.selectDrugSuccess('');
    this.clearDrugForms();
    this.props.clearSearchField();
  }

  handleEditDrugOrder = (order, drugUuid, dosingType) => {
    this.props.selectDrugSuccess(drugUuid);
    const {
      dose,
      dosingUnit,
      frequency,
      route,
      duration,
      durationUnit,
      dispensingQuantity,
      dispensingUnit,
      reason,
      note,
    } = order;
    this.state.orders.splice(this.state.orders.indexOf(order), 1);
    this.setState({
      activeTabIndex: dosingType === 'org.openmrs.SimpleDosingInstructions' ? 0 : 1,
      fields: {
        dose,
        dosingUnit,
        frequency,
        route,
        duration,
        durationUnit,
        dispensingQuantity,
        dispensingUnit,
        reason,
        note,
      },
      ...this.state.orders,
    });
  }

  handleDiscardOneOrder = (order) => {
    this.state.orders.splice(this.state.orders.indexOf(order), 1);
    this.setState({ ...this.state.orders });
  }

  handleDiscardDraftOrders = () => {
    this.setState({ orders: [] });
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      fields: { ...this.state.fields, [e.target.name]: e.target.value },
    });
  }

  handleCancel = () => {
    this.props.selectDrugSuccess('');
    this.clearDrugForms();
    this.props.clearSearchField();
  }

  clearDrugForms = () => {
    this.setState({
      fields: {
        dose: '',
        dosingUnit: '',
        frequency: '',
        route: '',
        duration: '',
        durationUnit: '',
        dispensingUnit: '',
        dispensingQuantity: '',
        reason: '',
        note: '',
      },
    });
  }

  addDrugOrder = (event) => {
    event.preventDefault();
    // make post request to API
  }

  renderDraftDataTable = () => (
    <div>
      <DraftDataTable
        draftOrders={this.state.draftOrders}
        handleEditDrugOrder={this.handleEditDrugOrder}
        handleDiscardOneOrder={this.handleDiscardOneOrder}
        handleCancel={this.handleDiscardDraftOrders}
        handleSubmit={this.addDrugOrder}
      />
    </div>
  );
  renderDrugOrderForms = () => (
    <div>
      <DosageTabs
        formType={this.handleFormType}
        activeTabIndex={this.state.activeTabIndex}
        handleFormTabs={this.handleFormTabs}
      >
        <DosageTab tabName="Standard Dosage &nbsp;" icon="icon-th-large">
          <StandardDose />
          <br />
        </DosageTab>
        <DosageTab tabName="Free Text" icon="icon-edit">
          <FreeText
            fields={this.state.fields}
            allConfigurations={this.props.allConfigurations}
            handleChange={this.handleChange}
            handleCancel={this.handleCancel}
            handleSubmit={this.handleSubmitDrugForm}
            careSetting={this.props.careSetting} />
          <br />
        </DosageTab>
      </DosageTabs>
    </div>
  );

  render() {
    return (
      <div>
        { this.props.drugUuid && this.renderDrugOrderForms() }
        { this.state.draftOrders.length > 0 && this.renderDraftDataTable()}
      </div>
    );
  }
}

const mapStateToProps = ({ orderEntryConfigurations, drugSearchReducer }) => ({
  allConfigurations: orderEntryConfigurations.configurations,
  drug: drugSearchReducer.selected,
});

AddForm.propTypes = {
  selectDrugSuccess: PropTypes.func,
  getOrderEntryConfigurations: PropTypes.func,
  allConfigurations: PropTypes.shape({}),
  drugName: PropTypes.string,
};

AddForm.defaultProps = {
  selectDrugSuccess: {},
  getOrderEntryConfigurations: {},
  allConfigurations: {},
  drugName: '',
};

export default connect(
  mapStateToProps,
  {
    getOrderEntryConfigurations,
    selectDrugSuccess,
  },
)(AddForm);
