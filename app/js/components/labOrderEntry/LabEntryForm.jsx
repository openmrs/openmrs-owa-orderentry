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
  toggleDraftLabOrdersUgency,
} from '../../actions/draftLabOrderAction';
import '../../../css/grid.scss';
import './styles.scss';

import fetchLabOrders from '../../actions/labOrders/fetchLabOrders';
import { fetchLabConcepts } from '../../actions/labOrders/labConceptsAction';

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
    encounterType: PropTypes.shape({
      uuid: PropTypes.string,
    }).isRequired,
    encounterRole: PropTypes.shape({
      uuid: PropTypes.string,
    }),
    inpatientCareSetting: PropTypes.shape({
      uuid: PropTypes.string,
    }),
    conceptsAsTests: PropTypes.array,
    conceptsAsPanels: PropTypes.array,
    session: PropTypes.shape({
      currentProvider: PropTypes.shape({
        person: PropTypes.shape({
          uuid: PropTypes.string,
        }),
        uuid: PropTypes.string,
      }),
      currentLocation: PropTypes.object,
    }),
    orderables: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = {
    createLabOrderReducer: {
      status: {},
      errorMessage: '',
    },
    encounterRole: {
      uuid: '',
    },
    patient: {
      uuid: '',
    },
    inpatientCareSetting: {
      uuid: '',
    },
    conceptsAsTests: [],
    conceptsAsPanels: [],
    session: {
      currentProvider: {
        person: {
          uuid: '',
        },
      },
    },
    labOrders: {
      results: [],
    },
  };

  state = {
    categoryUUID: this.props.orderables[0].uuid,
    selectedPanelIds: [],
    selectedPanelTestIds: [],
  };

  componentDidMount() {
    this.props.dispatch(fetchLabOrders(null, 5, this.props.patient.uuid));
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
      selectedPanelIds: selectedLabPanels.map(panel => panel.id),
      selectedPanelTestIds: defaultTests.map(test => test.id),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      status: { added, error },
      errorMessage,
      labOrderData,
    } = this.props.createLabOrderReducer;
    if (added && labOrderData !== prevProps.createLabOrderReducer.labOrderData) {
      successToast('lab order successfully created');
      this.props.dispatch(fetchLabOrders(null, 5, this.props.patient.uuid));
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

  handleUrgencyChange = (order) => {
    this.props.dispatch(toggleDraftLabOrdersUgency(order));
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
        handleTestSelection={this.handleTestSelection}
        panels={this.props.conceptsAsPanels}
        selectedPanelIds={this.state.selectedPanelIds}
      />
      <LabTestFieldSet
        handleTestSelection={this.handleTestSelection}
        draftLabOrders={this.props.draftLabOrders}
        selectedTests={this.props.selectedTests}
        tests={this.props.conceptsAsTests}
      />
    </div>
  );

  changeLabForm = (id) => {
    this.setState({
      categoryUUID: id,
    });
  };

  handleSubmit = () => {
    const { draftLabOrders } = this.props;
    const isEmpty = !draftLabOrders.length;
    if (isEmpty) return;
    const orders = draftLabOrders.map(labOrder => (
      {
        concept: labOrder.concept,
        careSetting: this.props.inpatientCareSetting.uuid,
        encounter: this.props.encounterType.uuid,
        orderer: this.props.session.currentProvider.uuid,
        patient: this.props.patient.uuid,
        type: 'testorder',
      }
    ));

    const encounterPayload = {
      encounterProviders: [
        {
          encounterRole: this.props.encounterRole.uuid,
          provider: this.props.session.currentProvider.uuid,
        },
      ],
      encounterType: this.props.encounterType.uuid,
      location: this.props.session.currentLocation,
      orders,
      patient: this.props.patient.uuid,
    };
    this.props.dispatch(createLabOrder(encounterPayload));
    this.props.dispatch(deleteDraftLabOrder());
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

  renderLabDraftOrder = () => (
    <div className="draft-lab-wrapper">
      <LabDraftOrder
        toggleDraftLabOrdersUgency={this.handleUrgencyChange}
        handleDraftDiscard={this.discardTestsInDraft}
        draftLabOrders={this.props.draftLabOrders}
        panelTests={this.state.selectedPanelTestIds}
        handleSubmit={() => this.handleSubmit()}
      />
    </div>
  );

  render() {
    const {
      handleCancel, handleSubmit, renderPendingOrders, renderPastOrders, props: { orderables },
    } = this;
    return (
      <React.Fragment>
        <div className="lab-order-entry">
          <p>New Lab Order</p>
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
                      onClick={() => this.changeLabForm(orderable.uuid)}>
                      {orderable.display}
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
          {renderPendingOrders()}
          <br />
          {(this.props.labOrders.results) && <div>{renderPastOrders()}</div>}
          <br />
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({
  draftLabOrderReducer: {
    draftLabOrders,
    selectedLabPanels,
    defaultTests,
    selectedTests,
  },
  dateFormatReducer: { dateFormat },
  labConceptsReducer: {
    conceptsAsTests,
    conceptsAsPanels,
  },
  openmrs: { session },
  fetchLabOrderReducer: { labOrders },
  patientReducer: { patient },
  encounterRoleReducer: { encounterRole },
  encounterReducer: { encounterType },
  careSettingReducer: { inpatientCareSetting },
  createLabOrderReducer,
  labOrderableReducer: { orderables },
}) => ({
  draftLabOrders,
  dateFormat,
  conceptsAsTests,
  conceptsAsPanels,
  selectedLabPanels,
  defaultTests,
  selectedTests,
  labOrders,
  encounterType,
  inpatientCareSetting,
  createLabOrderReducer,
  encounterRole,
  patient,
  session,
  orderables,
});

export default connect(mapStateToProps)(LabEntryForm);
