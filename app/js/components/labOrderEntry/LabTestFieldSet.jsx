import React from 'react';
import PropTypes from 'prop-types';
import { testsData } from './labData';
import '../../../css/grid.scss';

class LabTestFieldSet extends React.Component {
  render() {
    const { selectedTests, handleTestSelection } = this.props;
    const selectedTestIds = selectedTests.map(test => test.id);
    return (
      <fieldset className="fieldset">
        <legend>Tests</legend>
        <div className="flex-row">
          {
            testsData.map(item => (
              <button
                type="button"
                id="category-test-button"
                key={`${item.id}`}
                className={`lab-tests-btn ${(selectedTestIds.includes(item.id)) ? 'active' : ''}`}
                onClick={() => handleTestSelection(item, 'single')}
              >
                {item.test}
              </button>
            ))
          }
        </div>
      </fieldset>
    );
  }
}

LabTestFieldSet.propTypes = {
  selectedTests: PropTypes.array.isRequired,
  handleTestSelection: PropTypes.func.isRequired,
};

export default LabTestFieldSet;
