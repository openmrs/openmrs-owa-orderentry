import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PatientDashboard from '../patientDashboard';
import SearchAndAddOrder from './SearchAndAddOrder';
import fetchPatientCareSetting from '../../actions/careSetting';
import { getSettingEncounterType } from '../../actions/settingEncounterType';
import { getSettingEncounterRole } from '../../actions/settingEncounterRole';
import imageLoader from '../../../img/loading.gif';

export class OrderEntryPage extends React.Component {
  componentDidMount() {
    this.props.fetchPatientCareSetting();
    this.props.getSettingEncounterType();
    this.props.getSettingEncounterRole();
  }

  render() {
    const { settingEncounterRoleReducer, settingEncounterTypeReducer } = this.props;
    const { settingEncounterType, error } = settingEncounterTypeReducer;
    const { settingEncounterRole, roleError } = settingEncounterRoleReducer;

    if (!(this.props.outpatientCareSetting && this.props.inpatientCareSetting)) {
      return (
        <div className="text-align-center">
          <img src={imageLoader} alt="loader" />
        </div>
      );
    }
    if (settingEncounterType.length === 0 && error) {
      return (
        <div className="error-notice">
          <p>
            Setting for <strong>order.encounterType</strong> does not exist.
            Please contact your administrator to create one for you.
          </p>
          <p>
            As an Administrator, if you have already configured this setting, please check
            if its name corresponds to <strong>order.encounterType</strong>
          </p>
        </div>
      );
    }

    if (settingEncounterRole.length === 0 && roleError) {
      return (
        <div className="error-notice">
          <p>
            Setting for <strong>order.encounterRole</strong> does not exist.
            Please contact your administrator to create one for you.
          </p>
          <p>
            As an Administrator, if you have already configured this setting, please check
            if its name corresponds to <strong>order.encounterRole</strong>
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
      </div>
    );
  }
}

OrderEntryPage.propTypes = {
  fetchPatientCareSetting: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  outpatientCareSetting: PropTypes.shape({}).isRequired,
  settingEncounterTypeReducer: PropTypes.shape({
    error: '',
    isLoading: '',
    settingEncounterType: {},
  }).isRequired,
  settingEncounterRoleReducer: PropTypes.shape({
    roleError: '',
    isLoading: '',
    settingEncounterRole: {},
  }).isRequired,
  getSettingEncounterType: PropTypes.func.isRequired,
  getSettingEncounterRole: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  careSettingReducer: { outpatientCareSetting, inpatientCareSetting },
  settingEncounterTypeReducer,
  settingEncounterRoleReducer,
}) => ({
  outpatientCareSetting,
  inpatientCareSetting,
  settingEncounterTypeReducer,
  settingEncounterRoleReducer,
});

const mapDispatchToProps = dispatch => ({
  fetchPatientCareSetting: () => dispatch(fetchPatientCareSetting()),
  getSettingEncounterType: () => dispatch(getSettingEncounterType()),
  getSettingEncounterRole: () => dispatch(getSettingEncounterRole()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderEntryPage);
