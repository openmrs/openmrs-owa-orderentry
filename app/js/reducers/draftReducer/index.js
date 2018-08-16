import mergeable from 'redux-merge-reducers';
import draftDrugOrderReducer from './draftDrugOrderReducer';
import draftLabOrderReducer from './draftLabOrderReducer';

export default mergeable(draftDrugOrderReducer).merge(draftLabOrderReducer);
