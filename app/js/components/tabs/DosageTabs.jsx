import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DosageTab from '../tabs/DosageTab';

class DosageTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dosingDetails: { tabName: 'Standard', dosingType: 'org.openmrs.SimpleDosingInstructions' },
    };
  }
  changeTab = (event) => {
    this.setState({ dosingDetails: { tabName: event.tabName, dosingType: event.dosingType } });
  }
  render() {
    const {
      fields,
      allConfigurations,
      handleChange,
      handleSubmit,
      careSetting,
    } = this.props;
    return (
      <div className="DosageTabs">
        <div>
          Instructions:&nbsp;
          <a
            role="presentation"
            className="dosageForm"
            onClick={event => this.changeTab({ tabName: 'Standard', dosingType: 'org.openmrs.SimpleDosingInstructions' })}>
            <span className="icon-th-large" />Standard Dosage
          </a>&nbsp;&nbsp;
          <a
            role="presentation"
            className="dosageForm"
            onClick={event => this.changeTab({ tabName: 'FreeText', dosingType: 'org.openmrs.FreeTextDosingInstructions' })}>
            <span className="icon-edit" />Free Text
          </a>
        </div>
        <DosageTab
          dosingDetails={this.state.dosingDetails}
          careSetting={careSetting}
          fields={fields}
          allConfigurations={allConfigurations}
          handleChange={handleChange}
          handleSubmit={handleSubmit} />
      </div>
    );
  }
}

DosageTabs.propTypes = {
  fields: PropTypes.object.isRequired,
  allConfigurations: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  careSetting: PropTypes.object.isRequired,
};

export default DosageTabs;
