import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PatientDashboard from '../patientDashboard';
import fetchPatientCareSetting from '../../actions/careSetting';
import SearchAndAddOrder from './SearchAndAddOrder';
import ActiveOrders from './ActiveOrders';
import imageLoder from '../../../img/loading.gif';

export class OrderEntryPage extends React.Component {
  componentDidMount() {
    this.props.fetchPatientCareSetting();
  }

  render() {
    if (!(this.props.outpatientCareSetting || this.props.inpatientCareSetting)) {
      return (
        <div
          style={{ textAlign: "center" }}>
          <img src={imageLoder} alt="loader" />
        </div>
      );
    }

    return (
      <div>
        <div />
        <PatientDashboard {...this.props} />
        <SearchAndAddOrder />
        <ActiveOrders />
      </div>
    );
  }
}

const mapStateToProps = ({ careSettingReducer }) => ({
  outpatientCareSetting: careSettingReducer.outpatientCareSetting,
  inpatientCareSetting: careSettingReducer.inpatientCareSetting,
});

const mapDispatchToProps = dispatch => ({
  fetchPatientCareSetting: () => dispatch(fetchPatientCareSetting()),
});

OrderEntryPage.propTypes = {
  fetchPatientCareSetting: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderEntryPage);
