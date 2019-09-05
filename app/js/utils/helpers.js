
export const dateToInt = dateStr => new Date(dateStr).getTime();

export const getDateRange = (
  data,
  from,
  to,
  path,
) => data.filter((item) => {
  if (item[path]) {
    return (dateToInt(from) <= dateToInt(item[path])) && (dateToInt(to) >= dateToInt(item[path]));
  }
  return true;
});

// encapsulates our logic as to whether or not a order is cancellable or editable
// in the future we will likely want to tweak these and/or make them more configurable
export const isCancellable = order => order.type === 'drugorder' ||
  (order.type === 'testorder' && (!order.fulfillerStatus || !['IN_PROGRESS', 'COMPLETED'].includes(order.fulfillerStatus)));

export const isEditable = order => order.type === 'drugorder';
