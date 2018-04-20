import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PatientDashboard from '../patientDashboard';
import SearchAndAddOrder from './SearchAndAddOrder';
import fetchPatientCareSetting from '../../actions/careSetting';
import { getSettingEncounterType } from '../../actions/settingEncounterType';
import imageLoader from '../../../img/loading.gif';

export class OrderEntryPage extends React.Component {
  componentDidMount() {
    this.props.fetchPatientCareSetting();
    this.props.getSettingEncounterType;
  }

  render() {
    const { settingEncounterType, error } = this.props.settingEncounterTypeReducer;

    if (!(this.props.outpatientCareSetting && this.props.inpatientCareSetting)) {
      return (
        <div className="text-align-center">
          <img src={imageLoader} alt="loader" />
        </div>
      );
    }

    return (
      <div>
        <div />
        <PatientDashboard {...this.props} />
        { settingEncounterType.length > 0 && error === '' ?
          <SearchAndAddOrder
            outpatientCareSetting={this.props.outpatientCareSetting}
            inpatientCareSetting={this.props.inpatientCareSetting}
            location={this.props.location}
          /> :

          <div>
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
          </div>
        }
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
  getSettingEncounterType: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  careSettingReducer: { outpatientCareSetting, inpatientCareSetting },
  settingEncounterTypeReducer,
}) => ({
  outpatientCareSetting,
  inpatientCareSetting,
  settingEncounterTypeReducer,
});

const mapDispatchToProps = dispatch => ({
  fetchPatientCareSetting: () => dispatch(fetchPatientCareSetting()),
  getSettingEncounterType: dispatch(getSettingEncounterType()),
});

OrderEntryPage.propTypes = {
  fetchPatientCareSetting: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderEntryPage);
