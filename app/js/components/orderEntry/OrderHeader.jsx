import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const OrderHeader = ({ status, orderable }) => (
  <Fragment>
    <th className="th-invisible">{orderable}</th>
    <th className="th-invisible">{status}</th>
    <th className="th-invisible">
      <i className="icon-edit" />
      <i className="icon-delete" />
    </th>
  </Fragment>
);

export default OrderHeader;

OrderHeader.defaultProps = {
  status: '',
  orderable: '',
};

OrderHeader.propTypes = {
  status: PropTypes.string,
  orderable: PropTypes.string,
};
