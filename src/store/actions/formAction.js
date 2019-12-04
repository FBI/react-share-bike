import * as Types from './actionTypes'
export const formSubmitAction = formData => ({
    type: Types.FORM_SUBMIT,
    formData
})
export const submitSuccessAction = data => ({
    type: Types.SUBMIT_SUCCESS,
    data
})
export const submitFailAction = error => ({
    type: Types.SUBMIT_FAIL
})