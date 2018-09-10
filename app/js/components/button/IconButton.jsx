import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class IconButton extends PureComponent {
  static propTypes = {
    iconClass: PropTypes.string,
    iconTitle: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    dataContext: PropTypes.object,
    icon: PropTypes.string,
    id: PropTypes.string,
  }

  static defaultProps = {
    iconClass: '',
    iconTitle: '',
    dataContext: {},
    icon: null,
    id: '',
  }

  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onClick(this.props.dataContext);
  }

  render() {
    const {
      id, iconClass, iconTitle, icon,
    } = this.props;
    return (
      <span>
        <a id={`${id}`} href="#" onClick={this.handleClick}>
          <i className={`${iconClass} scale`} title={iconTitle}>{icon && icon}</i>
        </a>
      </span>
    );
  }
}

export default IconButton;
