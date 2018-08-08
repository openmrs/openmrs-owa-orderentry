const isPromise = obj => Promise.resolve(obj) === obj;

export default function errorMiddleware() {
  return next => (action) => {
    // don't handle actions if payload ain't a Promise
    if (!isPromise(action.payload)) {
      return next(action);
    }
    /* add other options for formatting custom error messages here
    * using the format
    * if (action.type === 'DESIRED_TYPE_SUCCESS') {
    *  // logic here
    *  // remember to use a try-throw-catch pattern so it maps to error in reducer
    * }
    */
    // Dispatch initial pending promise, but catch any errors
    return next(action).catch((error) => {
      console.warn(`${action.type}_FAILURE - ${error}`); /*eslint-disable-line*/
      return error;
    });
  };
}
