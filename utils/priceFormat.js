import { currencySign } from "./currency";

export const currencyFormatter = (number) => {
    var str=number?.toString();
    var resStr=str?.substring(0,str?.length-2)+"."+str?.substring(str?.length-2);
    return resStr === 'N.aN' ? 0 : resStr;
  }
