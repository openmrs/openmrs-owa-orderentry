/* eslint-disable import/prefer-default-export */
export const getConceptShortName = (concept, locale) => {
  let conceptName = null;
  const localeShort = locale ? (locale.split('_'))[0] : "en";

  if (concept) {
    if (concept.names){
      let foundConcept;
      // first, try to find the preferred SHORT name in the current locale
      foundConcept = concept.names.find(name =>
          !name.voided && name.conceptNameType === 'SHORT' && name.locale === localeShort && name.localePreferred
      );
      if (!foundConcept) {
        // try to find the SHORT name in the current locale
        foundConcept = concept.names.find(name =>
            !name.voided && name.conceptNameType === 'SHORT' && name.locale === localeShort
        );
      }
      if (!foundConcept) {
        // attempt to find the preferred name in the locale
        foundConcept = concept.names.find(name =>
            !name.voided && name.locale === localeShort && name.localePreferred
        );
      }
      if (!foundConcept) {
        // attempt to find the preferred short name in English
        foundConcept = concept.names.find(name =>
            !name.voided && name.conceptNameType === 'SHORT' && name.locale === 'en' && name.localePreferred
        );
      }
      if (!foundConcept) {
        // attempt to find any short name in English
        foundConcept = concept.names.find(name =>
            !name.voided && name.conceptNameType === 'SHORT' && name.locale === 'en'
        );
      }
      if (!foundConcept) {
        // fall back to display
        conceptName = concept.display;
      } else {
        conceptName = foundConcept.name;
      }
    }
  }
  return conceptName;
};
