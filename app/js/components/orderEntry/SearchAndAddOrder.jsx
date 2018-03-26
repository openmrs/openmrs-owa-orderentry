import React from 'react';
import ActiveOrders from './ActiveOrders';
import PastOrders from './PastOrders';
import AddForm from './addForm/AddForm';
import Tabs from '../tabs/Tabs';
import Tab from '../tabs/Tab';

class SearchAndAddOrder extends React.Component {
  state = {
    careSetting: 'OutPatient',
  }

  handleCareSettings = (careSetting) => {
    this.setState({ careSetting });
  }
  render() {
    return (
      <div>
        <Tabs careSetting={this.handleCareSettings}>
          <Tab
            tabName="OutPatient">
            <form className="sized-inputs css-form" noValidate>
              <p className="input-position-class">
                <label name="input-id">Input label</label>
                <input id="input-id" />
              </p>
            </form>
          </Tab>
          <Tab tabName="InPatient">Tab 2 content</Tab>
        </Tabs>
      </div>
    );
  }
}

export default SearchAndAddOrder;
