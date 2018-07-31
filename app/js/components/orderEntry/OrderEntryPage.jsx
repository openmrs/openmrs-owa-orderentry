import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PatientDashboard from '../patientDashboard';
import RenderOrderType from './RenderOrderType';
import SelectOrderType from './SelectOrderType';
import * as orderTypes from './orderTypes';
import fetchPatientCareSetting from '../../actions/careSetting';
import { getSettingEncounterType } from '../../actions/settingEncounterType';
import { getSettingEncounterRole } from '../../actions/settingEncounterRole';
import { getLabOrderable } from '../../actions/labOrders/labOrderableAction';
import { getDateFormat } from '../../actions/dateFormat';
import imageLoader from '../../../img/loading.gif';

export class OrderEntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrderType: Object.values(orderTypes)[0],
    };
  }
  componentDidMount() {
    this.props.fetchPatientCareSetting();
    this.props.getSettingEncounterType();
    this.props.getSettingEncounterRole();
    this.props.getDateFormat('default');
    this.props.getLabOrderable();
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
    this.setState({ currentOrderType: newOrderType });
  }

  render() {
    const query = new URLSearchParams(this.props.location.search);
    const patientUuid = query.get('patient');

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
      <div>
        {
          patientUuid ?
            <div>
              <PatientDashboard
                {...this.props}
                currentOrderTypeText={this.state.currentOrderType.text}
              />
              <SelectOrderType
                switchOrderType={this.switchOrderType}
                currentOrderType={this.state.currentOrderType}
              />
              <RenderOrderType
                currentOrderTypeID={this.state.currentOrderType.id}
                {...this.props}
              />
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
  getSettingEncounterType: PropTypes.func.isRequired,
  getSettingEncounterRole: PropTypes.func.isRequired,
  getDateFormat: PropTypes.func.isRequired,
  getLabOrderable: PropTypes.func.isRequired,
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
}) => ({
  outpatientCareSetting,
  dateFormatReducer,
  inpatientCareSetting,
  settingEncounterTypeReducer,
  settingEncounterRoleReducer,
});

const actionCreators = {
  fetchPatientCareSetting,
  getSettingEncounterType,
  getSettingEncounterRole,
  getDateFormat,
  getLabOrderable,
};

export default connect(mapStateToProps, actionCreators)(OrderEntryPage);
