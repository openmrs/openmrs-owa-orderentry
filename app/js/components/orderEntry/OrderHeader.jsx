import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../button/IconButton';

const changeClassAccordingToUrgency = urgency => (urgency === 'ROUTINE' ? 'i-gray' : 'i-red');
const OrderHeader = ({
  status, order, toggleUrgency, handleEdit,
}) => (
  <Fragment>
    <th>{order.display.toLowerCase()}</th>
    <th>{status}</th>
    <th className="order-actions-btn">
      {order.type === 'drugorder' && (
        <IconButton
          iconClass="icon-pencil"
          iconTitle="EDIT"
          onClick={handleEdit}
          dataContext={order}
        />
      )}
      <IconButton iconClass="icon-remove" iconTitle="DISCONTINUE" onClick={() => {}} />
      {order.type === 'testorder' && (
        <IconButton
          iconClass={`icon-warning-sign ${changeClassAccordingToUrgency(order.urgency)}`}
          iconTitle="Urgency"
          onClick={() => toggleUrgency(order)}
        />
      )}
    </th>
  </Fragment>
);

export default OrderHeader;

OrderHeader.defaultProps = {
  status: '',
  order: {},
};

OrderHeader.propTypes = {
  status: PropTypes.string,
  order: PropTypes.object,
  toggleUrgency: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
