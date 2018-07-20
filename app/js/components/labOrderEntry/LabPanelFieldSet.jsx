import React from 'react';
import PropTypes from 'prop-types';
import { panelData } from './labData';
import '../../../css/grid.scss';

class LabPanelFieldSet extends React.Component {
  render() {
    const { selectedPanel } = this.props;
    return (
      <fieldset className="fieldset">
        <legend>Panels</legend>
        {
          panelData.map((panel, index) => (
            <button
              id="panel-button"
              className={(selectedPanel === panel.id) ? 'active' : ''}
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
  selectedPanel: null,
};

LabPanelFieldSet.propTypes = {
  selectPanelTests: PropTypes.func.isRequired,
  selectedPanel: PropTypes.number,
};

export default LabPanelFieldSet;
