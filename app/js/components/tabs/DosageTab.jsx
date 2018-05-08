import React from 'react';
import PropTypes from 'prop-types';

const DosageTab = props => (
  <a
    role="presentation"
    onClick={(event) => {
      event.preventDefault();
      props.onClick(props.tabIndex, props.tabName);
    }}>
    <span className={props.icon} />
    {props.tabName}
  </a>
);

DosageTab.propTypes = {
  icon: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
};

DosageTab.defaultProps = {
  onClick: () => {},
  tabIndex: 0,
};

export default DosageTab;
