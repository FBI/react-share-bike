import React from 'react'
import { Card, Table, Button, Modal, Form, Select, Input, Radio, DatePicker } from 'antd'
import utils from '../../utils/utils'
import fetchData from '../../utils/axios'
import BasicForm from '../../commons/basicForm'
import Moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

export default class UserManage extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            tableList: [],
            modalTile: '',
            isVisible: false,
            params: {
                page: 1
            }
        }
    }
    componentDidMount() {
        this.getTableList()
    }
    handleFormSubmit(formData) {
        this.getTableList()
    }
    getTableList() {
        fetchData.ajax({
            url: '/table/list1',
            flag: true,
            data: {
                params: {
                    page: this.state.pageNum
                }
            }
        }).then( res => {
            const { code, result } = res
            const { list } = result
            if(code === '0' || code === 0) {
                list.forEach((item,idx) => item.key = idx)
                this.setState({ 
                    tableList: list,
                    pagination: utils.pagination(res.result,currentPage=> {
                        let params = {...this.state.params,page: currentPage}
                        this.setState({ params })
                        this.getTableList()
                    })
                })
            }
        })
    }
    handleOperator(type) {
        let item = this.state.selectedRow
        if(type === 'create') {
            this.setState({
                type,
                modalTile: '创建员工',
                isVisible: true
            })
        }else if(['edit','detail'].includes(type)) {
            if(!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                modalTile: type === 'edit' ? '编辑' : '详情',
                isVisible: true
            })
        }else if(type === 'delete') {
            if(!item){
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            let that = this
            Modal.confirm({
                title:'确定要删除此用户吗？',
                onOk() {
                    fetchData.ajax({
                        url:'/user/delete',
                        flag: true,
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then( res =>{
                        if(res.code === 0){
                            that.setState({
                                isVisible:false
                            })
                            that.getTableList();
                        }
                    })
                }
            })
        }
    }
    selectRow(selectedRow, idx) {
        this.setState({ selectedRow })
    }
    handleModalSubmit() {
        // let userInfo = this.userFormObj.props.form.getFieldsValue()
    }
    formList = [
        {
            type:'INPUT',
            label:'用户名',
            field:'user_name',
            placeholder:'请输入用户名',
            initialValue:''
        },
        {
            type:'INPUT',
            label:'手机号',
            field:'user_mobile',
            placeholder:'请输入手机号',
            initialValue:''
        },
        {
            type:'DATE',
            label:'入职日期',
            field:'user_date',
            placeholder:'请请选择入职日期',
            initialValue:''
        }
    ]
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex === 1 ?'男':'女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子一枚',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '联系地址',
                dataIndex: 'address'
            }
        ]
        const { tableList, selectedRow, type, pagination, modalTile, isVisible } = this.state
        return (
            <div>
                <Card>
                    <BasicForm
                        formList={this.formList}
                        filterSubmit={formData => this.handleFormSubmit(formData)}
                    />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperator('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={()=>this.handleOperator('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={()=>this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon="delete" onClick={()=>this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <div className='content-wrap'>
                    <Table 
                        columns={columns}
                        dataSource={tableList}
                        onRow={(rowData,idx) => {
                            return {
                                onClick:() => {
                                    this.selectRow(rowData,idx)
                                }
                            }
                        }}
                        pagination={pagination}
                    />
                </div>
                <Modal 
                    title={modalTile}
                    visible={isVisible}
                    footer={type === 'detail' ? null : true}
                    onOk={() => this.handleModalSubmit()}
                    onCancel={() => {
                        this.userFormObj.props.form.resetFields()
                        this.setState({ isVisible: false, selectedRow: ''})
                    }}
                >
                    <UserForm userInfo={selectedRow} type={type} wrappedComponentRef={val => this.userFormObj = val} />
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component {
    getState(state) {
        return {
            '1':'咸鱼一条',
            '2':'风华浪子',
            '3':'北大才子一枚',
            '4':'百度FE',
            '5':'创业者'
        }[state]
    }
    render() {
        const { form, userInfo, type } = this.props
        const { getFieldDecorator } = form
        let formItemLayout = {
            labelCol: {
                span: 3
            },
            wrapperCol: {
                span: 16
            }
        }
        return <Form label='horizontal'>
                    <FormItem label='姓名' {...formItemLayout}>
                        {
                            userInfo && type ==='detail'?userInfo.username:
                            getFieldDecorator('user_name',{
                                initialValue: userInfo.username
                            })(
                                <Input type="text" placeholder="请输入姓名"/>
                            )
                        }
                    </FormItem>
                    <FormItem label='性别' {...formItemLayout}>
                        {
                            userInfo && type === 'detail'?userInfo.sex === 1?'男':'女':
                            getFieldDecorator('sex',{
                                initialValue: userInfo.sex
                            })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem label='状态' {...formItemLayout}>
                        {
                            userInfo && type === 'detail'?this.getState(userInfo.state):
                            getFieldDecorator('state',{
                                initialValue: userInfo.state
                            })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子一枚</Option>
                                <Option value={4}>百度FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="生日" {...formItemLayout}>
                        {
                            userInfo && type === 'detail'?userInfo.birthday:
                            getFieldDecorator('birthday',{
                                initialValue: Moment(userInfo.birthday)
                            })(
                            <DatePicker />
                        )}
                    </FormItem>
                    <FormItem label="联系地址" {...formItemLayout}>
                        { 
                            userInfo && type === 'detail'?userInfo.address:
                            getFieldDecorator('address',{
                                initialValue: userInfo.address
                            })(
                            <Input.TextArea rows={3} placeholder="请输入联系地址"/>
                        )}
                    </FormItem>
               </Form>
    }
}
UserForm = Form.create({})(UserForm)