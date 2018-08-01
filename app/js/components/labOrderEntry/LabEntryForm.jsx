import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LabPanelFieldSet from './LabPanelFieldSet';
import LabTestFieldSet from './LabTestFieldSet';
import LabDraftOrder from './LabDraftOrder';
import ActiveOrders from './ActiveOrders';
import PastOrders from './PastOrders';
import Accordion from '../accordion';
import { labCategories } from './labData';

import {
  addTestPanelToDraft,
  removeTestPanelFromDraft,
  removeTestFromDraft,
  addTestToDraft,
  toggleDraftLabOrdersUgency,
  addDraftLabOrders,
  deleteDraftLabOrder,
} from '../../actions/draftLabOrderAction';

import fetchLabOrders from '../../actions/labOrders/fetchLabOrders';
import { activeOrders, pastOrders } from './ordersHistoryMockData';
import '../../../css/grid.scss';

export class LabEntryForm extends PureComponent {
  state = {
    categoryId: 1,
    selectedPanelIds: [],
    selectedPanelTestIds: [],
  };

  componentDidMount() {
    this.props.dispatch(fetchLabOrders(null, 5, this.props.patient.uuid));
  }

  componentWillReceiveProps(nextProps) {
    const {
      selectedLabPanels,
      defaultTests,
    } = nextProps;
    this.setState({
      selectedPanelIds: selectedLabPanels.map(panel => panel.id),
      selectedPanelTestIds: defaultTests.map(test => test.id),
    });
  }

  handleTestSelection = (item, type) => {
    const {
      props: {
        draftLabOrders,
        dispatch,
      },
      state: {
        selectedPanelIds,
        selectedPanelTestIds,
      },
    } = this;
    const isSelected = !!draftLabOrders.filter(order => order.id === item.id).length;

    if ((type === 'panel')) {
      const isSelectedPanel = selectedPanelIds.includes(item.id);
      if (isSelectedPanel) {
        dispatch(removeTestPanelFromDraft(item));
      } else {
        dispatch(addTestPanelToDraft(item));
      }
    }
    if (type === 'single') {
      const isSelectedPanelTest = selectedPanelTestIds.includes(item.id);
      if (!isSelectedPanelTest && isSelected) dispatch(removeTestFromDraft(item));
      if (!isSelectedPanelTest && !isSelected)dispatch(addTestToDraft(item));
    }
  }

  showFieldSet = () => (
    <div>
      <LabPanelFieldSet
        handleTestSelection={this.handleTestSelection}
        selectedPanelIds={this.state.selectedPanelIds}
      />
      <LabTestFieldSet
        handleTestSelection={this.handleTestSelection}
        draftLabOrders={this.props.draftLabOrders}
        selectedTests={this.props.selectedTests}
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
      selectedPanelIds: [],
    });
  };

  renderActiveOrders = () => (
    <Accordion title="Active Lab Orders">
      <ActiveOrders orders={activeOrders} />
    </Accordion>
  );

  renderPastOrders = () => {
    const { results } = this.props.labOrders;
    if (results.length > 0) {
      return (
        <Accordion open title="Past Lab Orders">
          <PastOrders orders={results} />
        </Accordion>
      );
    }
    return (
      <Accordion title="Past Lab Orders">
        <p>No past orders</p>
      </Accordion>
    );
  };

  renderLabDraftOrder = () => (
    <div className="draft-lab-wrapper">
      <LabDraftOrder
        toggleDraftLabOrdersUgency={order => this.props.dispatch(toggleDraftLabOrdersUgency(order))}
        draftLabOrders={this.props.draftLabOrders}
        panelTests={this.state.selectedPanelTestIds}
      />
    </div>
  );

  render() {
    const {
      renderActiveOrders,
      renderPastOrders,
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
            <form className="lab-form simple-form-ui">{this.showFieldSet()}</form>
          </div>
        </div>
        <br />
        {renderActiveOrders()}
        <br />
        {(this.props.labOrders.results) && <div>{renderPastOrders()}</div>}
        <br />
      </React.Fragment>
    );
  }
}

LabEntryForm.defaultProps = {
  labOrders: {
    results: [],
  },
  patient: {
    uuid: '',
  },
};

LabEntryForm.propTypes = {

  draftLabOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedLabPanels: PropTypes.arrayOf(PropTypes.any).isRequired,
  defaultTests: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedTests: PropTypes.arrayOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
  labOrders: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }),
  patient: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

export const mapStateToProps = ({
  draftLabOrderReducer: {
    draftLabOrders,
    selectedLabPanels,
    defaultTests,
    selectedTests,
  },
  fetchLabOrderReducer: { labOrders },
  patientReducer: { patient },
}) => ({
  draftLabOrders,
  selectedLabPanels,
  defaultTests,
  selectedTests,
  labOrders,
  patient,
});

export default connect(mapStateToProps)(LabEntryForm);
