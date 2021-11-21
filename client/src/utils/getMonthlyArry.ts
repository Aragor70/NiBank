import moment from "moment";

export default (dates: any, token: any) => {
  return dates.reduce(function(val: any, obj: any) {
    let comp: any = moment(obj.created_on).format(token) || "";
    
    (val[comp] = val[comp] || []).push(obj);
    return val;
  }, {});
}
