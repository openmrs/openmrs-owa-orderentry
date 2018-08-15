import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { PatientHeader } from '@openmrs/react-components';
import RenderOrderType from './RenderOrderType';
import SelectOrderType from './SelectOrderType';
import * as orderTypes from './orderTypes';
import LabDraftOrder from '../labOrderEntry/LabDraftOrder';
import fetchPatientCareSetting from '../../actions/careSetting';
import { getSettingEncounterType } from '../../actions/settingEncounterType';
import { getSettingEncounterRole } from '../../actions/settingEncounterRole';
import { getLabOrderables } from "../../actions/labOrders/settingLabOrderableAction";
import { getDateFormat } from '../../actions/dateFormat';
import { fetchPatientRecord, fetchPatientNote } from '../../actions/patient';
import {
  removeTestPanelFromDraft,
  removeTestFromDraft,
  deleteDraftLabOrder,
  toggleDraftLabOrdersUgency,
} from '../../actions/draftLabOrderAction';
import imageLoader from '../../../img/loading.gif';
import './styles.scss';

export class OrderEntryPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentOrderType: Object.values(orderTypes)[0],
    };
  }
  componentDidMount() {
    const patientUuid = new URLSearchParams(this.props.location.search).get('patient');

    this.props.fetchPatientCareSetting();
    this.props.getSettingEncounterType();
    this.props.getSettingEncounterRole();
    this.props.getLabOrderables();
    this.props.getDateFormat('default');
    this.props.fetchPatientRecord(patientUuid);
    this.props.fetchPatientNote(patientUuid);
  }

  moreInformation = () => (
    <p>Please click&nbsp;
      <a
        href="https://wiki.openmrs.org/display/projects/Order+Entry+UI+Administrator+Guide"
        rel="noopener noreferrer"
        target="_blank"
      >here
      </a>
      &nbsp;for more information
    </p>
  )

  switchOrderType = (newOrderType) => {
    const { id } = this.state.currentOrderType;
    if (id === newOrderType.id) return;
    this.setState({ currentOrderType: newOrderType });
  }

  handleUrgencyChange = (order) => {
    this.props.toggleDraftLabOrdersUgency(order);
  }

  discardTestsInDraft = (test, action) => {
    if (action === 'single') return this.props.removeTestFromDraft(test);
    if (action === 'panel') return this.props.removeTestPanelFromDraft(test);
    return this.props.deleteDraftLabOrder();
  }

  renderLabDraftOrder = () => (
    <div className="draft-wrapper">
      <LabDraftOrder
        toggleDraftLabOrdersUgency={this.handleUrgencyChange}
        handleDraftDiscard={this.discardTestsInDraft}
        draftLabOrders={this.props.draftLabOrders}
        handleSubmit={() => {}}
      />
    </div>
  );

  render() {
    const query = new URLSearchParams(this.props.location.search);
    const patientUuid = !!query.get('patient');

    const {
      settingEncounterRoleReducer,
      settingEncounterTypeReducer,
      dateFormatReducer,
    } = this.props;
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
            Configuration for <strong>orderentryowa.encounterType</strong> {error === 'incomplete config' ? 'is incomplete' : 'does not exist'}.
            Please contact your administrator for more information.
          </p>
          <p>
            As an Administrator,&nbsp;
            {
              error === 'incomplete config' ?
                <span>
                  please ensure that you have created a valid<strong> encounter type </strong>.
                </span> :
                <span>
                  ensure that you have created a setting called
                  <strong> orderentryowa.encounterType</strong>
                  &nbsp;
                  with a value corresponding to a valid encounter type. e.g <em>order entry</em>
                </span>
            }
            {this.moreInformation()}
          </p>
        </div>
      );
    }

    if (!settingEncounterRole || settingEncounterRole.length === 0 || roleError) {
      return (
        <div className="error-notice">
          <p>
            Configuration for<strong> orderentryowa.encounterRole </strong> {roleError === 'incomplete config' ? 'is incomplete' : 'does not exist'}.
            Please contact your administrator for more information.
          </p>
          <p>
            As an Administrator,&nbsp;
            {
              roleError === 'incomplete config' ?
                <span>
                  please ensure that you have created a valid<strong> encounter role </strong>.
                </span> :
                <span>
                  ensure that you have created a setting called
                  <strong> orderentryowa.encounterRole</strong>
                  &nbsp;
                  with a value corresponding to the encounter role above. e.g <em>Clinician</em>
                </span>
            }
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
        {
          patientUuid ?
            <div>
              <PatientHeader
                patient={this.props.patient}
                note={this.props.note}
              />
              <SelectOrderType
                switchOrderType={this.switchOrderType}
                currentOrderType={this.state.currentOrderType}
              />
              <div className="body-wrapper drug-order-entry">
                <RenderOrderType
                  currentOrderTypeID={this.state.currentOrderType.id}
                  {...this.props}
                />
                {this.renderLabDraftOrder()}
              </div>
            </div> :
            <div className="error-notice">
              {`A valid patient uuid is required to view this page,
              please navigate to this page from the Clinician facing dashboard page
              or append a valid patient id "?patient=patient_uuid" to your url.`}
              <p>Please click&nbsp;
                <a
                  href="https://wiki.openmrs.org/display/projects/Order+Entry+UI+End+User+Guide"
                  rel="noopener noreferrer"
                  target="_blank"
                >here
                </a>
                &nbsp;for more information
              </p>
            </div>
        }
      </div>
    );
  }
}

OrderEntryPage.propTypes = {
  fetchPatientCareSetting: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  outpatientCareSetting: PropTypes.shape({
    uuid: PropTypes.string,
    display: PropTypes.string,
  }),
  inpatientCareSetting: PropTypes.shape({
    uuid: PropTypes.string,
    display: PropTypes.string,
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
  patient: PropTypes.shape({}).isRequired,
  note: PropTypes.arrayOf(PropTypes.any).isRequired,
  getSettingEncounterType: PropTypes.func.isRequired,
  getSettingEncounterRole: PropTypes.func.isRequired,
  getDateFormat: PropTypes.func.isRequired,
  getLabOrderables: PropTypes.func.isRequired,
  fetchPatientRecord: PropTypes.func.isRequired,
  fetchPatientNote: PropTypes.func.isRequired,
  draftLabOrders: PropTypes.array.isRequired,
  toggleDraftLabOrdersUgency: PropTypes.func.isRequired,
  removeTestFromDraft: PropTypes.func.isRequired,
  removeTestPanelFromDraft: PropTypes.func.isRequired,
  deleteDraftLabOrder: PropTypes.func.isRequired,
};

OrderEntryPage.defaultProps = {
  inpatientCareSetting: null,
  outpatientCareSetting: null,
  settingEncounterRoleReducer: null,
  settingEncounterTypeReducer: null,
  dateFormatReducer: null,
};

const mapStateToProps = ({
  careSettingReducer: { outpatientCareSetting, inpatientCareSetting },
  settingEncounterTypeReducer,
  settingEncounterRoleReducer,
  dateFormatReducer,
  patientReducer: { patient },
  noteReducer: { note },
  draftLabOrderReducer: {
    draftLabOrders,
  },
}) => ({
  outpatientCareSetting,
  dateFormatReducer,
  inpatientCareSetting,
  settingEncounterTypeReducer,
  settingEncounterRoleReducer,
  patient,
  note,
  draftLabOrders,
});

const actionCreators = {
  fetchPatientCareSetting,
  getSettingEncounterType,
  getSettingEncounterRole,
  getLabOrderables,
  getDateFormat,
  fetchPatientRecord,
  fetchPatientNote,
  toggleDraftLabOrdersUgency,
  removeTestFromDraft,
  removeTestPanelFromDraft,
  deleteDraftLabOrder,
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderEntryPage);
