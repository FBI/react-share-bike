import React from 'react'
import { Button, Form, Select,Input, Checkbox, DatePicker } from 'antd'
import utils from '../../utils/utils'
const FormItem = Form.Item


 class BasicForm extends React.Component {
    initFormItems() {
        const { formList } = this.props
        const { getFieldDecorator } = this.props.form
        const formItems = []
        if (formList && formList.length) {
            formList.forEach((item,idx) => {
                const { type, label, field, initialValue, placeholder } = item
                switch(type) {
                    case '时间查询':
                            const begin_time = <FormItem label="订单时间" key={field}>
                                {
                                    getFieldDecorator('begin_time')(
                                        <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                                    )
                                }
                            </FormItem>;
                            formItems.push(begin_time)
                            const end_time = <FormItem label="~" colon={false} key={field}>
                                {
                                    getFieldDecorator('end_time')(
                                        <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                                    )
                                }
                            </FormItem>;
                            formItems.push(end_time)
                            break;
                    case '城市':
                            const city = <FormItem label='城市' key={field}>
                            {
                                getFieldDecorator(field, {
                                    initialValue
                                })(
                                    <Select
                                        style={{width: 80}}
                                        placeholder={placeholder}
                                    >
                                        { utils.getOptionList(item.list) }
                                    </Select>
                                )
                            }
                        </FormItem>;
                        formItems.push(city)
                        break;    
                    case 'DATE':
                            const DATE = <FormItem label={label} key={field}>
                                {
                                    getFieldDecorator(field)(
                                        <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD"/>
                                    )
                                }
                            </FormItem>;
                            formItems.push(DATE)
                            break;
                    case 'SELECT':
                            const SELECT = <FormItem label={label} key={field}>
                                {
                                    getFieldDecorator(field, {
                                        initialValue
                                    })(
                                        <Select
                                            placeholder={placeholder}
                                        >
                                            { utils.getOptionList(item.list) }
                                        </Select>
                                    )
                                }
                            </FormItem>;
                            formItems.push(SELECT)
                            break;
                    case 'INPUT':
                            const INPUT = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, {
                                    initialValue
                                })(
                                    <Input placeholder={placeholder} />
                                )
                            }
                        </FormItem>;
                        formItems.push(INPUT)
                        break;
                    case 'CHECKBOX':
                            const CHECKBOX = <FormItem label={label} key={field}>
                                {
                                    getFieldDecorator([field], {
                                        valuePropName: 'checked',
                                        initialValue //true | false
                                    })(
                                        <Checkbox> {label} </Checkbox>
                                    )
                                }
                            </FormItem>;
                            formItems.push(CHECKBOX)
                            break;
                    default:
                            
                }
            })
        }
        return formItems
    }
    handleFilterSubmit() {
       const { getFieldsValue } = this.props.form
        this.props.filterSubmit(getFieldsValue());
    }

    reset = ()=>{
        this.props.form.resetFields();
    }
    render() {
        return (
            <Form layout="inline">
                { this.initFormItems() }
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={() => this.handleFilterSubmit()}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create({})(BasicForm)