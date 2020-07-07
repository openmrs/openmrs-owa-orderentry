import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import IconButton from '../button/IconButton';

// encapsulates our logic as to whether or not a order is cancellable or editable
// in the future we will likely want to tweak these and/or make them more configurable
// export just for testing
export const isCancellable = (order) => {
  const orderTypeName = order && order.orderType && order.orderType.name;
  return orderTypeName === "Test Order" &&
    (!order.fulfillerStatus ||
      !["IN_PROGRESS", "COMPLETED"].includes(order.fulfillerStatus));
    }

export const isEditable = () => false; // not working for drugs and not supported for labs

const OrderHeader = ({
  intl,
  status,
  orderable,
  order,
  handleEdit,
  handleDiscontinue,
}) => {
  const discontinueMsg = intl.formatMessage({ id: "app.orders.discontinue", defaultMessage: "DISCONTINUE" });
  return (
    <Fragment>
      <th className="th-orderable">{order.orderNumber}</th>
      <th className="th-orderable">{orderable}</th>
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
          iconTitle={discontinueMsg}
          dataContext={order}
          onClick={handleDiscontinue}
        />
        }
      </th>
    </Fragment>
  );
};

export default injectIntl(OrderHeader);

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
