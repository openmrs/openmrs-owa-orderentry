import React from 'react';
import PropTypes from 'prop-types';

const TestsInAToolTip = ({ tests }) => (
  <span className="tooltip-text">
    <p>Tests included in this panel:</p>
    <div>
      {tests.map(test => (
        <span key={test.uuid}>{test.display.toLowerCase()}</span>
      ))}
    </div>
  </span>
);

TestsInAToolTip.propTypes = {
  tests: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TestsInAToolTip;
