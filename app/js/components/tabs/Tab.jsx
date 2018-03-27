import React from 'react';
import PropTypes from 'prop-types';

const Tab = props => (
  props.isActive ?
    <li className="ui-state-default ui-corner-top ui-tabs-active ui-state-active">
      <a
        className="ui-tabs-anchor" onClick={(event) => {
          event.preventDefault();
          props.onClick(props.tabIndex, props.tabName);
        }}
        role="presentation">
        {props.tabName}
      </a>
    </li> :
    <li className="ui-state-default ui-corner-top" >
      <a
        className="ui-tabs-anchor"
        onClick={(event) => {
          event.preventDefault();
          props.onClick(props.tabIndex, props.tabName);
        }}
        role="presentation"
      >
        {props.tabName}
      </a>
    </li>
);

Tab.propTypes = {
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  tabName: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

Tab.defaultProps = {
  onClick: () => {},
  tabIndex: 0,
  isActive: false,
};

export default Tab;

