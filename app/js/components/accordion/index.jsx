import React from 'react';
import PropTypes from 'prop-types';

class Accordion extends React.Component {
  state = {
    isVisible: this.props.open === undefined ? false : this.props.open,
  };

  render() {
    return (
      <div className={`accordion ${this.props.border ? 'border' : ''}`}>
        <div className="header">
          <a
            role="button"
            className="accordion-link"
            tabIndex={0}
            onClick={() => {
              this.setState(() => ({ isVisible: !this.state.isVisible }));
            }}>
            <span>
              {
                this.state.isVisible ?
                  <i className="toggle-icon icon-caret-up small rotate180" /> :
                  <i className="toggle-icon icon-caret-up small rotate90" />
              }
            </span>
            {this.props.title}
          </a>
        </div>
        <div className={`content ${!this.state.isVisible ? 'close' : 'open'}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}


Accordion.propTypes = {
  border: PropTypes.bool,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Accordion.defaultProps = {
  open: false,
  border: false,
};

export default Accordion;
