const ROUTINE = 'ROUTINE';
const STAT = 'STAT';

export default {
  ROUTINE,
  STAT,
};

export const DEFAULT_ENCOUNTER_REP = '(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),' +
  'obs:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,' +
  'groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,' +
  'groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers)))';

export const ORDER_REP = "custom:(id,uuid,display,orderNumber,dateActivated,scheduledDate,dateStopped,autoExpireDate,orderer,fulfillerStatus,orderType:(id,uuid,display,name),encounter:(id,uuid,display,encounterDatetime),careSetting:(uuid,name,careSettingType,display),accessionNumber,urgency,action,patient:(uuid,display),concept:(id,uuid,display,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType))";

export const CONCEPT_REP = "custom:(id,uuid,display,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType),set,setMembers:(id,uuid,display,set,setMembers:(id,uuid,display,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType)),names:(id,uuid,name,locale,localePreferred,voided,conceptNameType))";
