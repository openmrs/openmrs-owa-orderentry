import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

class Accordion extends React.Component {
  state = {
    isVisible: this.props.open === undefined ? false : this.props.open,
  };

  render() {
    const { date, dateFormat } = this.props;
    return (
      <React.Fragment>
        <tr
          className="accordion accordion-link"
          role="button"
          tabIndex={0}
          onClick={() => {
            this.setState({ isVisible: !this.state.isVisible });
          }}>
          <th className="th-1">
            <span>
              {this.state.isVisible ? (
                <i className="toggle-icon icon-caret-down small rotate90" />
              ) : (
                <i className="toggle-icon icon-caret-right small rotate90" />
              )}
            </span>
            {format(date, dateFormat).slice(0, -5)}
          </th>
          {this.props.title}
        </tr>
        <tr>
          <td className="th-invisible" />
          <td className="th-invisible" />
          <td className="th-details">
            <div
              className={`th-details accordion-two content ${
                !this.state.isVisible ? 'close' : 'open'
              }`}>
              {this.props.children}
            </div>
          </td>
          <td className="th-invisible" />
          <td className="th-invisible" />
        </tr>
      </React.Fragment>
    );
  }
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  title: PropTypes.object.isRequired,
  date: PropTypes.string,
  dateFormat: PropTypes.string,
};

Accordion.defaultProps = {
  open: false,
  date: '',
  dateFormat: '',
};

export default Accordion;
