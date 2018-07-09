import React from 'react';
import PropTypes from 'prop-types';
import * as orderTypes from './orderTypes';

const SelectOrderType = (props) => {
  const orderTypesAsObject = Object.values(orderTypes);
  return (
    <div>
      {
        orderTypesAsObject.map(orderType => (
          <button
            key={orderType.id}
            onClick={() => props.switchOrderType(orderType)}
            className={`order-type-button ${(props.currentOrderType.id === orderType.id) ? 'active' : ''}`}
          >{orderType.text}
          </button>
        ))
      }
    </div>
  );
};

SelectOrderType.propTypes = {
  currentOrderType: PropTypes.object.isRequired,
};

export default SelectOrderType;
