import axiosInstance from '../config';

const ORDER_REP = "custom:(id,uuid,display,orderNumber,dateActivated,scheduledDate,dateStopped,autoExpireDate,orderType:(id,uuid,display,name),encounter:(id,uuid,display,encounterDatetime),careSetting:(uuid,name,careSettingType,display),accessionNumber,urgency,action,patient:(uuid,display),concept:(id,uuid,display,names:(id,uuid,name,locale,localePreferred,voided,conceptNameType))";

const activeOrderAction = (
  limit,
  startIndex,
  patientUuid,
  careSetting,
  sort = 'desc',
) => dispatch => dispatch({
  type: 'FETCH_ACTIVE_ORDER',
  payload: axiosInstance.get(`/order?totalCount=true&sort=${sort}&status=active&limit=${limit}&startIndex=${startIndex}&careSetting=${careSetting}&patient=${patientUuid}&t=drugorder&v=full`),
  meta: {
    limit,
    startIndex,
  },
});

export default activeOrderAction;

