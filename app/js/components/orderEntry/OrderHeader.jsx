import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../button/IconButton';

const OrderHeader = ({
  status,
  orderable,
  order,
  handleEdit,
  handleDiscontinue,
}) => (
  <Fragment>
    <th>{orderable}</th>
    <th>{status}</th>
    <th className="order-actions-btn">
      {order.type === 'drugorder'
        && <IconButton
          iconClass="icon-pencil"
          iconTitle="EDIT"
          onClick={handleEdit}
          dataContext={order}
        />
      }
      {order.type === 'drugorder'
      && <IconButton
        iconClass="icon-remove"
        iconTitle="DISCONTINUE"
        dataContext={order}
        onClick={handleDiscontinue}
      />
      }
    </th>
  </Fragment>
);

export default OrderHeader;

OrderHeader.defaultProps = {
  status: '',
  orderable: '',
  order: {},
};

OrderHeader.propTypes = {
  status: PropTypes.string,
  orderable: PropTypes.string,
  order: PropTypes.object,
  handleEdit: PropTypes.func.isRequired,
  handleDiscontinue: PropTypes.func.isRequired,
};
