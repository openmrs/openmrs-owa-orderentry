import React from 'react';
import PropTypes from 'prop-types';
import FreeText from '../orderEntry/addForm/FreeText';
import StandardDose from '../orderEntry/addForm/StandardDose';

const DosageTab = ({
  dosingDetails,
  fields,
  allConfigurations,
  handleChange,
  handleSubmit,
  careSetting,
}) => (
  dosingDetails.tabName === 'Standard' ?
    <div id="Standard">
      <StandardDose />
      <br />
    </div>
    :
    <div id="FreeText">
      <FreeText
        careSetting={careSetting}
        fields={fields}
        allConfigurations={allConfigurations}
        handleChange={handleChange}
        handleSubmit={handleSubmit} />
      <br />
    </div>
);

DosageTab.propTypes = {
  fields: PropTypes.object.isRequired,
  allConfigurations: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  careSetting: PropTypes.object.isRequired,
  dosingDetails: PropTypes.object.isRequired,
};

export default DosageTab;
