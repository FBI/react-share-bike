import React from 'react'
import { Card, Form, Input, Button, Icon, Checkbox } from 'antd'
const FormItem = Form.Item

class FormLogin extends React.Component {
    handleSubmit() {
        const { getFieldsValue, validateFields } = this.props.form
        const userInfo = getFieldsValue()
        validateFields((err, values) => {
            !err && console.log(userInfo)
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Card title='行内表单之登录'>
                    <Form layout='inline'>
                        <FormItem><Input placeholder='请输入用户名' /></FormItem>
                        <FormItem><Input placeholder='请输入密码' /></FormItem>
                        <FormItem><Button type='primary'>提交</Button></FormItem>
                    </Form>
                </Card>
                <Card title='水平表单之登录'  style={{width: 300}}>
                    <Form layout='horizontal'>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        { required: true,message: '还没有输入用户名啊' },
                                        { min: 5, max: 11, message: '长度不在范围内啊，guys' },
                                        { pattern: new RegExp('^\\w+$','g'), message: '用户名必须为数字或字母' }
                                    ]
                                })(<Input prefix={<Icon type='user' />} placeholder='请输入用户名' />)
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('pwd', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '密码也是需要的啊'}]
                                })(<Input prefix={<Icon type='lock' />}  placeholder='请输入密码' type='password' />)
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('rememberPwd', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>记住密码</Checkbox>)
                            }
                            <Button style={{float: 'right'}}>忘记密码</Button>
                        </FormItem>
                        <FormItem><Button type='primary' onClick={() => this.handleSubmit()}>提交</Button></FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(FormLogin)