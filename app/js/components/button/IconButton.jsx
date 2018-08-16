import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class IconButton extends PureComponent {
  static propTypes = {
    iconClass: PropTypes.string,
    iconTitle: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    dataContext: PropTypes.object,
  }

  static defaultProps = {
    iconClass: '',
    iconTitle: '',
    dataContext: {},
  }

  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const data = this.props.dataContext;
    // do somethinng with this data when clicking
    this.props.onClick();
  }
  render() {
    const { iconClass, iconTitle } = this.props;

    return (
      <span>
        <a id="icon-btn-anchor" href="#" onClick={this.handleClick}>
          <i className={`${iconClass} scale`} title={iconTitle} />
        </a>
      </span>
    );
  }
}

export default IconButton;
