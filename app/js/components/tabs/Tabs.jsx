import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {
    state = {
      activeTabIndex: this.props.defaultActiveTabIndex,
    };

    handleTabClick = (tabIndex) => {
      this.setState({
        activeTabIndex: tabIndex,
      });
      this.props.closeFormsOnTabChange();
    }

    passPropsToChildren = () => (
      React.Children.map(this.props.children, (child, index) => React.cloneElement(child, {
        onClick: this.handleTabClick,
        tabIndex: index,
        isActive: index === this.state.activeTabIndex,
      })));

    renderActiveTabChildren = () => {
      const { children } = this.props;
      const { activeTabIndex } = this.state;
      if (children[activeTabIndex]) return children[activeTabIndex].props.children;
      return false;
    }

    render() {
      return (
        <div className="ui-tabs">
          <ul className="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
            { this.passPropsToChildren() }
          </ul>
          <div className="ui-tabs-panel ui-widget-content ui-corner-bottom">
            { this.renderActiveTabChildren() }
          </div>
        </div>
      );
    }
}
Tabs.propTypes = {
  defaultActiveTabIndex: PropTypes.number,
  children: PropTypes.node.isRequired,
  closeFormsOnTabChange: PropTypes.func.isRequired,
};

Tabs.defaultProps = {
  defaultActiveTabIndex: 0,
};

export default Tabs;
