import React from 'react'
import { Card, Button, Table, Modal } from 'antd'
import BasicForm from '../../commons/basicForm'
import utils from '../../utils/utils'
import fetchData from '../../utils/axios'

export default class OrderManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            params: {
                page: 1
            },
            pagination: {},
            tableList: [],
            rowSelection: {
                type: 'radio',
                columnWidth: 80,
                columnTitle: '请选择',
                selectedRowKeys: ''
            }
        }
    }
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            optionList: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '1',
            optionList: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]
    componentDidMount() {
        this.getTableList()
    }
    handleFilter(params) {
        this.params = params;
        this.getTableList();
    }
    getTableList() {
        fetchData.ajax({
            url: '/order/list',
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
    onRowClick(rowData,idx) {
        let rowSelection = {...this.state.rowSelection, selectedRowKeys: [idx]}
        this.setState({ rowSelection, rowData })
    }
    toOrderDetail() {
        let item = this.state.rowData;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        let orderId = item.id
        window.open(`/#/common/order/detail/${orderId}`,'_blank')
    }
    render() {
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const { tableList, pagination, rowSelection } = this.state
        return (
            <div>
                <Card>
                    <BasicForm formList={this.formList} handleFilter={this.handleFilter} />
                </Card>
                <Card>
                    <Button type='primary' onClick={() => this.toOrderDetail()}>订单详情</Button>
                </Card>
                <div className='content-wrap'>
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={tableList}
                        rowSelection={rowSelection}
                        pagination={pagination}
                        onRow={(rowData, idx) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(rowData, idx)
                                }
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}
