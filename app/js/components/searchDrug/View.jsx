import React from 'react';
import PropTypes from 'prop-types';

const View = ({
  searchDrug, results, loading, error,
}) => {
  const renderResults = () => (
    results && results.length > 0 &&
    <datalist id="drugs">
      {results.map(result => (
        <option value={result.display} key={result.uuid} />
      ))}
    </datalist>
  );

  const showLoading = () => (loading ? ' Searching...' : '');

  const showError = () => (error ? error.data.message : '');

  return (
    <form id="new-order" className="sized-inputs css-form">
      <p>
        <span>
          <label>New order for: </label>
          <input
            list="drugs" type="text" id="sel-drug4841input"
            placeholder="Search for drug...(3 chars min.)" size="40"
            onChange={event => searchDrug(event.target.value)}
          />
          <span>{showLoading()}</span>
          <span className="preformatted-note">{showError()}</span>
          {renderResults()}
        </span>
      </p>
    </form>
  );
};


View.propTypes = {
  results: PropTypes.array,
  searchDrug: PropTypes.func.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

View.defaultProps = {
  results: undefined,
  error: null,
  loading: false,
};

export default View;
