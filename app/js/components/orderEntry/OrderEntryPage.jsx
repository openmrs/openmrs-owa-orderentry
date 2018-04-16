import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PatientDashboard from '../patientDashboard';
import SearchAndAddOrder from './SearchAndAddOrder';
import fetchPatientCareSetting from '../../actions/careSetting';
import imageLoader from '../../../img/loading.gif';

export class OrderEntryPage extends React.Component {
  componentDidMount() {
    this.props.fetchPatientCareSetting();
  }

  render() {
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
};

const mapStateToProps = ({
  careSettingReducer: { outpatientCareSetting, inpatientCareSetting },
}) => ({
  outpatientCareSetting,
  inpatientCareSetting,
});

const mapDispatchToProps = dispatch => ({
  fetchPatientCareSetting: () => dispatch(fetchPatientCareSetting()),
});

OrderEntryPage.propTypes = {
  fetchPatientCareSetting: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderEntryPage);
