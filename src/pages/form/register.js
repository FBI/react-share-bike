import React from 'react'
import { Card, Form, Input, Button, Radio, Select,
    Checkbox, Switch, DatePicker, TimePicker, Upload, Icon, InputNumber } 
from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea
class FormReg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarUrl: '',
            loading: false,
            formItemLayout: {
                labelCol: {
                    xs: 24,
                    sm: 4
                },
                wrapperCol: {
                    xs: 24,
                    sm: 12
                }
            },
            offsetLayout: {
                wrapperCol:{
                    xs:24,
                    sm:{
                        span:12,
                        offset:4
                    }
                }
            }
        }
    }
    handleUpload(avatarObj){
        if (avatarObj.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (avatarObj.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(avatarObj.file.originFileObj, imageUrl => this.setState({
                avatarUrl:imageUrl,
                loading: false,
            }));
        }
    }
    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleSubmit() {
        const { getFieldsValue, validateFields } = this.props.form
        const userInfo = getFieldsValue()
        validateFields((err, values) => {
            !err && console.log(userInfo)
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { formItemLayout, offsetLayout, avatarUrl } = this.state
        return (
            <div>
                <Card title='注册表单'>
                    <Form layout='horizontal'>
                        <FormItem label='用户名' {...formItemLayout }>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        { required: true,message: '还没有输入用户名啊' }
                                    ]
                                })(<Input placeholder='请输入用户名' />)
                            }
                        </FormItem>
                        <FormItem label='密码' {...formItemLayout }>
                            {
                                getFieldDecorator('pwd', {
                                    initialValue: '',
                                    rules: [
                                        { required: true,message: '没有密码怎么行哦' }
                                    ]
                                })(<Input placeholder='请输入密码' type='password' />)
                            }
                        </FormItem>
                        <FormItem label='性别' {...formItemLayout }>
                            {
                                getFieldDecorator('gender', {
                                    initialValue: '1',
                                })(
                                    <RadioGroup>
                                        <Radio value='1'>男</Radio>
                                        <Radio value='2'>女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label='年龄' {...formItemLayout }>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(<InputNumber />)
                            }
                        </FormItem>
                        <FormItem label='当前状态' {...formItemLayout }>
                            {
                                getFieldDecorator('currentStatus', {
                                    initialValue: '2'
                                })(
                                    <Select>
                                        <Option value='1'>在家打游戏</Option>
                                        <Option value='2'>正在搬砖</Option>
                                        <Option value='3'>无业游民</Option>
                                        <Option value='4'>吃喝玩乐</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='兴趣爱好' {...formItemLayout }>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: ['1', '4']
                                })(
                                    <Select mode='multiple'>
                                        <Option value='1'>Photograph</Option>
                                        <Option value='2'>Maximal Exercise</Option>
                                        <Option value='3'>Explore</Option>
                                        <Option value='4'>必须Coding啊</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='是否单身狗' {...formItemLayout }>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(<Switch />)
                            }
                        </FormItem>
                        <FormItem label='生日' {...formItemLayout }>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2019-04-04')
                                })(
                                    <DatePicker 
                                        showTime 
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label='联系地址' {...formItemLayout }>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '地球村'
                                })(
                                    <TextArea autosize={{minRows: 4,MaxRows: 6}} />
                                )
                            }
                        </FormItem>
                        <FormItem label='几点起床' {...formItemLayout }>
                            {
                                getFieldDecorator('time')(<TimePicker />)
                            }
                        </FormItem>
                        <FormItem label='上传头像' {...formItemLayout }>
                            {
                                getFieldDecorator('avatar')(
                                    <Upload 
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={avatarObj => this.handleUpload(avatarObj)}
                                    >
                                        {avatarUrl?<img src={this.state.avatarUrl} alt='' />:<Icon type="plus"/>}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('protocol')(
                                    <Checkbox>我已阅读<span>保密协议</span>并同意该协议</Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={() => this.handleSubmit()}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>

        )
    }
}
export default Form.create()(FormReg)