import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ToolTip } from '@openmrs/react-components';
import '../../../css/grid.scss';
import { getConceptShortName } from '../../utils/helpers';


const formatToolTipData = (setMembers, locale) => setMembers.map(test =>
  getConceptShortName(test, locale));

const LabPanelFieldSet = (props) => {
  const {
    selectedPanelIds, handleTestSelection, panels, labCategoryName, locale,
  } = props;
  return (
    <fieldset className="fieldset">
      <legend>
        <FormattedMessage
          id="app.orders.panels"
          defaultMessage="Panels"
          description="Panels" />
      </legend>
      <div className="panel-box">
        {panels.length ? (
          panels.map(panel => (
            <button
              id="panel-button"
              className={classNames('lab-tests-btn tooltip', {
                active: selectedPanelIds.includes(panel.uuid),
              })}
              type="button"
              key={`${panel.uuid}`}
              onClick={() => handleTestSelection(panel, 'panel')}>
              { getConceptShortName(panel, locale) }
              <ToolTip
                toolTipHeader="Tests included in this panel:"
                toolTipBody={formatToolTipData(panel.setMembers, locale)}
              />
            </button>
          ))
        ) : (
          <p>{labCategoryName} has no panels</p>
        )}
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
