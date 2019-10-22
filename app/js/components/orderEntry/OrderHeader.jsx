import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import IconButton from '../button/IconButton';
import { isCancellable, isEditable } from "../../utils/helpers";

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
      <th>{order.orderNumber}</th>
      <th>{order.orderType.display}</th>
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
          iconTitle={ discontinueMsg }
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
