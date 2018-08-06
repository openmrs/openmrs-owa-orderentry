import React from 'react';
import PropTypes from 'prop-types';
import { panelData } from './labData';
import '../../../css/grid.scss';

const LabPanelFieldSet = ({ selectedPanelIds, handleTestSelection }) => (
  <fieldset className="fieldset">
    <legend>Panels</legend>
    {panelData.map(panel => (
      <button
        id="panel-button"
        className={selectedPanelIds.includes(panel.id) ? 'active lab-tests-btn' : 'lab-tests-btn'}
        type="button"
        key={`${panel.id}`}
        onClick={() => handleTestSelection(panel, 'panel')}>
        {panel.name}
      </button>
    ))}
  </fieldset>
);

LabPanelFieldSet.defaultProps = {
  selectedPanelIds: [],
};

LabPanelFieldSet.propTypes = {
  handleTestSelection: PropTypes.func.isRequired,
  selectedPanelIds: PropTypes.array,
};

export default LabPanelFieldSet;
