import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import View from './View';
import BreadCrumb from '../breadCrumb';
import { fetchPatientRecord, fetchPatientNote } from '../../actions/patient';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContactInfo: false,
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const patientUuid = query.get('patient');
    this.props.fetchPatientRecord(patientUuid);
    this.props.fetchPatientNote(patientUuid);
  }

  toggleDetailsView = () => {
    this.setState(() => ({
      showContactInfo: !this.state.showContactInfo,
    }));
  }

  render() {
    return (
      <div>
        <BreadCrumb
          name={`${this.props.patient.person.personName.familyName}. ${this.props.patient.person.personName.givenName}`}
          patientId={this.props.patient.patientId}
        />
        <View
          patient={this.props.patient}
          toggleDetailsView={this.toggleDetailsView}
          showContactInfo={this.state.showContactInfo}
          note={this.props.note}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patient: state.patientReducer.patient,
  note: state.noteReducer.note,
});

const actionCreators = {
  fetchPatientRecord,
  fetchPatientNote,
};

Dashboard.propTypes = {
  fetchPatientNote: PropTypes.func.isRequired,
  fetchPatientRecord: PropTypes.func.isRequired,
  location: PropTypes.shape().isRequired,
  note: PropTypes.array,
  patient: PropTypes.shape().isRequired,
};

Dashboard.defaultProps = {
  note: [],
};

export default connect(mapStateToProps, actionCreators)(Dashboard);
