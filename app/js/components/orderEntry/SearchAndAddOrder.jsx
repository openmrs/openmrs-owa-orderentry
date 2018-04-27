import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddForm from './addForm/AddForm';
import PastOrders from '../orderEntry/PastOrders';
import Tabs from '../tabs/Tabs';
import Tab from '../tabs/Tab';
import Accordion from '../accordion';
import SearchDrug from '../searchDrug';
import ActiveOrders from './ActiveOrders';

export class SearchAndAddOrder extends React.Component {
  state = {
    value: "",
    focused: false,
  };

  onSelectDrug = (drugName) => {
    this.setState(() => ({
      value: drugName,
      focused: false,
    }));
  }

  onChange = (value) => {
    this.setState(() => ({
      value,
      focused: true,
    }));
  }

  clearSearchField = () => {
    this.setState({
      value: "",
      focused: false,
    });
  }

  renderAddForm = careSetting => (
    <div>
      <AddForm
        drugName={this.props.drug.display}
        drugUuid={this.props.drug.uuid}
        careSetting={careSetting}
        clearSearchField={this.clearSearchField}
      />
    </div>
  );

  render() {
    return (
      <div className="body-wrapper">
        <Tabs>
          <Tab
            tabName="OutPatient">
            <SearchDrug
              value={this.state.value}
              focused={this.state.focused}
              onChange={this.onChange}
              onSelectDrug={this.onSelectDrug}
            />
            {this.renderAddForm(this.props.outpatientCareSetting)}
            <Accordion open title="Active Drug Orders">
              <ActiveOrders
                tabName="OutPatient"
                careSetting={this.props.outpatientCareSetting}
                location={this.props.location}
              />
            </Accordion>

            <Accordion title="Past Drug Orders">
              <PastOrders
                tabName="OutPatient"
                careSetting={this.props.outpatientCareSetting}
                location={this.props.location} />

              <br />
            </Accordion>
          </Tab>
          <Tab
            tabName="InPatient">
            <SearchDrug
              value={this.state.value}
              focused={this.state.focused}
              onChange={this.onChange}
              onSelectDrug={this.onSelectDrug}
            />
            {this.renderAddForm(this.props.inpatientCareSetting)}
            <Accordion open title="Active Drug Orders">
              <ActiveOrders
                tabName="InPatient"
                careSetting={this.props.inpatientCareSetting}
                location={this.props.location}
              />
            </Accordion>

            <Accordion title="Past Drug Orders">
              <PastOrders
                tabName="InPatient"
                careSetting={this.props.inpatientCareSetting}
                location={this.props.location} />
            </Accordion>

          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = ({
  careSettingReducer:
  { inpatientCareSetting, outpatientCareSetting },
  drugSearchReducer,
}) => ({
  inpatientCareSetting,
  outpatientCareSetting,
  drug: drugSearchReducer.selected,
});

SearchAndAddOrder.propTypes = {
  drug: PropTypes.string,
  location: PropTypes.shape({}).isRequired,
};

SearchAndAddOrder.defaultProps = {
  drug: "",
};

export default connect(mapStateToProps)(SearchAndAddOrder);
