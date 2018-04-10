import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PatientDashboard from '../patientDashboard';
import { withRouter } from 'react-router-dom';
import SearchAndAddOrder from './SearchAndAddOrder';
import { fetchInpatientCareSetting, fetchOutpatientCareSetting } from '../../actions/careSetting';

class OrderEntryPage extends React.Component {
  componentDidMount() {
    this.props.fetchInpatientCareSetting();
    this.props.fetchOutpatientCareSetting();
  }
  render() {
    return (
      <div>
        <PatientDashboard {...this.props} />
        {
          !this.props.inpatientCareSetting || !this.props.outpatientCareSetting ? <div />
            : <SearchAndAddOrder
              inpatientCareSetting={this.props.inpatientCareSetting}
              outpatientCareSetting={this.props.outpatientCareSetting}
              location={this.props.location} />
        }
      </div>
    );
  }
}

OrderEntryPage.propTypes = {
  fetchInpatientCareSetting: PropTypes.func.isRequired,
  fetchOutpatientCareSetting: PropTypes.func.isRequired,
};

const mapStateToProps = ({ careSettingReducer }) => ({
  inpatientCareSetting: careSettingReducer.inpatientCareSetting,
  outpatientCareSetting: careSettingReducer.outpatientCareSetting,
});

const mapDispatchToProps = dispatch => ({
  fetchInpatientCareSetting: () => dispatch(fetchInpatientCareSetting()),
  fetchOutpatientCareSetting: () => dispatch(fetchOutpatientCareSetting()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderEntryPage));
