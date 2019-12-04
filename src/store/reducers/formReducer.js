
import * as Types from '../actions/actionTypes';

const initialState = {
  userName: '',
  password: '',
  id: 8956
};

export default (state = initialState, action) => {
  const { type, data } = action
  switch (type) {
    case Types.SUBMIT_SUCCESS:
      return { ...state, ...data }
    default:
      return state;
  }
}