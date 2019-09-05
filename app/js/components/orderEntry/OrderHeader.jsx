import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../button/IconButton';
import { isCancellable, isEditable } from "../../utils/helpers";

const OrderHeader = ({
  status,
  orderable,
  order,
  handleEdit,
  handleDiscontinue,
}) => (
  <Fragment>
    <th className="th-orderable">{orderable.toLowerCase()}</th>
    <th>{status}</th>
    <th className="order-actions-btn">
      {isEditable(order)
        && <IconButton
          iconClass="icon-pencil"
          iconTitle="EDIT"
          onClick={handleEdit}
          dataContext={order}
        />
      }
      {isCancellable(order)
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
