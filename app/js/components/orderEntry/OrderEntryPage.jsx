import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { PatientHeader } from '@openmrs/react-components';
import Draft from '../Draft';
import fetchPatientCareSetting from '../../actions/careSetting';
import { getSettingEncounterType } from '../../actions/settingEncounterType';
import { getSettingEncounterRole } from '../../actions/settingEncounterRole';
import { getLabOrderables } from '../../actions/labOrders/settingLabOrderableAction';
import getDateFormat from '../../actions/dateFormat';
import activeOrderAction from '../../actions/activeOrderAction';
import { fetchPatientRecord, fetchPatientNote } from '../../actions/patient';
import { setSelectedOrder } from '../../actions/orderAction';
import { successToast, errorToast } from '../../utils/toast';
import { loadGlobalProperties, APP_GLOBAL_PROPERTIES } from "../../utils/globalProperty";
import fetchLabOrders from '../../actions/labOrders/fetchLabOrders';
import * as orderTypes from './orderTypes';
import {
  editDraftDrugOrder,
  toggleDraftLabOrderUrgency,
  discardTestsInDraft,
} from '../../actions/draftActions';
import imageLoader from '../../../img/loading.gif';
import createOrder from '../../actions/createOrder';
import './styles.scss';
import AllOrders from "./AllOrders";
import LabEntryForm from "../labOrderEntry/LabEntryForm";

export class OrderEntryPage extends PureComponent {
  state = {
    page: new URLSearchParams(this.props.location.search).get('page'),
    returnUrl: new URLSearchParams(this.props.location.search).get('returnUrl'),
    index: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    loadGlobalProperties(dispatch);
    const patientUuid = new URLSearchParams(this.props.location.search).get('patient');
    this.props.fetchPatientCareSetting();
    this.props.getSettingEncounterType();
    this.props.getSettingEncounterRole();
    this.props.getLabOrderables();
    this.props.getDateFormat('default');
    this.props.fetchPatientRecord(patientUuid);
    this.props.fetchPatientNote(patientUuid);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      status: { added, error },
      errorMessage,
      labOrderData,
    } = this.props.createOrderReducer;

    const { intl } = this.props;
    const orderCreatedMsg = intl.formatMessage({ id: "app.orders.create.success", defaultMessage: "Order Successfully Created" });
    if (added && labOrderData !== prevProps.createOrderReducer.labOrderData) {
      successToast(orderCreatedMsg);
      this.props.fetchLabOrders(null, this.props.patient.uuid);
    }
    if (error) {
      errorToast(errorMessage);
    }
  }

  getUUID = (items, itemName) => items.find(item => item.display === itemName);

  orderTypesAsObject = Object.values(orderTypes);

  switchTabs = (index) => {
    if (index === 0) {
      return this.switchOrderType()
    }
    return this.switchOrderType(this.orderTypesAsObject[index]);
  }

  switchOrderType = (newOrderType) => {
    if (!newOrderType) {
      return this.props.setSelectedOrder({ currentOrderType: {} });
    }
    return this.props.setSelectedOrder({ currentOrderType: newOrderType });
  };

  moreInformation = () => (
    <p>
      Please click&nbsp;
      <a
        href="https://wiki.openmrs.org/display/projects/Order+Entry+UI+Administrator+Guide"
        rel="noopener noreferrer"
        target="_blank">
        here
      </a>
      &nbsp;for more information
    </p>
  );

  formatDrugOrderData = (order) => {
    const {
      drugDispensingUnits,
      drugDosingUnits,
      drugRoutes,
      durationUnits,
      orderFrequencies,
    } = this.props.configurations;
    const {
      action,
      reason,
      careSetting,
      dose,
      dosingUnit,
      drugInstructions,
      dosingType,
      drug,
      duration,
      durationUnit,
      frequency,
      orderer,
      dispensingQuantity,
      dispensingUnit,
      route,
      type,
      previousOrder,
    } = order;

    return {
      action,
      asNeeded: reason || false,
      asNeededCondition: reason,
      autoExpireDate: null,
      orderReasonNonCoded: null,
      careSetting,
      commentToFulfiller: '',
      dose: dose || null,
      doseUnits: dosingUnit ? this.getUUID(drugDosingUnits, dosingUnit).uuid : null,
      dosingInstructions: drugInstructions || null,
      dosingType,
      drug,
      duration: duration || null,
      durationUnits: durationUnit ? this.getUUID(durationUnits, durationUnit).uuid : null,
      frequency: frequency ? this.getUUID(orderFrequencies, frequency).uuid : null,
      numRefills: 0,
      orderer,
      previousOrder,
      quantity: dispensingQuantity || null,
      quantityUnits:
      dispensingUnit ? this.getUUID(drugDispensingUnits, dispensingUnit).uuid : null,
      route: route ? this.getUUID(drugRoutes, route).uuid : null,
      type,
    };
  };

  formatLabOrderData = order => ({
    concept: order.uuid,
    careSetting: this.props.inpatientCareSetting.uuid,
    encounter: this.props.encounterType.uuid,
    orderer: this.props.sessionReducer.currentProvider.uuid,
    patient: this.props.patient.uuid,
    type: 'testorder',
    urgency: order.urgency || 'ROUTINE',
    autoExpireDate: moment().add(this.props.globalProperties[APP_GLOBAL_PROPERTIES.autoExpireTime] ? this.props.globalProperties[APP_GLOBAL_PROPERTIES.autoExpireTime] : 30, 'days'),
  });

  handleSubmit = () => {
    const { draftLabOrders, draftDrugOrders } = this.props;
    const allDraftOrders = [...draftDrugOrders, ...draftLabOrders.orders];
    const orders = allDraftOrders.map(order =>
      (order.type === 'drugorder'
        ? this.formatDrugOrderData(order)
        : this.formatLabOrderData(order)));

    const encounterPayload = {
      encounterProviders: [
        {
          encounterRole: this.props.encounterRole.uuid,
          provider: this.props.sessionReducer.currentProvider.uuid,
        },
      ],
      encounterType: this.props.encounterType.uuid,
      location: this.props.sessionReducer.sessionLocation.uuid,
      orders,
      patient: this.props.patient.uuid,
    };
    this.props.createOrder(encounterPayload);
    if (this.state.index === 1) {
      this.setState({ index: 0 });
    }
  };

  renderDraftOrder = () => {
    const { draftDrugOrders, draftLabOrders } = this.props;
    const allDraftOrders = [...draftDrugOrders, ...draftLabOrders.orders];
    return (
      <div className="draft-wrapper">
        <Draft
          handleDraftDiscard={this.props.discardTestsInDraft}
          draftOrders={allDraftOrders}
          handleSubmit={() => this.handleSubmit()}
          toggleDraftLabOrderUrgency={this.props.toggleDraftLabOrderUrgency}
          editDraftDrugOrder={this.props.editDraftDrugOrder}
          locale={this.props.sessionReducer.locale}
        />
      </div>
    );
  };

  render() {
    const query = new URLSearchParams(this.props.location.search);
    const patientUuid = !!query.get('patient');

    const {
      settingEncounterRoleReducer,
      settingEncounterTypeReducer,
      dateFormatReducer,
    } = this.props;
    const { page, returnUrl } = this.state;
    const { settingEncounterType, error } = settingEncounterTypeReducer;
    const { settingEncounterRole, roleError } = settingEncounterRoleReducer;
    const { dateFormat, error: dateError } = dateFormatReducer;

    if (!(this.props.outpatientCareSetting && this.props.inpatientCareSetting)) {
      return (
        <div className="text-align-center">
          <img src={imageLoader} alt="loader" />
        </div>
      );
    }

    if (!settingEncounterType || settingEncounterType.length === 0 || error) {
      return (
        <div className="error-notice">
          <p>
            Configuration for <strong>orderentryowa.encounterType</strong>{' '}
            {error === 'incomplete config' ? 'is incomplete' : 'does not exist'}. Please contact
            your administrator for more information.
          </p>
          <p>
            As an Administrator,&nbsp;
            {error === 'incomplete config' ? (
              <span>
                please ensure that you have created a valid
                <strong> encounter type </strong>.
              </span>
            ) : (
              <span>
                ensure that you have created a setting called
                <strong> orderentryowa.encounterType</strong>
                &nbsp; with a value corresponding to a valid encounter type. e.g{' '}
                <em>order entry</em>
              </span>
            )}
            {this.moreInformation()}
          </p>
        </div>
      );
    }

    if (!settingEncounterRole || settingEncounterRole.length === 0 || roleError) {
      return (
        <div className="error-notice">
          <p>
            Configuration for
            <strong> orderentryowa.encounterRole </strong>{' '}
            {roleError === 'incomplete config' ? 'is incomplete' : 'does not exist'}. Please contact
            your administrator for more information.
          </p>
          <p>
            As an Administrator,&nbsp;
            {roleError === 'incomplete config' ? (
              <span>
                please ensure that you have created a valid
                <strong> encounter role </strong>.
              </span>
            ) : (
              <span>
                ensure that you have created a setting called
                <strong> orderentryowa.encounterRole</strong>
                &nbsp; with a value corresponding to the encounter role above. e.g{' '}
                <em>Clinician</em>
              </span>
            )}
            {this.moreInformation()}
          </p>
        </div>
      );
    }

    if (dateFormat === null || dateError) {
      return (
        <div className="error-notice">
          <p>
            Configuration for <strong>orderentryowa.dateAndTimeFormat</strong> is incomplete.
          </p>
          <p>
            As an Administrator,&nbsp;
            <span>
              please ensure that you have created a valid <strong>date and time format</strong>,
              with a corresponding value, for example: <strong>DD-MMM-YYYY HH:mm</strong>.
            </span>
          </p>
        </div>
      );
    }

    return (
      <div className="order-entry-page">
        {this.props.patient ? (
          <div>
            <PatientHeader
              patient={this.props.patient}
              note={this.props.note}
              location={this.props.location}
            />
            <Tabs
              selectedIndex={this.state.index} onSelect={ (i) => {
                this.switchTabs(i); this.setState({ index: i });
              }
              }>
              <TabList>
                <Tab><FormattedMessage id="app.orders.list" defaultMessage="Orders List" description="Orders List" /></Tab>
                <Tab><FormattedMessage id="app.orders.labs.add" defaultMessage="Add Lab Orders" description="Add Lab Orders" /></Tab>
              </TabList>
              <TabPanel>
                <RenderOrderType
                  backLink={returnUrl}
                  currentOrderTypeID={this.props.currentOrderType.id}
                  {...this.props}
                />
              </TabPanel>
              <TabPanel className="tabpanel">
                <div className="tabpanel-order">
                  <LabEntryForm backLink={returnUrl} />
                </div>
                <div className="tabpanel-current">{this.props.currentOrderType.id && this.renderDraftOrder()}</div>
              </TabPanel>
            </Tabs>
          </div>
        ) : (
          <div className="error-notice">
            {`A valid patient uuid is required to view this page,
              please navigate to this page from the Clinician facing dashboard page 
              or append a valid patient id "?patient=patient_uuid" to your url.`}
            <p>
              Please click&nbsp;
              <a
                href="https://wiki.openmrs.org/display/projects/Order+Entry+UI+End+User+Guide"
                rel="noopener noreferrer"
                target="_blank">
                here
              </a>
              &nbsp;for more information
            </p>
          </div>
        )}
      </div>
    );
  }
}

OrderEntryPage.propTypes = {
  editDraftDrugOrder: PropTypes.func.isRequired,
  fetchPatientCareSetting: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  configurations: PropTypes.shape({
    drugDispensingUnits: PropTypes.arrayOf(PropTypes.any),
    drugDosingUnits: PropTypes.arrayOf(PropTypes.any),
    drugRoutes: PropTypes.arrayOf(PropTypes.any),
    durationUnits: PropTypes.arrayOf(PropTypes.any),
    orderFrequencies: PropTypes.arrayOf(PropTypes.any),
  }),
  sessionReducer: PropTypes.shape({
    currentProvider: PropTypes.shape({
      uuid: PropTypes.string,
    }),
    sessionLocation: PropTypes.shape({}),
  }).isRequired,
  outpatientCareSetting: PropTypes.shape({
    uuid: PropTypes.string,
    display: PropTypes.string,
  }),
  inpatientCareSetting: PropTypes.shape({
    uuid: PropTypes.string,
    display: PropTypes.string,
  }),
  labOrderableReducer: PropTypes.shape({
    orderables: PropTypes.arrayOf(PropTypes.object),
  }),
  settingEncounterTypeReducer: PropTypes.shape({
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    settingEncounterType: PropTypes.string,
  }),
  settingEncounterRoleReducer: PropTypes.shape({
    roleError: PropTypes.string,
    isLoading: PropTypes.bool,
    settingEncounterRole: PropTypes.string,
  }),
  dateFormatReducer: PropTypes.shape({
    dateFormat: PropTypes.string,
    error: PropTypes.string,
  }),
  encounterType: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  encounterRole: PropTypes.shape({
    uuid: PropTypes.string,
  }),
  conceptsAsPanels: PropTypes.array,
  standAloneTests: PropTypes.array,
  session: PropTypes.shape({
    currentProvider: PropTypes.shape({
      person: PropTypes.shape({
        uuid: PropTypes.string,
      }),
      uuid: PropTypes.string,
    }),
    currentLocation: PropTypes.object,
  }),
  note: PropTypes.arrayOf(PropTypes.any).isRequired,
  getSettingEncounterType: PropTypes.func.isRequired,
  getSettingEncounterRole: PropTypes.func.isRequired,
  getDateFormat: PropTypes.func.isRequired,
  getLabOrderables: PropTypes.func.isRequired,
  fetchPatientRecord: PropTypes.func.isRequired,
  fetchPatientNote: PropTypes.func.isRequired,
  setSelectedOrder: PropTypes.func.isRequired,
  currentOrderType: PropTypes.object,
  draftLabOrders: PropTypes.object.isRequired,
  draftDrugOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
  toggleDraftLabOrderUrgency: PropTypes.func.isRequired,
  discardTestsInDraft: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  createOrderReducer: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    errorMessage: PropTypes.string,
    labOrderData: PropTypes.object,
  }).isRequired,
  fetchLabOrders: PropTypes.func.isRequired,
  patient: PropTypes.shape({}),
};

OrderEntryPage.defaultProps = {
  configurations: {},
  outpatientCareSetting: null,
  labOrderableReducer: {
    error: false,
    orderables: [],
  },
  settingEncounterRoleReducer: null,
  settingEncounterTypeReducer: null,
  dateFormatReducer: null,
  currentOrderType: {},
  encounterRole: {
    uuid: '',
  },
  patient: null,
  inpatientCareSetting: {
    uuid: '',
  },
  conceptsAsPanels: [],
  standAloneTests: [],
  session: {
    currentProvider: {
      person: {
        uuid: '',
      },
    },
  },
};

const mapStateToProps = ({
  orderEntryConfigurations: { configurations },
  careSettingReducer: { outpatientCareSetting, inpatientCareSetting },
  settingEncounterTypeReducer,
  settingEncounterRoleReducer,
  dateFormatReducer,
  patientReducer: { patient },
  noteReducer: { note },
  orderSelectionReducer: { currentOrderType },
  draftReducer: { draftDrugOrders, draftLabOrders },
  encounterRoleReducer: { encounterRole },
  encounterReducer: { encounterType },
  openmrs: { session },
  openmrs: { metadata },
  createOrderReducer,
  labOrderableReducer,
}) => ({
  outpatientCareSetting,
  dateFormatReducer,
  inpatientCareSetting,
  settingEncounterTypeReducer,
  currentOrderType,
  draftDrugOrders,
  draftLabOrders,
  encounterType,
  encounterRole,
  sessionReducer: session,
  globalProperties: metadata.globalProperties,
  configurations,
  labOrderableReducer,
  createOrderReducer,
});

const actionCreators = {
  fetchPatientCareSetting,
  getSettingEncounterType,
  getSettingEncounterRole,
  getLabOrderables,
  getDateFormat,
  fetchPatientRecord,
  fetchPatientNote,
  setSelectedOrder,
  activeOrderAction,
  toggleDraftLabOrderUrgency,
  editDraftDrugOrder,
  discardTestsInDraft,
  createOrder,
  settingEncounterRoleReducer,
  patient,
  note,
  fetchLabOrders,
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(OrderEntryPage));
