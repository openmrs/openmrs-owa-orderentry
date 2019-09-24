
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

export const getConceptShortName = (concept, locale) => {
  let conceptName;
  const localeShort = locale ? (locale.split('_'))[0] : "en";

  if (concept) {
    if (concept.names && concept.names.length > 0) {
      let foundConcept;
      // first, try to find the SHORT name in the current locale
      foundConcept = concept.names.find(name => (!name.voided && name.conceptNameType === 'SHORT' && name.locale === localeShort));

      if (typeof foundConcept === 'undefined' || foundConcept == null) {
        // attempt to find the preferred name in the locale
        foundConcept = concept.names.find(name => (
          !name.voided && name.locale === localeShort && name.localePreferred));
      }
      if (typeof foundConcept === 'undefined' || foundConcept == null) {
        // could not find any locale preferred name
        conceptName = concept.display;
      } else {
        conceptName = foundConcept.name;
      }
    }
  }
  return conceptName;
};
