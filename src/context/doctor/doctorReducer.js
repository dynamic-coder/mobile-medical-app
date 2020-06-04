import {
  ADD_DOCTOR,
  GET_DOCTOR,
  UPDATE_DOCTOR,
  DELETE_DOCTOR,
  GET_ONE_DOCTOR,
  GET_CURRENT_USER,
  GET_FULL_USER
} from '../type';

export default (state, action) => {
  switch (action.type) {
    case GET_DOCTOR:
      return {
        ...state,
        doctor: action.payload.data
      };
    case GET_ONE_DOCTOR:
      return { ...state, oneDoctor: action.payload.data };
    default:
      return state;
  }
};
