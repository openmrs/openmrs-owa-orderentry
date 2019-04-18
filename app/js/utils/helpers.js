
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