import React from 'react';
import PropTypes from 'prop-types';
import '../../../css/grid.scss';

const LabTestFieldSet = ({ selectedTests, handleTestSelection, tests }) => {
  const selectedTestIds = selectedTests.map(test => test.uuid);
  return (
    <fieldset className="fieldset">
      <legend>Tests</legend>
      <div className="tests-box">
        {
          tests.map(test => (
            <button
              type="button"
              id="category-test-button"
              key={`${test.uuid}`}
              className={`lab-tests-btn ${(selectedTestIds.includes(test.uuid)) ? 'active' : ''}`}
              onClick={() => handleTestSelection(test, 'single')}
            >
              {test.display.toLowerCase()}
            </button>
          ))
        }
      </div>
    </fieldset>
  );
};

LabTestFieldSet.propTypes = {
  selectedTests: PropTypes.array.isRequired,
  handleTestSelection: PropTypes.func.isRequired,
  tests: PropTypes.array.isRequired,
};

export default LabTestFieldSet;
