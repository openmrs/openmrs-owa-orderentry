import React from 'react';
import PropTypes from 'prop-types';
import { panelData } from './labData';
import '../../../css/grid.scss';

class LabPanelFieldSet extends React.Component {
  render() {
    const { selectedPanelIds } = this.props;
    return (
      <fieldset className="fieldset">
        <legend>Panels</legend>
        {
          panelData.map((panel, index) => (
            <button
              id="panel-button"
              className={(selectedPanelIds.includes(panel.id)) ? 'active lab-tests-btn' : 'lab-tests-btn'}
              type="button"
              key={`${panel.id}`}
              onClick={() => this.props.selectPanelTests(panel)}
            >
              {panel.name}
            </button>
          ))
        }
      </fieldset>
    );
  }
}

LabPanelFieldSet.defaultProps = {
  selectedPanelIds: [],
};

LabPanelFieldSet.propTypes = {
  selectPanelTests: PropTypes.func.isRequired,
  selectedPanelIds: PropTypes.array,
};

export default LabPanelFieldSet;
