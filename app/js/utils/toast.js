import toastr from 'toastr';

export const successToast = message => toastr.success(message);
export const errorToast = message => toastr.error(message);
