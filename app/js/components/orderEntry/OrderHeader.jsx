import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../button/IconButton';

const OrderHeader = ({ status, orderable }) => (
  <Fragment>
    <th>{orderable}</th>
    <th>{status}</th>
    <th className="order-actions-btn">
      <IconButton
        iconClass="icon-pencil"
        iconTitle="EDIT"
        onClick={() => {}}
      />
      <IconButton
        iconClass="icon-remove"
        iconTitle="DISCONTINUE"
        onClick={() => {}}
      />
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
