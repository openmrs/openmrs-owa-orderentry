/* eslint-disable import/prefer-default-export */
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
