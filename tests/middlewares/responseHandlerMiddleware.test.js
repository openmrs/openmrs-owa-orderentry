import responseHandlerMiddleware from '../../app/js/middlewares/responseHandlerMiddleware.js';

describe('responseHandlerMiddleware', () => {

  const mockState = {
    getState: () => ({
      openmrs: {
        session: {
          locale: 'en'
        }
      }
    })
  };

  const nextHandler = responseHandlerMiddleware(mockState);
  let nextArgs = [];
  const fakeNext = (...args) => { nextArgs.push(args); };
  const fakeStore = {};
  it('must return a function to handle next action', () => {
      expect(typeof nextHandler).toBe('function');
      expect(nextHandler.length).toEqual(1);
  });
  it('should handle GET_DATE_SUCCESS action without valid date format response', () => {
    const action = {
      type: 'GET_DATE_SUCCESS',
      payload: {
          data: {
              results: []
          }
      }
    };
    nextArgs = [];
    nextHandler(fakeNext)(action);
    expect(nextArgs[0]).toEqual([
        {
            type: 'GET_DATE_SUCCESS',
            payload: action.payload,
            dateFormat: 'DD-MMM-YYYY HH:mm'
        }
    ]);
  });
  it('should handle GET_DATE_SUCCESS action for valid date format responses', () => {
    const action = {
      type: 'GET_DATE_SUCCESS',
      payload: {
          data: {
              results: [{ value: 'DD-MMM-YYYY'}]
          }
      }
    };
    nextArgs = [];
    nextHandler(fakeNext)(action);
    expect(nextArgs[0]).toEqual([
        {
            type: 'GET_DATE_SUCCESS',
            payload: action.payload,
            dateFormat: 'DD-MMM-YYYY'
        }
    ]);
  });
  it('should throw an error for GET_DATE_SUCCESS action for invalid date format responses', () => {
    const action = {
      type: 'GET_DATE_SUCCESS',
      payload: {
          data: {
              results: [{ value: null}]
          }
      }
    };
    nextArgs = [];
    nextHandler(fakeNext)(action);
    expect(nextArgs[0]).toEqual([
        {
            type: 'GET_DATE_FAILURE',
            payload: Error('incomplete config'),
        }
    ]);
  });
  it('should handle responses for either of FETCH_ENCOUNTER_ROLE_SUCCESS or FETCH_ENCOUNTER_TYPE_SUCCESS when there is no result', () => {
    const action = {
      type: 'FETCH_ENCOUNTER_TYPE_SUCCESS',
      payload: {
          data: {
              results: []
          }
      }
    };
    nextArgs = [];
    nextHandler(fakeNext)(action);
    expect(nextArgs[0]).toEqual([
        {
            type: 'FETCH_ENCOUNTER_TYPE_FAILURE',
            payload: Error('incomplete config'),
        }
    ]);
  });
  it('should handle responses for either of FETCH_ENCOUNTER_ROLE_SUCCESS or FETCH_ENCOUNTER_TYPE_SUCCESS when there is a valid result', () => {
    const action = {
      type: 'FETCH_ENCOUNTER_TYPE_SUCCESS',
      payload: {
          data: {
              results: [{ value : ['some encounter']}]
          }
      }
    };
    nextArgs = [];
    nextHandler(fakeNext)(action);
    expect(nextArgs[0]).toEqual([
        {
            type: 'FETCH_ENCOUNTER_TYPE_SUCCESS',
            data: { value : ['some encounter']},
            payload: action.payload,
        }
    ]);
  });
  it('should handle responses for LOAD_PAST_ORDERS_SUCCESS when there is a valid result', () => {
    const action = {
      type: 'LOAD_PAST_ORDERS_SUCCESS',
      payload: {
          data: {
              results: [{}, {}],
              totalConut: 2,
          },
      },
      meta: {
          limit: 5,
          startIndex: 0,
      }
    };
    nextArgs = [];
    nextHandler(fakeNext)(action);
    expect(nextArgs[0]).toEqual([{pastOrdersResultCount: "Showing 1 to 5 of undefined entries", type: "PAST_ORDERS_RESULT_COUNT"}]);
  });
  it('should dispatch DISCONTINUE_ACTIVE_DRUG_ORDER after POST_DRUG_ORDER_SUCCESS when meta activity is set to DISCONTINUE', () => {
    const action = {
      type: 'POST_DRUG_ORDER_SUCCESS',
      payload: {
          data: {
              results: [{}, {}],
              totalConut: 2,
          },
      },
      meta: {
          activity: 'DISCONTINUE',
          orderNumber: 2,
      }
    };
    nextArgs = [];

    nextHandler(fakeNext)(action);
    expect(nextArgs[0]).toEqual([{"orderNumber": 2, "type": "DISCONTINUE_ACTIVE_DRUG_ORDER"}]);
  });
  it('should handle responses for all actions after promise has been resolved', () => {
    const action = {
      type: 'SOME_ACTION_TYPE',
      payload: {
          data: {
              results: [1, 2],
          },
      },
      meta: {
          soomeMeta: 5,
      }
    };
    nextArgs = [];
    nextHandler(fakeNext)(action);
    expect(nextArgs[0]).toEqual([{
        type: action.type,
        data: action.payload.data,
        ...action
    }
    ]);
  });
  it('should always pass the action to the next middleware if no conditions are met to be handled by it', () => {
    const action = {
      type: 'SOME_ACTION_TYPE',
    };
    nextArgs = [];
    nextHandler(fakeNext)(action);
    expect(nextArgs[0]).toEqual([{
        type: action.type
    }
    ]);
  });
  it('should dispatch SAVE_DRAFT_LAB_ORDER_SUCCESS',() => {
      const action = {
        type: 'SAVE_DRAFT_LAB_ORDER_SUCCESS',
        meta: {
            returnUrl: 'mockUrl'
        }
      }
      nextArgs = [],
      nextHandler(fakeNext)(action);
      expect(nextArgs[0]).toEqual([
          {
              type: 'DELETE_ALL_ITEMS_IN_DRAFT_LAB_ORDER'
          }
      ])
  })
});
