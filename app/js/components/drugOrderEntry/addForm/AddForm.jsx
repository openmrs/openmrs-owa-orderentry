import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import FreeText from './FreeText';
import StandardDose from './StandardDose';
import DosageTabs from '../../tabs/DosageTabs';
import DosageTab from '../../tabs/DosageTab';
import getOrderEntryConfigurations from '../../../actions/orderEntryActions';
import { addDraftOrder } from '../../../actions/draftTableAction';
import { selectDrugSuccess } from '../../../actions/drug';
import { setOrderAction, setSelectedOrder } from '../../../actions/orderAction';
import fetchAllOrders from '../../../actions/fetchAllOrders';
import { successToast, errorToast } from '../../../utils/toast';
import errorMessages from '../../../utils/errorMessages.json';

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
    previousOrder: null,
    fieldErrors: {
    },
    draftOrder: {},
    orders: [],
    stateOrderNumber: '0',
    formType: 'Standard Dosage',
    dosingType: '',
    activeTabIndex: 0,
    options: {
      dosingUnit: [],
      frequency: [],
      route: [],
      durationUnit: [],
      dispensingUnit: [],
    },
  };

  componentDidMount() {
    const {
      getOrderEntryConfigurationsAction,
      fetchAllOrdersAction,
      patient: { uuid },
    } = this.props;
    getOrderEntryConfigurationsAction();
    fetchAllOrdersAction(null, uuid);
  }

  componentDidUpdate(prevProps) {
    const { status: { added, error }, errorMessage, addedOrder } = this.props.createOrderReducer;
    const {
      setSelectedOrderAction, draftOrder, editOrder, intl,
    } = this.props;

    const orderCreatedMsg = intl.formatMessage({ id: "app.orders.create.success", defaultMessage: "Order Successfully Created" });

    if (addedOrder && prevProps.createOrderReducer.addedOrder !== addedOrder) {
      setSelectedOrderAction({
        currentOrderType: {},
        order: null,
        activity: null,
      });
    }
    if (added && prevProps.createOrderReducer.addedOrder !== addedOrder) {
      successToast(orderCreatedMsg);
    }
    if (error && prevProps.createOrderReducer.errorMessage !== errorMessage) {
      errorToast(errorMessages[errorMessage.join('')]);
    }
    return (
      Object.keys(draftOrder).length ||
      Object.keys(editOrder).length
    ) && this.populateEditOrderForm();
  }

  handleFormTabs = (tabIndex) => {
    this.setState({
      activeTabIndex: tabIndex,
      fieldErrors: {},
    });
  };

  handleFormType = (formType) => {
    this.setState({ formType: formType.trim() });
  };

  checkIfDrugHasActiveOrder = (drugUuid) => {
    const { filteredOrders } = this.props.fetchOrdersReducer;
    const activeDrugOrder = filteredOrders.filter(order =>
      order.type === 'drugorder' && order.drug.uuid === drugUuid);
    if (activeDrugOrder.length === 1) {
      return true;
    }
    return false;
  };

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
    const {
      careSetting,
      drugUuid,
      session,
      activity,
      draftOrders,
      orderNumber,
      currentOrderType,
      setSelectedOrderAction,
      drugName,
      addDraftOrderAction,
      setOrder,
      selectDrugSuccessAction,
      clearSearchField,
      intl,
    } = this.props;

    const activeOrderMsg = intl.formatMessage({ id: "app.orders.is.active", defaultMessage: "order is active" });
    if (!this.checkIfDrugHasActiveOrder(drugUuid) || activity === "EDIT") {
      const {
        previousOrder,
        formType,
        action,
        stateOrderNumber,
      } = this.state;

      this.setState({
        draftOrder: {
          drugName,
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
          previousOrder,
          drugInstructions,
          careSetting: careSetting.uuid,
          drug: drugUuid,
          orderer: session.currentProvider.uuid,
          dosingType: formType === 'Standard Dosage' ?
            'org.openmrs.SimpleDosingInstructions' :
            'org.openmrs.FreeTextDosingInstructions',
          type: "drugorder",
          stateOrderNumber: (action === 'NEW') ? draftOrders.length :
            stateOrderNumber,
        },
      }, () => {
        addDraftOrderAction(this.state.draftOrder);
        if (this.state.draftOrder.action === 'NEW') {
          setOrder('DRAFT', stateOrderNumber);
        } else {
          setOrder('DRAFT_EDIT', orderNumber);
        }
      });
      selectDrugSuccessAction('');
      this.clearDrugForms();
      clearSearchField();
      if (activity === 'DRAFT_ORDER_EDIT') {
        setSelectedOrderAction({
          currentOrderType,
          selectedOrder: null,
          activity: null,
        });
      }
    } else {
      errorToast(`${drugName} ${activeOrderMsg}.`);
    }
  }

  handleValidation = (event) => {
    const {
      drugDosingUnits, orderFrequencies, drugRoutes, durationUnits, drugDispensingUnits,
    } = this.props.allConfigurations;
    const { name, value } = event.target;
    let item = false;
    const options = [];
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
      options: {
        ...this.state.options, [name]: options,
      },
    }); }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const {
      drugDosingUnits, orderFrequencies, drugRoutes, durationUnits, drugDispensingUnits,
    } = this.props.allConfigurations;
    let options;
    if (value) {
      switch (name) {
        case 'dosingUnit':
          options = drugDosingUnits.filter(unit => (
            unit.display.toLowerCase().indexOf(value.toLowerCase()) === 0));
          break;
        case 'frequency':
          options = orderFrequencies.filter(frequency => (
            frequency.display.toLowerCase().indexOf(value.toLowerCase()) === 0));
          break;
        case 'route':
          options = drugRoutes.filter(route => (
            route.display.toLowerCase().indexOf(value.toLowerCase()) === 0));
          break;
        case 'dispensingUnit':
          options = drugDispensingUnits.filter(unit => (
            unit.display.toLowerCase().indexOf(value.toLowerCase()) === 0));
          break;
        case 'durationUnit':
          options = durationUnits.filter(unit => (
            unit.display.toLowerCase().indexOf(value.toLowerCase()) === 0));
          break;
        default:
          // does nothing
      }
    }

    this.setState({
      ...this.state,
      fields: { ...this.state.fields, [name]: value },
      options: { ...this.state.options, [name]: options },
    });
  }

  handleCancel = () => {
    const {
      selectDrugSuccessAction,
      clearSearchField,
      setOrder,
      setSelectedOrderAction,
      orderNumber,
      currentOrderType,
    } = this.props;
    selectDrugSuccessAction('');
    this.clearDrugForms();
    clearSearchField();
    setOrder('DISCARD_ONE', orderNumber);
    setSelectedOrderAction({
      currentOrderType,
      selectedOrder: null,
      activity: null,
    });
  }
  clearDrugForms = () => {
    this.setState({
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
      previousOrder: null,
      fieldErrors: {
      },
      orderNumber: 0,
      formType: 'Standard Dosage',
      dosingType: '',
      activeTabIndex: 0,
      options: {
        dosingUnit: [],
        frequency: [],
        route: [],
        durationUnit: [],
        dispensingUnit: [],
      },
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
      if ((duration && !durationUnit) ||
        !(
          dose &&
          dosingUnit &&
          frequency &&
          route &&
          dispensingQuantity &&
          dispensingUnit
        )) {
        return true;
      }
    } else if (this.state.formType === 'Free Text' &&
      !(drugInstructions && dispensingQuantity && dispensingUnit)) {
      return true;
    }
    return false;
  }

  populateEditOrderForm = () => {
    const { editOrder, draftOrder } = this.props;
    this.setState({
      activeTabIndex: (draftOrder.dosingType || editOrder.dosingType) === 'org.openmrs.SimpleDosingInstructions' ? 0 : 1,
      action: draftOrder.action || editOrder.action,
      previousOrder: editOrder.uuid || ((draftOrder.action === 'REVISE') && draftOrder.previousOrder) || null,
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
            fields={this.state.fields}
            fieldErrors={this.state.fieldErrors}
            options={this.state.options}
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
            options={this.state.options}
            handleValidation={this.handleValidation}
            activateSaveButton={this.activateSaveButton}
            handleChange={this.handleChange}
            handleCancel={this.handleCancel}
            handleSubmit={this.handleSubmitDrugForm}
          />
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
  createOrderReducer,
  orderEntryConfigurations,
  drugSearchReducer,
  draftReducer: { draftDrugOrders },
  openmrs: { session },
  orderSelectionReducer: { activity },
  fetchOrdersReducer,
  patientReducer: { patient },
}) =>
  ({
    activity,
    drug: drugSearchReducer.selected,
    draftOrders: draftDrugOrders,
    allConfigurations: ((orderEntryConfigurations || {}).configurations || {}),
    session,
    createOrderReducer,
    fetchOrdersReducer,
    patient,
  });

AddForm.propTypes = {
  activity: PropTypes.string,
  clearSearchField: PropTypes.func.isRequired,
  currentOrderType: PropTypes.object.isRequired,
  selectDrugSuccessAction: PropTypes.func,
  setSelectedOrderAction: PropTypes.func.isRequired,
  getOrderEntryConfigurationsAction: PropTypes.func,
  addDraftOrderAction: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
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
  session: PropTypes.shape({
    currentProvider: PropTypes.shape({
      uuid: PropTypes.string,
    }),
  }).isRequired,
  createOrderReducer: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    errorMessage: PropTypes.string,
    addedOrder: PropTypes.object,
  }).isRequired,
  fetchOrdersReducer: PropTypes.shape({
    filteredOrders: PropTypes.arrayOf(PropTypes.shape({
      drug: PropTypes.shape({
        uuid: PropTypes.string,
      }),
    })),
  }).isRequired,
  fetchAllOrdersAction: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
};

AddForm.defaultProps = {
  activity: '',
  selectDrugSuccessAction: {},
  getOrderEntryConfigurationsAction: () => {},
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
    getOrderEntryConfigurationsAction: getOrderEntryConfigurations,
    selectDrugSuccessAction: selectDrugSuccess,
    addDraftOrderAction: addDraftOrder,
    setOrder: setOrderAction,
    setSelectedOrderAction: setSelectedOrder,
    fetchAllOrdersAction: fetchAllOrders,
  },
)(injectIntl(AddForm));
