import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LabPanelFieldSet from './LabPanelFieldSet';
import LabTestFieldSet from './LabTestFieldSet';
import LabDraftOrder from './DraftOrder';
import ActiveOrders from './ActiveOrders';
import PastOrders from './PastOrders';
import Accordion from '../accordion';
import { labCategories } from './labData';
import { addDraftLabOrders, deleteDraftLabOrder } from '../../actions/draftLabOrderAction';
import { activeOrders, pastOrders } from './ordersHistoryMockData';
import '../../../css/grid.scss';

export class LabEntryForm extends React.Component {
  state = {
    categoryId: 1,
    defaultTests: [],
    selectedTests: [],
    selectedPanelIds: [],
  };

  selectTest = (test) => {
    const { addDraftLabOrdersToStore, deleteDraftLabOrderFromStore } = this.props;
    const selectedIds = this.state.selectedTests.map(currentTest => currentTest.id);
    const defaultTestIds = this.state.defaultTests.map(currentTest => currentTest.id);
    if (selectedIds.includes(test.id)) {
      this.setState({
        selectedTests: this.state.selectedTests.filter(currentTest => currentTest.id !== test.id),
      });
      deleteDraftLabOrderFromStore([test]);
    } else if (!defaultTestIds.includes(test.id)) {
      this.setState({ selectedTests: [...this.state.selectedTests, test] });
      addDraftLabOrdersToStore([test]);
    }
  };

  selectPanelTests = (panel) => {
    const { addDraftLabOrdersToStore, deleteDraftLabOrderFromStore } = this.props;
    if (this.state.selectedPanelIds.includes(panel.id)) {
      const { defaultTests } = this.state;
      const panelTestIds = panel.tests.map(test => test.id);
      this.setState({
        selectedPanelIds: this.state.selectedPanelIds.filter(panelId =>
          panelId !== panel.id),
        defaultTests: defaultTests.filter(test => !panelTestIds.includes(test.id)),
      });
      deleteDraftLabOrderFromStore(panel.tests);
    } else {
      this.setState({
        selectedPanelIds: [...this.state.selectedPanelIds, panel.id],
        defaultTests: [...this.state.defaultTests, ...panel.tests],
      });
      addDraftLabOrdersToStore(panel.tests);
    }
  };

  showFieldSet = () => (
    <div>
      <LabPanelFieldSet
        selectPanelTests={this.selectPanelTests}
        selectedPanelIds={this.state.selectedPanelIds}
      />
      <LabTestFieldSet
        selectTest={this.selectTest}
        selectedTests={this.props.draftLabOrders}
      />
    </div>
  );

  changeLabForm = (id) => {
    this.setState({
      categoryId: id,
    });
  };

  handleSubmit = () => {
    /**
     * this should contain data to be submitted
     * */
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({
      selectedTests: [],
      selectedPanelIds: [],
    });
  };

  renderActiveOrders = () => (
    <Accordion title="Active Lab Orders">
      <ActiveOrders orders={activeOrders} />
    </Accordion>
  );

  renderPastOrders = () => (
    <Accordion title="Past Lab Orders">
      <PastOrders orders={pastOrders} />
    </Accordion>
  );

  renderLabDraftOrder = () => (
    <div className="draft-lab-wrapper">
      <LabDraftOrder
        draftLabOrders={this.props.draftLabOrders}
      />
    </div>
  )

  render() {
    const {
      handleCancel, handleSubmit, renderActiveOrders, renderPastOrders,
    } = this;
    return (
      <React.Fragment>
        <p>New Lab Order</p>
        <br />
        <div className="lab-form-wrapper">
          <div className="lab-category">
            <ul>
              {labCategories.map((category, index) => (
                <li key={`${category.name}-${category.id}`}>
                  <a
                    className={this.state.categoryId === category.id ? 'active-category' : ''}
                    href="#"
                    id="category-button"
                    onClick={() => this.changeLabForm(category.id)}>
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
            {this.renderLabDraftOrder()}
          </div>
          <div className="order-form-wrapper">
            <form className="lab-form simple-form-ui">
              {this.showFieldSet()}
            </form>
          </div>
        </div>
        <br />
        {renderActiveOrders()}
        <br />
        {renderPastOrders()}
        <br />
      </React.Fragment>
    );
  }
}

LabEntryForm.propTypes = {
  addDraftLabOrdersToStore: PropTypes.func.isRequired,
  deleteDraftLabOrderFromStore: PropTypes.func.isRequired,
  draftLabOrders: PropTypes.array.isRequired,
};

const mapStateToProps = ({
  draftLabOrderReducer: { draftLabOrders },
}) => ({
  draftLabOrders,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addDraftLabOrdersToStore: addDraftLabOrders,
  deleteDraftLabOrderFromStore: deleteDraftLabOrder,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LabEntryForm);
