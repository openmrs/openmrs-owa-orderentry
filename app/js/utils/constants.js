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
