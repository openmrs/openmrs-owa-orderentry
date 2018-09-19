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
    {orderable && <th className="th-orderable">{orderable.toLowerCase()}</th>}
    {status && <th>{status}</th>}
    <th className="order-actions-btn">
      {order.type !== 'laborder'
        && <IconButton
          iconClass="icon-pencil"
          iconTitle="EDIT"
          onClick={handleEdit}
          dataContext={order}
        />
      }
      {order.type !== 'laborder'
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
