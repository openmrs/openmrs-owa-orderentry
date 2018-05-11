import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FreeText from './FreeText';
import StandardDose from './StandardDose';
import DraftDataTable from './DraftDataTable';
import DosageTabs from '../../tabs/DosageTabs';
import DosageTab from '../../tabs/DosageTab';
import { getOrderEntryConfigurations } from '../../../actions/orderEntryActions';
import { addDraftOrder } from '../../../actions/draftTableAction';
import { selectDrugSuccess } from '../../../actions/drug';
import { setOrderAction } from '../../../actions/orderAction';

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
    draftOrder: {},
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
    return (
      Object.keys(this.props.draftOrder).length ||
      Object.keys(this.props.editOrder).length
    ) && this.populateEditOrderForm();
  }

  handleFormTabs = (tabIndex) => {
    this.setState({
      activeTabIndex: tabIndex,
    });
  }

  handleFormType = (formType) => {
    this.setState({ formType: formType.trim() });
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
      draftOrder: {
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
        drugInstructions,
        careSetting: this.props.careSetting.uuid,
        drug: this.props.drugUuid,
        orderer: this.props.session.currentProvider.uuid,
        dosingType: this.state.formType === 'Standard Dosage' ?
          'org.openmrs.SimpleDosingInstructions' :
          'org.openmrs.FreeTextDosingInstructions',
        type: "drugorder",
        orderNumber: this.props.draftOrders.length,
      },
    }, () => {
      this.props.addDraftOrder(this.state.draftOrder);
      this.props.setOrderAction('DRAFT', this.props.orderNumber);
    });
    this.props.selectDrugSuccess('');
    this.clearDrugForms();
    this.props.clearSearchField();
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
    this.props.setOrderAction('DISCARD_ONE', this.props.orderNumber);
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

  populateEditOrderForm = () => {
    const { editOrder, draftOrder } = this.props;
    this.setState({
      activeTabIndex: (draftOrder.dosingType || editOrder.dosingType) === 'org.openmrs.SimpleDosingInstructions' ? 0 : 1,
      action: this.props.editOrder ? 'REVISE' : 'NEW',
      formType: (draftOrder.dosingType || editOrder.dosingType) === 'org.openmrs.SimpleDosingInstructions' ? 'Standard Dosage' : 'Free Text',
      dosingType: draftOrder.dosingType || editOrder.dosingType,
      fields: {
        dose: editOrder.dose || draftOrder.dose || '',
        dosingUnit: (editOrder.doseUnits && editOrder.doseUnits.display) || draftOrder.dosingUnit || '',
        frequency: (editOrder.frequency && editOrder.frequency.display) || draftOrder.frequency || '',
        route: (editOrder.route && editOrder.route.display) || draftOrder.route || '',
        duration: editOrder.duration || draftOrder.duration || '',
        durationUnit: (editOrder.durationUnits && editOrder.durationUnits.display) || draftOrder.durationUnit || '',
        dispensingQuantity: editOrder.quantity || draftOrder.dispensingQuantity || '',
        dispensingUnit: (editOrder.quantityUnits && editOrder.quantityUnits.display) || draftOrder.dispensingUnit || '',
        reason: editOrder.asNeededCondition || draftOrder.reason || '',
        drugInstructions: editOrder.dosingInstructions || draftOrder.drugInstructions || '',
      },
    });
    this.props.removeOrder();
  }

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
      </div>
    );
  }
}

const mapStateToProps = ({
  orderEntryConfigurations,
  drugSearchReducer,
  draftTableReducer: { draftOrders },
  sessionReducer,
}) =>
  ({
    drug: drugSearchReducer.selected,
    draftOrders,
    allConfigurations: ((orderEntryConfigurations || {}).configurations || {}),
    session: sessionReducer,
  });

AddForm.propTypes = {
  clearSearchField: PropTypes.func.isRequired,
  selectDrugSuccess: PropTypes.func,
  getOrderEntryConfigurations: PropTypes.func,
  addDraftOrder: PropTypes.func.isRequired,
  setOrderAction: PropTypes.func.isRequired,
  orderNumber: PropTypes.string,
  draftOrders: PropTypes.arrayOf(PropTypes.any),
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
  draftOrder: PropTypes.shape({}),
};

AddForm.defaultProps = {
  selectDrugSuccess: {},
  getOrderEntryConfigurations: () => {},
  drugName: '',
  editOrder: {},
  draftOrder: {},
  draftOrders: [],
  drugUuid: '',
  orderNumber: '0',
};

export default connect(
  mapStateToProps,
  {
    getOrderEntryConfigurations,
    selectDrugSuccess,
    addDraftOrder,
    setOrderAction,
  },
)(AddForm);
