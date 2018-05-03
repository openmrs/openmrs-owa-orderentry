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
    action: 'NEW',
    fields: {
      dose: '',
      dosingUnit: '',
      frequency: '',
      route: '',
      duration: '',
      durationUnit: '',
      dispensingQuantity: '',
      dispensingUnit: '',
      reason: '',
      drugInstructions: '',
    },
    fieldErrors: {
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

  componentDidUpdate() {
    Object.keys(this.props.editOrder).length && this.populateEditActiveOrderForm();
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
      drugInstructions,
    } = this.state.fields;
    this.setState({
      draftOrders: [
        ...this.state.draftOrders,
        {
          drugName: this.props.drugName,
          action: this.state.action,
          dose,
          dosingUnit,
          frequency,
          route,
          duration,
          durationUnit,
          dispensingUnit,
          dispensingQuantity,
          reason,
          drugInstructions,
          careSetting: this.props.careSetting.uuid,
          drug: this.props.drugUuid,
          dosingType: this.state.formType === 'Standard Dosage' ?
            'org.openmrs.SimpleDosingInstructions' :
            'org.openmrs.FreeTextDosingInstructions',
          type: "drugorder",
          orderNumber: this.state.draftOrders.length,
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
      drugInstructions,
    } = order;
    this.handleDiscardOneOrder(order);
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
        drugInstructions,
      },
      ...this.state.draftOrders,
    });
  }

  handleDiscardOneOrder = (order) => {
    this.setState({
      draftOrders: this.state.draftOrders.filter((_, index) =>
        index !== this.state.draftOrders.indexOf(order)),
    });
  }

  handleDiscardDraftOrders = () => {
    this.setState({ draftOrders: [] });
    this.props.clearSearchField();
    this.props.clearEditOrderNumber();
  }
  /**
   * Validation of datalist tag values using onblur event handler
   */
  handleValidation = (event) => {
    const {
      drugDosingUnits, orderFrequencies, drugRoutes, durationUnits, drugDispensingUnits,
    } = this.props.allConfigurations;
    const { name, value } = event.target;
    let item = false;
    switch (name) {
      case 'dosingUnit':
        item = drugDosingUnits.filter(unit => unit.display === value).length > 0;
        break;
      case 'frequency':
        item = orderFrequencies.filter(frequency => frequency.display === value).length > 0;
        break;
      case 'route':
        item = drugRoutes.filter(route => route.display === value).length > 0;
        break;
      case 'durationUnit':
        item = durationUnits.filter(unit => unit.display === value).length > 0;
        break;
      case 'dispensingUnit':
        item = drugDispensingUnits.filter(unit => unit.display === value).length > 0;
        break;
      default:
        item = value.length > 0;
    }

    { this.setState({
      ...this.state,
      fields: {
        ...this.state.fields, [name]: item ? value : '',
      },
      fieldErrors: {
        ...this.state.fieldErrors, [name]: !item,
      },
    }); }
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      fields: { ...this.state.fields, [event.target.name]: event.target.value },
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
        drugInstructions: '',
      },
      action: 'NEW',
    });
  }

  activateSaveButton = () => {
    const {
      dose,
      dosingUnit,
      frequency,
      route,
      dispensingQuantity,
      dispensingUnit,
      duration,
      durationUnit,
      drugInstructions,
    } = this.state.fields;

    if (Object.values(this.state.fieldErrors).includes(true)) {
      return true;
    } else if (this.state.formType === 'Standard Dosage') {
      if (duration && !durationUnit) {
        return true;
      } else if ((this.props.careSetting.display === 'Outpatient') &&
      !(
        dose &&
        dosingUnit &&
        frequency &&
        route &&
        dispensingQuantity &&
        dispensingUnit
      )) {
        return true;
      } else if ((this.props.careSetting.display === 'Inpatient') &&
      !(dose && dosingUnit && frequency && route)) {
        return true;
      }
    } else if (this.state.formType === 'Free Text') {
      if ((this.props.careSetting.display === 'Outpatient') &&
      !(drugInstructions && dispensingQuantity && dispensingUnit)) {
        return true;
      } else if ((this.props.careSetting.display === 'Inpatient') &&
      !(drugInstructions)) {
        return true;
      }
    }
    return false;
  }

  addDrugOrder = (event) => {
    event.preventDefault();
    // make post request to API
  }

  populateEditActiveOrderForm = () => {
    const {
      dose,
      doseUnits,
      frequency,
      route,
      duration,
      durationUnits,
      quantity,
      quantityUnits,
      asNeededCondition,
      dosingInstructions,
      dosingType,
    } = this.props.editOrder;
    this.setState({
      activeTabIndex: dosingType === 'org.openmrs.SimpleDosingInstructions' ? 0 : 1,
      action: 'REVISE',
      formType: dosingType === 'org.openmrs.SimpleDosingInstructions' ? 'Standard Dosage' : 'Free Text',
      dosingType,
      fields: {
        dose: dose || '',
        dosingUnit: (doseUnits && doseUnits.display) || '',
        frequency: (frequency && frequency.display) || '',
        route: (route && route.display) || '',
        duration: duration || '',
        durationUnit: (durationUnits && durationUnits.display) || '',
        dispensingQuantity: quantity || '',
        dispensingUnit: (quantityUnits && quantityUnits.display) || '',
        reason: asNeededCondition || '',
        drugInstructions: dosingInstructions || '',
      },
    });
    this.props.removeOrder();
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
          <StandardDose
            careSetting={this.props.careSetting}
            fields={this.state.fields}
            fieldErrors={this.state.fieldErrors}
            allConfigurations={this.props.allConfigurations}
            handleValidation={this.handleValidation}
            activateSaveButton={this.activateSaveButton}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmitDrugForm}
            handleCancel={this.handleCancel} />
          <br />
        </DosageTab>
        <DosageTab tabName="Free Text" icon="icon-edit">
          <FreeText
            fields={this.state.fields}
            fieldErrors={this.state.fieldErrors}
            allConfigurations={this.props.allConfigurations}
            handleValidation={this.handleValidation}
            activateSaveButton={this.activateSaveButton}
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
  drug: drugSearchReducer.selected,
  allConfigurations: ((orderEntryConfigurations || {}).configurations || {}),
});

AddForm.propTypes = {
  clearEditOrderNumber: PropTypes.func.isRequired,
  selectDrugSuccess: PropTypes.func,
  getOrderEntryConfigurations: PropTypes.func,
  allConfigurations: PropTypes.object.isRequired,
  drugName: PropTypes.string,
  careSetting: PropTypes.object.isRequired,
  drugUuid: PropTypes.string,
  removeOrder: PropTypes.func.isRequired,
  editOrder: PropTypes.shape({
    dose: PropTypes.number,
    doseUnits: PropTypes.shape({}),
    frequency: PropTypes.shape({}),
    route: PropTypes.shape({}),
    duration: PropTypes.number,
    durationUnits: PropTypes.shape({}),
    quantity: PropTypes.number,
    quantityUnits: PropTypes.shape({}),
    asNeededCondition: PropTypes.string,
    dosingInstructions: PropTypes.string,
    dosingType: PropTypes.string,
  }),
};

AddForm.defaultProps = {
  selectDrugSuccess: {},
  getOrderEntryConfigurations: () => {},
  drugName: '',
  editOrder: {},
  drugUuid: '',
};

export default connect(
  mapStateToProps,
  {
    getOrderEntryConfigurations,
    selectDrugSuccess,
  },
)(AddForm);
