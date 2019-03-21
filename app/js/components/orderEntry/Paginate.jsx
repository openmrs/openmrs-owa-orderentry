import React from 'react';
import PropTypes from 'prop-types';


const maxNumberOfOrdersOnAPage = 10;

const getCurrentPageNumber = (nextPageUrl, totalNumberOfOrders) => {
  if (nextPageUrl) {
    const strings = nextPageUrl.split('=');
    const pageNumber = Math.floor(strings[strings.length - 1] / maxNumberOfOrdersOnAPage);
    return pageNumber;
  }
  return Math.ceil(totalNumberOfOrders / maxNumberOfOrdersOnAPage);
};

const getNumberOfAllPages = totalNumberOfOrders =>
  Math.ceil(totalNumberOfOrders / maxNumberOfOrdersOnAPage);


const Paginate = ({
  totalPage,
  nextPageUrl,
  dispatch,
  fetchNew,
  prevPageUrl,
}) => (
  <div className="pagination">
    <div
      className={prevPageUrl ? "page-link prev" : "page-link-disabled"}
      value="previous"
      onClick={() => dispatch(fetchNew(prevPageUrl))}
      role="button"
      tabIndex={0}>
      <p>❮❮</p>
    </div>

    <div className="page-link">
      <p>{getCurrentPageNumber(nextPageUrl, totalPage)}
      </p>
    </div>
    <div className="page-link no-click">
      <p>/</p>
    </div>
    <div className="page-link">
      <p>
        <b>{getNumberOfAllPages(totalPage)}</b>
      </p>
    </div>
    <div
      className={nextPageUrl ? "page-link next" : "page-link-disabled"}
      value={nextPageUrl}
      onClick={() => dispatch(fetchNew(nextPageUrl))}
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
};

Paginate.propTypes = {
  totalPage: PropTypes.number,
  nextPageUrl: PropTypes.string,
  prevPageUrl: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  fetchNew: PropTypes.func.isRequired,
};
