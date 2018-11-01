import React from 'react';
import PropTypes from 'prop-types';

const showLoading = loading => (loading && <span> Searching...</span>);

const showError = error => (
  error && <span className="preformatted-note">{error.data.message}</span>
);

const View = ({
  results, loading, error, focused,
  onOptionSelected,
  onChange, value,
}) => {
  const renderResults = () => (
    results.length > 0 && focused &&
    <div className="options-container">
      {results.map(result => (
        <p
          role="button"
          className="option"
          key={result.uuid}
          onClick={(event) => {
            onOptionSelected(result.uuid, result.display);
          }}
        >{result.display}
        </p>

      ))}
    </div>
  );

  const noDrugFound = () => (
    !loading && focused && results.length === 0 &&
    <span className="preformatted-note">
      <span className="emoji-sorry" role="img" aria-label="search"> 🔍 </span>
      No Drug(s) found, please refine your search
    </span>
  );

  return (
    <div className="search-container">
      <p>New order for: </p>
      <span>
        <input
          value={value}
          type="text" id="sel-drug4841input"
          placeholder="Search for drug...(3 chars min.)"
          onChange={(event) => {
            onChange(event);
          }}
        />
        {showLoading(loading)}
        {showError(error)}
        {noDrugFound()}
      </span>
      {renderResults(results)}
    </div>
  );
};

View.propTypes = {
  results: PropTypes.array,
  onOptionSelected: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.object,
  loading: PropTypes.bool,
  focused: PropTypes.bool.isRequired,
};

View.defaultProps = {
  results: undefined,
  error: null,
  loading: false,
  value: "",
};

export default View;
