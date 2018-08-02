import React from 'react';
import PropTypes from 'prop-types';
import '../../../css/grid.scss';


const formatPanelName = (panelName) => {
  const name = panelName;
  return name.replace(/panel/i, '').trim();
};

const LabPanelFieldSet = ({ selectedPanelIds, handleTestSelection, panels }) => (
  <fieldset className="fieldset">
    <legend>Panels</legend>
    <div className="panel-box">
      {
        panels.map(panel => (
          <button
            id="panel-button"
            className={(selectedPanelIds.includes(panel.uuid)) ? 'active lab-tests-btn' : 'lab-tests-btn'}
            type="button"
            key={`${panel.uuid}`}
            onClick={() => handleTestSelection(panel, 'panel')}
          >
            {formatPanelName(panel.display.toLowerCase())}
          </button>
        ))
      }
    </div>
  </fieldset>
);

LabPanelFieldSet.defaultProps = {
  selectedPanelIds: [],
};

LabPanelFieldSet.propTypes = {
  handleTestSelection: PropTypes.func.isRequired,
  panels: PropTypes.array.isRequired,
  selectedPanelIds: PropTypes.array,
};

export default LabPanelFieldSet;
