import React from 'react';
import PropTypes from 'prop-types';

const Paginate = ({
  totalPage,
  nextPageUrl,
  dispatch,
  fetchNew,
  prevPageUrl,
  patientId,
}) => (
  <div className="pagination">
    <div
      className="page-link prev"
      value="previous"
      onClick={() => dispatch(fetchNew(prevPageUrl, patientId))}
      role="button"
      tabIndex={0}>
      <p>❮❮</p>
    </div>
    <div className="page-link">
      <p>{Math.floor(nextPageUrl.split('=')[7] / 10)}</p>
    </div>
    <div className="page-link no-click">
      <p>/</p>
    </div>
    <div className="page-link current-page">
      <p>
        <b>{totalPage}</b>
      </p>
    </div>
    <div
      className="page-link next"
      value={nextPageUrl}
      onClick={() => dispatch(fetchNew(nextPageUrl, patientId))}
      role="button"
      tabIndex={0}>
      <p>❯❯</p>
    </div>
  </div>
);

export default Paginate;

Paginate.defaultProps = {
  totalPage: 10,
  nextPageUrl: '',
  prevPageUrl: '',
  patientId: 1,
};

Paginate.propTypes = {
  totalPage: PropTypes.number,
  nextPageUrl: PropTypes.string,
  prevPageUrl: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  fetchNew: PropTypes.func.isRequired,
  patientId: 1,
};
