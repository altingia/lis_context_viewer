import { SELECT_GLOBAL_PLOT } from '../constants/actions';

export const selectedGlobalPlot = (state: any = {}, {type, payload}) => {
  switch(type) {
    case SELECT_GLOBAL_PLOT:
      return payload;
    default:
      return state;
  }
};
