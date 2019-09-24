import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { getConceptShortName } from '../../utils/helpers';
import '../../../css/grid.scss';

const LabTestFieldSet = (props) => {
  const {
    selectedTests, handleTestSelection, tests, labCategoryName, locale,
  } = props;
  const selectedTestIds = selectedTests.map(test => test.uuid);
  return (
    <fieldset className="fieldset">
      <legend>
        <FormattedMessage
          id="app.orders.tests"
          defaultMessage="Tests"
          description="Tests" />
      </legend>
      <div className="tests-box">
        {
          tests.length ?
            tests.map(test => (
              <button
                type="button"
                id="category-test-button"
                key={`${test.uuid}`}
                className={`lab-tests-btn ${(selectedTestIds.includes(test.uuid)) ? 'active' : ''}`}
                onClick={() => handleTestSelection(test, 'single')}
              >
                { getConceptShortName(test, locale) }
              </button>
            )) : <p>{labCategoryName} has no Standalone Tests</p>
        }
      </div>
    </fieldset>
  );
};

LabTestFieldSet.propTypes = {
  labCategoryName: PropTypes.string.isRequired,
  selectedTests: PropTypes.array.isRequired,
  handleTestSelection: PropTypes.func.isRequired,
  tests: PropTypes.array.isRequired,
};

export default LabTestFieldSet;
