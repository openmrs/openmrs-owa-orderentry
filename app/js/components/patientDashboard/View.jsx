import React from 'react';
import dateFns, { distanceInWordsToNow } from 'date-fns';
import PropTypes from 'prop-types';

import '../../../css/patient.css';

const View = props => (
  <div className="patient-header ">
    <div className="demographics">
      <h1 className="name">
        <span>
          <span className="PersonName-givenName">{props.patient.person.personName.givenName}&nbsp;&nbsp;</span>
          <em>Given</em>
        </span>

        <span>
          <span className="PersonName-middleName">{props.patient.person.personName.middleName}&nbsp;&nbsp;</span>
          <em>Middle</em>
        </span>

        <span>
          <span className="PersonName-familyName">{props.patient.person.personName.familyName}</span>
          <em>Family Name</em>
        </span>

        &nbsp;
        <span className="gender-age">
          <span>{props.patient.person.gender === 'M' ? "Male" : "Female"}&nbsp;</span>
          <span>
            {props.patient.person.age} year(s) ({dateFns.format(new Date(props.patient.person.birthdate), 'DD[.]MMM[.]YYYY')})
          </span>
          <span id="edit-patient-demographics" className="edit-info">
            <small>
              <a href="../../registrationapp/editSection.page?patientId=107&sectionId=demographics&appId=referenceapplication.registrationapp.registerPatient">Edit</a>
            </small>
          </span>
          <a
            role="button"
            tabIndex="0"
            onClick={() => { props.toggleDetailsView(); }}
            id="patient-header-contactInfo" className="contact-info-label expanded"
          >
            {props.showContactInfo ?
              <span>Hide Contact Info <i className="toggle-icon icon-caret-up small" /></span> :
              <span>Show contact info <i className="toggle-icon icon-caret-up small rotate180" /></span>
            }
          </a>
        </span>

        <div className="firstLineFragments" />

        {props.showContactInfo && props.patient.attributes &&
          <div className="" id="contactInfoContent">
            <div className="contact-info-inline">
              <span>
                {props.patient.person.preferredAddress.display}
                <em>Address</em>
              </span>
              <span className="left-margin">
                <span id="coreapps-telephoneNumber">
                  {props.patient.attributes[0].value}
                </span>
                <em>Telephone Number</em>
              </span>
              &nbsp;&nbsp;
              <small id="contact-info-inline-edit" className="edit-info">
                <a href="../../registrationapp/editSection.page?patientId=107&sectionId=contactInfo&appId=referenceapplication.registrationapp.registerPatient">Edit</a>
              </small>
            </div>
          </div>
        }
      </h1>
    </div>

    <div className="identifiers">
      <em>Patient ID</em>
      <span>{props.patient.patientIdentifier.identifier}</span>
      <br />
    </div>

    {props.note.length > 0 &&
      <div className="secondLineFragments">
        <div className="clickToEditObs ng-scope">
          <div className="firstLine">
            <span className="note-wrapper">
              <span>
                <pre className="preformatted-note">{props.note[0].value}</pre>
              </span>
            </span>
          </div>
          <div className="details secondLine">
            <span className="created-by">{props.note[0].auditInfo.creator.display}
            </span>&nbsp;
            <span className="created-date">
              {distanceInWordsToNow(props.note[0].auditInfo.dateCreated, {
                includeSeconds: true, addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>
    }
  </div>
);

View.propTypes = {
  note: PropTypes.array,
  patient: PropTypes.shape().isRequired,
  showContactInfo: PropTypes.bool.isRequired,
  toggleDetailsView: PropTypes.func.isRequired,
};

View.defaultProps = {
  note: [],
};

export default View;
