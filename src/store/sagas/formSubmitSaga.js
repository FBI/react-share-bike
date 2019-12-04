import { put, fork, take, select } from 'redux-saga/effects'
import { submitSuccessAction, submitFailAction } from '../actions/formAction'
import { FORM_SUBMIT } from '../actions/actionTypes'
function* handleSubmit(data) {
    try {
      //const token = yield call(axios.get({ url: '' }))
      yield put(submitSuccessAction(data))
      const id = yield select(state => state.formReducer.id)
      console.log('从当前store中获取state的： ' + id)
    } catch(error) {
      yield put(submitFailAction(error))  
    }
  }
  
export function* watchSubmit(dispatch) { 
    while(true) {
      const { formData } = yield take(FORM_SUBMIT);
      yield fork(handleSubmit, formData)
    }
  }