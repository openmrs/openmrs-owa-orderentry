const toastr = {
  success: (message) => {
    global.toastrMessage = message;
  },
  error: (message) => {
    global.toastrMessage = message;
  },
};

export default toastr;
