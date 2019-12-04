import React from 'react'
import { Card, Button, Table, Select, Form, Modal, Message } from 'antd'
import fetchData from '../../utils/axios'
import utils from '../../utils/utils'
import formatter from '../../utils/formatter'
import FilterForm from './filterForm'
import './index.less'
const FormItem = Form.Item
const Option = Select.Option

export default class CityManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            params: {
                page: 1
            },
            pagination: {},
            tableList: [],
            isShowOpenCity: false
        }
    }
    componentDidMount() {
        this.getTableList()
    }
    getTableList() {
        fetchData.ajax({
            url: '/open_city',
            flag: true,
            data: {
                params: {
                    page: this.state.pageNum
                }
            }
        }).then( res => {
            if(res.code === '0') {
                res.result.item_list.forEach((item,idx) => item.key = idx)
                this.setState({ 
                    tableList: res.result.item_list,
                    pagination: utils.pagination(res.result,currentPage=> {
                        let params = {...this.state.params,page: currentPage}
                        this.setState({ params })
                        this.getTableList()
                    })
                })
            }
        })
    }
    openCityModal() {
        this.setState({
            isShowOpenCity: true
        })
    }
    openCitySubmit() {
        const { getFieldsValue, validateFields } = this.cityForm.props.form
        const cityInfo = getFieldsValue()
        validateFields((err, values) => {
            if(!err) {
                fetchData.ajax({
                    url:'/city/open',
                    flag: true,
                    data:{
                        params:cityInfo
                    }
                }).then((res)=>{
                    if(res.code === '0'){
                        Message.success('开通成功');
                        this.setState({
                            isShowOpenCity:false
                        })
                        this.getTableList();
                    }
                })
            }
        })
    }
    render() {
        const { tableList, pagination,isShowOpenCity } = this.state
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            }, 
            {
                title: '城市名称',
                dataIndex: 'name'
            }, 
            {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode){
                    return mode === 1 ?'停车点':'禁停区';
                }
            }, 
            {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode === 1 ? '自营' : '加盟';
                }
            }, 
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, 
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            }, 
            {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, 
            {
                title: '操作时间',
                dataIndex: 'update_time',
                render: formatter.formateTime
            }, 
            {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card>
                    <Button type='primary' onClick={() => this.openCityModal()}>开通城市</Button>
                </Card>
                <div className='content-wrap'>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={tableList}
                        pagination={pagination}
                    />
                </div>
                <Modal 
                    title='开通城市'
                    visible={isShowOpenCity}
                    onOk={() => this.openCitySubmit()}
                    onCancel={() => this.setState({ isShowOpenCity: false})}
                >
                    <OpenCityForm wrappedComponentRef={val => this.cityForm = val} />
                </Modal>
            </div>
        )
    }
}

class OpenCityForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 10
            }
        }
        return (
            <div>
                <Form layout='horizontal'>
                    <FormItem label="选择城市" {...formItemLayout}>
                        {
                            getFieldDecorator('city_id',{
                                initialValue:'1'
                            })(
                                <Select>
                                    <Option value="">全部</Option>
                                    <Option value="1">北京市</Option>
                                    <Option value="2">天津市</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="营运模式" {...formItemLayout}>
                        {
                            getFieldDecorator('op_mode', {
                                initialValue: '1'
                            })(
                                <Select>
                                    <Option value="1">自营</Option>
                                    <Option value="2">加盟</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="用车模式" {...formItemLayout}>
                        {
                            getFieldDecorator('use_mode', {
                                initialValue: '1'
                            })(
                                <Select>
                                    <Option value="1">指定停车点</Option>
                                    <Option value="2">禁停区</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </Form>
            </div>
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm)  