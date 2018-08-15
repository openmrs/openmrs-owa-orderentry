import sortAndFilterAction from '../../app/js/actions/sortAndFilterAction';

describe('sort and filter action test-suite', () => {
  it('creates SORT_AND_FILTER action type', async(done) => {
    const expectedAction = [
      {
        type: 'SORT_AND_FILTER',
        sortBy: 'type',
        value: 'drugorder',
      }
    ]
    const store = mockStore({});
    await store.dispatch(sortAndFilterAction('type', 'drugorder'));
    const dispatchedAction = store.getActions();
    expect(dispatchedAction).toEqual(expectedAction);
    done();
  });
})