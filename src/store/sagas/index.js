import { all, fork } from 'redux-saga/effects';
import { watchSubmit } from './formSubmitSaga'

export default function* rootSaga() {
    yield all([
        fork(watchSubmit)
    ])
}