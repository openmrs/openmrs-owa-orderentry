import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class SelectBox extends React.Component {
  state = {
    name: this.props.name,
    items: this.props.items || [],
    selectedItem: this.props.items[0] || this.props.selectedItem,
    showItems: false,
  }

  dropDown = () => {
    this.setState(prevState => ({
      showItems: !prevState.showItems,
    }));
  }

  selectItem = (item) => {
    this.setState({
      selectedItem: item,
      showItems: false,
    });
    this.props.onChange();
  }

  render() {
    const {
      selectedItem, name, showItems, items,
    } = this.state;
    const showSelectBoxItems = 'select-box--items display-on';
    const hideSelectBoxItems = 'select-box--items display-off';
    return (
      <div>
        <div className="select-box--box">
          <div className="select-box--container">
            <div className="select-box--selected-item">
              { selectedItem.value }
            </div>
            <div
              className="select-box--arrow"
              role="link"
              tabIndex={0}
              onClick={this.dropDown}
            ><span className={`${showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`} />
            </div>
          </div>
          <div
            className={showItems ? showSelectBoxItems : hideSelectBoxItems}
          >
            {
              items.map((item, index) => (
                <div
                  key={item.id}
                  role="link"
                  id={`item${index}`}
                  tabIndex={0}
                  onClick={() => this.selectItem(item)}
                  className={selectedItem === item ? 'selected' : ''}
                >
                  { item.value }
                </div>))
            }
          </div>
        </div>
        <input type="hidden" name={name} value={selectedItem.id} onChange={this.props.onChange} />
      </div>
    );
  }
}

SelectBox.defaultProps = {
  name: '',
  items: [],
  selectedItem: {},
};

SelectBox.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array,
  selectedItem: PropTypes.object,
};

export default SelectBox;
