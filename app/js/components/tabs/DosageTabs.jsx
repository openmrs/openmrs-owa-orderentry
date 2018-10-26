import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DosageTabs extends Component {
  handleTabClick = (tabIndex, tabName) => {
    this.props.handleFormTabs(tabIndex);
    this.props.formType(tabName);
  }

  renderChildrenWithTabsAsProps =() => (
    React.Children.map(this.props.children, (child, index) => React.cloneElement(child, {
      onClick: this.handleTabClick,
      tabIndex: index,
      isActive: index === this.props.activeTabIndex,
    })));

  renderActiveTabContent=() => {
    const { children, activeTabIndex } = this.props;
    if (children[activeTabIndex]) return children[activeTabIndex].props.children;
    return false;
  }

  render() {
    return (
      <div className="DosageTabs">
        Instructions:&nbsp;
        {this.renderChildrenWithTabsAsProps()}
        {this.renderActiveTabContent()}
      </div>
    );
  }
}

DosageTabs.propTypes = {
  children: PropTypes.array.isRequired,
  handleFormTabs: PropTypes.func.isRequired,
  formType: PropTypes.func.isRequired,
  activeTabIndex: PropTypes.number.isRequired,
};

export default DosageTabs;
