import { SORT_AND_FILTER } from './actionTypes';

const sortAndFilterAction = (sortBy, value) => (dispatch) => {
  dispatch({
    type: SORT_AND_FILTER,
    sortBy,
    value,
  });
};

export default sortAndFilterAction;
