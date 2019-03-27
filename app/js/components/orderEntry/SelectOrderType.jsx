import React from 'react';
import PropTypes from 'prop-types';
import * as orderTypes from './orderTypes';

const SelectOrderType = ({ switchOrderType, currentOrderType, page }) => {
  const orderTypesAsObject = Object.values(orderTypes);
  let displayText = "Add Orders";
  let clickHandler = () => {};
  if (page === 'laborders') {
    displayText = "Add Lab Orders";
    clickHandler = () => switchOrderType(orderTypesAsObject[1]);
  }

  if (page === "drugorders") {
    displayText = "Add Drug Orders";
    clickHandler = () => switchOrderType(orderTypesAsObject[0]);
  }
  return (
    <div className="dropdown">
      <div className="add-order-nav">
        <button
          onClick={clickHandler}
        >
          {displayText}
        </button>
      </div>
      <div className="dropdown-content" style={{ display: page && "none" }}>
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
