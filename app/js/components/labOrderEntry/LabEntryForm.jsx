import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import LabPanelFieldSet from './LabPanelFieldSet';
import LabTestFieldSet from './LabTestFieldSet';
import LabDraftOrder from './LabDraftOrder';
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
import { setSelectedOrder } from '../../actions/orderAction';


export class LabEntryForm extends PureComponent {
  static propTypes = {
    createOrderReducer: PropTypes.shape({
      status: PropTypes.objectOf(PropTypes.bool),
      errorMessage: PropTypes.string,
      labOrderData: PropTypes.object,
    }),
    draftLabOrders: PropTypes.arrayOf(PropTypes.any).isRequired,
    selectedLabPanels: PropTypes.arrayOf(PropTypes.any).isRequired,
    defaultTests: PropTypes.arrayOf(PropTypes.any).isRequired,
    selectedTests: PropTypes.arrayOf(PropTypes.any).isRequired,
    dispatch: PropTypes.func.isRequired,
    patient: PropTypes.shape({
      uuid: PropTypes.string,
    }),
    conceptsAsPanels: PropTypes.array,
    standAloneTests: PropTypes.array,
    orderables: PropTypes.arrayOf(PropTypes.object).isRequired,
    getLabOrderables: PropTypes.string.isRequired,
  };

  static defaultProps = {
    createOrderReducer: {
      status: {},
      errorMessage: '',
    },
    patient: {
      uuid: '',
    },
    conceptsAsPanels: [],
    standAloneTests: [],
  };

  state = {
    categoryUUID: this.props.orderables[0].uuid || 0,
    categoryName: this.props.orderables[0].display,
    selectedPanelIds: [],
    selectedPanelTestIds: [],
  };

  componentDidMount() {
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
    } = this.props.createOrderReducer;
    if (added && labOrderData !== prevProps.createOrderReducer.labOrderData) {
      successToast('order successfully created');
      this.props.dispatch(fetchLabOrders(null, this.props.patient.uuid));
      this.props.dispatch(setSelectedOrder({
        currentOrderType: {},
        order: null,
        activity: null,
      }));
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
  labConceptsReducer: {
    conceptsAsPanels,
    standAloneTests,
  },
  fetchLabOrderReducer: { labOrders },
  patientReducer: { patient },
  careSettingReducer: { inpatientCareSetting },
  createOrderReducer,
  labOrderableReducer: { orderables },
  getLabOrderablesReducer: { getLabOrderables },
}) => ({
  draftLabOrders: orders,
  conceptsAsPanels,
  standAloneTests,
  selectedLabPanels,
  defaultTests,
  selectedTests,
  labOrders,
  inpatientCareSetting,
  createOrderReducer,
  patient,
  orderables,
  getLabOrderables,
});

export default connect(mapStateToProps)(LabEntryForm);
