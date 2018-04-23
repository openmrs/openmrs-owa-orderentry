import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DosageTab from '../tabs/DosageTab';

class DosageTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
    };
  }

  handleTabClick = (tabIndex) => {
    this.setState({
      activeTabIndex: tabIndex,
    });
  }

  renderChildrenWithTabsAsProps =() => React.Children.map(this.props.children, (child, index) => React.cloneElement(child, {
    onClick: this.handleTabClick,
    tabIndex: index,
    isActive: index === this.state.activeTabIndex,
  }))

  renderActiveTabContent=() => {
    const { children } = this.props;
    const { activeTabIndex } = this.state;
    if (children[activeTabIndex]) {
      return children[activeTabIndex].props.children;
    }
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
};

export default DosageTabs;
