import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PatientDashboard from '../patientDashboard';
import SearchAndAddOrder from './SearchAndAddOrder';
import fetchPatientCareSetting from '../../actions/careSetting';
import { getSettingEncounterType } from '../../actions/settingEncounterType';
import { getSettingEncounterRole } from '../../actions/settingEncounterRole';
import { getDateFormat } from '../../actions/dateFormat';
import imageLoader from '../../../img/loading.gif';

export class OrderEntryPage extends React.Component {
  componentDidMount() {
    this.props.fetchPatientCareSetting();
    this.props.getSettingEncounterType();
    this.props.getSettingEncounterRole();
    this.props.getDateFormat('default');
  }

  render() {
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

    if (settingEncounterType.length === 0 || error) {
      return (
        <div className="error-notice">
          <p>
            Configuration for <strong>order.encounterType</strong> {error === 'incomplete config' ? 'is incomplete' : 'does not exist'}.
            Please contact your administrator for more information.
          </p>
          <p>
            As an Administrator,&nbsp;
            {
              error === 'incomplete config' ?
                <span>
                  please ensure that you have created a valid <strong>encounter type</strong>.
                </span> :
                <span>
                  ensure that you have created a setting called<strong>order.encounterType</strong>
                  &nbsp;
                  with a value corresponding to a valid encounter type.
                </span>
            }
          </p>
        </div>
      );
    }

    if (settingEncounterRole.length === 0 || roleError) {
      return (
        <div className="error-notice">
          <p>
            Configuration for <strong>order.encounterRole</strong> {roleError === 'incomplete config' ? 'is incomplete' : 'does not exist'}.
            Please contact your administrator for more information.
          </p>
          <p>
            As an Administrator,&nbsp;
            {
              roleError === 'incomplete config' ?
                <span>
                  please ensure that you have created a valid <strong>encounter role</strong>.
                </span> :
                <span>
                  ensure that you have created a setting called<strong>order.encounterRole</strong>
                  &nbsp;
                  with a value corresponding to the encounter type above.
                </span>
            }
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
        <PatientDashboard {...this.props} />
        <SearchAndAddOrder
          outpatientCareSetting={this.props.outpatientCareSetting}
          inpatientCareSetting={this.props.inpatientCareSetting}
          location={this.props.location}
        />
      </div >
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
};

export default connect(mapStateToProps, actionCreators)(OrderEntryPage);
