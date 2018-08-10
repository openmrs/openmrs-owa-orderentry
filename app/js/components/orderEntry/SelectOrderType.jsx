import React from 'react';
import PropTypes from 'prop-types';
import * as orderTypes from './orderTypes';

const SelectOrderType = ({ switchOrderType, currentOrderType }) => {
  const orderTypesAsObject = Object.values(orderTypes);
  return (
    <div className="dropdown">
      <div className="add-order-nav">
        <button>
          Add Order
        </button>
      </div>
      <div className="dropdown-content">
        {orderTypesAsObject.map(orderType => (
          <div
            key={orderType.id}
            value={orderType.text}
            role="link"
            onClick={() => switchOrderType(orderType)}
            tabIndex={0}
            className={`order-type-option ${currentOrderType.id === orderType.id ? 'active' : ''}`}>
            {orderType.text}
          </div>
        ))}
      </div>
    </div>
  );
};

SelectOrderType.propTypes = {
  currentOrderType: PropTypes.object.isRequired,
  switchOrderType: PropTypes.func.isRequired,
};

export default SelectOrderType;
