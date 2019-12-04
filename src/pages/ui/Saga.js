import React, { Component, Fragment } from 'react'
import { Form, Icon, Input, Button, Card } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as formActionCreator from '../../store/actions/formAction'

class SagaPage extends Component {
      handleSubmit = e => {
        e.preventDefault();
        const { myFormAction,form } =  this.props
        form.validateFields((err, values) => {
            if (!err) {
                myFormAction.formSubmitAction(values)
            }
        });
      };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Fragment>
                <Card style={{width: 300}}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                className="login-form-button"
                                style={{display: 'block',margin: '10px auto'}}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Fragment>
        )
    }
}
//export default Form.create()(SagaPage)
const mapStateToProps = state => ({ ...state.formReducer })

const mapDispatchToProps = dispatch => {
    const myFormAction =  bindActionCreators(formActionCreator, dispatch)
    return {
        myFormAction
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SagaPage));