import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Accordion } from '@openmrs/react-components';
import shortid from 'shortid';
import LabPanelFieldSet from './LabPanelFieldSet';
import LabTestFieldSet from './LabTestFieldSet';
import LabDraftOrder from './LabDraftOrder';
import ActiveOrders from './ActiveOrders';
import PastOrders from './PastOrders';
import createLabOrder from '../../actions/createLabOrder';
import { successToast, errorToast } from '../../utils/toast';
import {
  addTestPanelToDraft,
  removeTestPanelFromDraft,
  removeTestFromDraft,
  addTestToDraft,
  deleteDraftLabOrder,
} from '../../actions/draftLabOrderAction';
import '../../../css/grid.scss';
import './styles.scss';

import fetchLabOrders from '../../actions/labOrders/fetchLabOrders';
import fetchLabConcepts from '../../actions/labOrders/labConceptsAction';

export class LabEntryForm extends PureComponent {
  static propTypes = {
    createLabOrderReducer: PropTypes.shape({
      status: PropTypes.objectOf(PropTypes.bool),
      errorMessage: PropTypes.string,
      labOrderData: PropTypes.object,
    }),
    draftLabOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
    dateFormat: PropTypes.string.isRequired,
    selectedLabPanels: PropTypes.arrayOf(PropTypes.any).isRequired,
    defaultTests: PropTypes.arrayOf(PropTypes.any).isRequired,
    selectedTests: PropTypes.arrayOf(PropTypes.any).isRequired,
    dispatch: PropTypes.func.isRequired,
    labOrders: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
    }),
    patient: PropTypes.shape({
      uuid: PropTypes.string,
    }),
    conceptsAsPanels: PropTypes.array,
    standAloneTests: PropTypes.array,
    orderables: PropTypes.arrayOf(PropTypes.object).isRequired,
    getLabOrderables: PropTypes.string.isRequired,
  };

  static defaultProps = {
    createLabOrderReducer: {
      status: {},
      errorMessage: '',
    },
    patient: {
      uuid: '',
    },
    conceptsAsPanels: [],
    standAloneTests: [],
    labOrders: {
      results: [],
    },
  };

  state = {
    categoryUUID: this.props.orderables[0].uuid || 0,
    categoryName: this.props.orderables[0].display,
    selectedPanelIds: [],
    selectedPanelTestIds: [],
  };

  componentDidMount() {
    this.props.dispatch(fetchLabOrders(null, this.props.patient.uuid));
    if (this.state.categoryUUID) {
      this.props.dispatch(fetchLabConcepts(`${this.state.categoryUUID}?v=full`));
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      selectedLabPanels,
      defaultTests,
    } = nextProps;
    this.setState({
      selectedPanelIds: selectedLabPanels.map(panel => panel.uuid),
      selectedPanelTestIds: defaultTests.map(test => test.uuid),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      status: { added, error },
      errorMessage,
      labOrderData,
    } = this.props.createLabOrderReducer;
    if (added && labOrderData !== prevProps.createLabOrderReducer.labOrderData) {
      successToast('order successfully created');
      this.props.dispatch(fetchLabOrders(null, this.props.patient.uuid));
    }
    if (error) {
      errorToast(errorMessage);
    }
    if (this.state.categoryUUID !== prevState.categoryUUID) {
      this.props.dispatch(fetchLabConcepts(`${this.state.categoryUUID}?v=full`));
    }
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
    const isSelected = !!draftLabOrders.filter(order => order.uuid === item.uuid).length;

    if ((type === 'panel')) {
      const isSelectedPanel = selectedPanelIds.includes(item.uuid);
      if (isSelectedPanel) {
        dispatch(removeTestPanelFromDraft(item));
      } else {
        dispatch(addTestPanelToDraft(item));
      }
    }
    if (type === 'single') {
      const isSelectedPanelTest = selectedPanelTestIds.includes(item.uuid);
      if (!isSelectedPanelTest && isSelected) dispatch(removeTestFromDraft(item));
      if (!isSelectedPanelTest && !isSelected)dispatch(addTestToDraft(item));
    }
  }

  discardTestsInDraft = (test, action) => {
    const { dispatch } = this.props;
    if (action === 'single') return dispatch(removeTestFromDraft(test));
    if (action === 'panel') return dispatch(removeTestPanelFromDraft(test));
    return dispatch(deleteDraftLabOrder());
  }

  showFieldSet = () => (
    <div>
      <LabPanelFieldSet
        labCategoryName={this.state.categoryName}
        handleTestSelection={this.handleTestSelection}
        panels={this.props.conceptsAsPanels}
        selectedPanelIds={this.state.selectedPanelIds}
      />
      <LabTestFieldSet
        labCategoryName={this.state.categoryName}
        handleTestSelection={this.handleTestSelection}
        selectedTests={this.props.selectedTests}
        tests={this.props.standAloneTests}
      />
    </div>
  );

  changeLabForm = (id, name) => {
    this.setState({
      categoryUUID: id,
      categoryName: name,
    });
  };

  renderPendingOrders = () => {
    const { labOrderData } = this.props.createLabOrderReducer;
    if (labOrderData.orders) {
      const tests = labOrderData.orders.map(order => order.display);
      return (
        <Accordion open title="Pending Lab Orders">
          <ActiveOrders labOrderData={labOrderData} tests={tests} />
        </Accordion>
      );
    }
    return (
      <Accordion open title="Pending Lab Orders">
        <p>No pending orders</p>
      </Accordion>
    );
  };

  renderPastOrders = () => {
    const { labOrders: { results }, dateFormat } = this.props;
    if (results.length > 0) {
      return (
        <Accordion open title="Past Lab Orders">
          <PastOrders orders={results} dateFormat={dateFormat} />
        </Accordion>
      );
    }
    return (
      <Accordion title="Past Lab Orders">
        <p>No past orders</p>
      </Accordion>
    );
  };

  render() {
    const {
      handleCancel, handleSubmit, renderPendingOrders, renderPastOrders,
      props: { orderables, getLabOrderables },
    } = this;
    return (
      <React.Fragment>
        {
          getLabOrderables ?
            <div className="lab-order-entry">
              <h5>New Lab Order</h5>
              <br />
              <div className="lab-form-wrapper">
                <div className="lab-category">
                  <ul>
                    {orderables.map(orderable => (
                      <li key={shortid.generate()}>
                        <a
                          className={this.state.categoryUUID === orderable.uuid ? 'active-category' : ''}
                          href="#"
                          id="category-button"
                          onClick={() => this.changeLabForm(orderable.uuid, orderable.display)}>
                          {orderable.display}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-form-wrapper">
                  <form className="lab-form simple-form-ui">{this.showFieldSet()}</form>
                </div>
              </div>
              <br />
              {renderPendingOrders()}
              <br />
              {(this.props.labOrders.results) && <div>{renderPastOrders()}</div>}
              <br />
            </div>
            :
            <p>No Lab Orderables was found</p>
        }
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({
  draftReducer: {
    draftLabOrders: {
      orders,
      selectedLabPanels,
      defaultTests,
      selectedTests,
    },
  },
  dateFormatReducer: { dateFormat },
  labConceptsReducer: {
    conceptsAsPanels,
    standAloneTests,
  },
  fetchLabOrderReducer: { labOrders },
  patientReducer: { patient },
  careSettingReducer: { inpatientCareSetting },
  createLabOrderReducer,
  labOrderableReducer: { orderables },
  getLabOrderablesReducer: { getLabOrderables },
}) => ({
  draftLabOrders: orders,
  dateFormat,
  conceptsAsPanels,
  standAloneTests,
  selectedLabPanels,
  defaultTests,
  selectedTests,
  labOrders,
  inpatientCareSetting,
  createLabOrderReducer,
  patient,
  orderables,
  getLabOrderables,
});

export default connect(mapStateToProps)(LabEntryForm);
