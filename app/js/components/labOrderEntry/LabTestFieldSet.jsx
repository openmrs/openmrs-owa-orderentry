import React from 'react';
import PropTypes from 'prop-types';
import { testsData } from './labData';
import '../../../css/grid.scss';

class LabTestFieldSet extends React.Component {
  render() {
    const { selectedTests, selectTest } = this.props;
    return (
      <fieldset className="fieldset">
        <legend>Tests</legend>
        <div className="flex-row">
          {
            testsData.map((item, index) => (
              <button
                type="button"
                id="category-test-button"
                key={`${item.id}`}
                className={`lab-tests-btn ${(selectedTests.includes(item.id)) ? 'active' : ''}`}
                onClick={() => selectTest(item.id)}
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
  selectTest: PropTypes.func.isRequired,
};

export default LabTestFieldSet;
