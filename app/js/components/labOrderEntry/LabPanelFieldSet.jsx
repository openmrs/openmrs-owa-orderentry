import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ToolTip } from '@openmrs/react-components';
import '../../../css/grid.scss';

const formatPanelName = (panelName) => {
  const name = panelName;
  return name.replace(/panel/i, '').trim();
};

const formatToolTipData = (setMembers) => {
  const testArray = [];
  setMembers.map(test => testArray.push(test.display));
  return testArray;
};

const LabPanelFieldSet = (props) => {
  const {
    selectedPanelIds, handleTestSelection, panels, labCategoryName,
  } = props;
  return (
    <fieldset className="fieldset">
      <legend>Panels</legend>
      <div className="panel-box">
        {
          panels.length ?
            panels.map(panel => (
              <button
                id="panel-button"
                className={classNames('lab-tests-btn tooltip', {
                  active: selectedPanelIds.includes(panel.uuid),
                })}
                type="button"
                key={`${panel.uuid}`}
                onClick={() => handleTestSelection(panel, 'panel')}
              >
                {formatPanelName(panel.display.toLowerCase())}
                <ToolTip
                  toolTipHeader="Tests included in this panel:"
                  toolTipBody={formatToolTipData(panel.setMembers)} />
              </button>
            )) : <p>{labCategoryName} has no panels</p>
        }
      </div>
    </fieldset>
  );
};

LabPanelFieldSet.defaultProps = {
  selectedPanelIds: [],
};

LabPanelFieldSet.propTypes = {
  handleTestSelection: PropTypes.func.isRequired,
  labCategoryName: PropTypes.string.isRequired,
  panels: PropTypes.array.isRequired,
  selectedPanelIds: PropTypes.array,
};

export default LabPanelFieldSet;
