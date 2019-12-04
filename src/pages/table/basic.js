import React from 'react'
import { Card, Table } from 'antd'
import fetchData from '../../utils/axios'
import utils from '../../utils/utils'

export default class BasicTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                }, 
                {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age',
                }, 
                {
                    title: '住址',
                    dataIndex: 'address',
                    key: 'address',
                }
            ],
            dataSource: [
                {
                    key: '1',
                    name: '火影忍者',
                    age: 32,
                    address: '西湖区湖底公园1号'
                }, 
                {
                    key: '2',
                    name: '海贼王',
                    age: 42,
                    address: '西湖区湖底公园1号'
                }
            ],
            dynamicColumns: [
                {
                    title:'id',
                    key:'id',
                    dataIndex:'id'
                },
                {
                    title: '用户名',
                    key: 'userName',
                    dataIndex: 'userName'
                },
                {
                    title: '性别',
                    key: 'gender',
                    dataIndex: 'gender',
                    render(val) {
                        return val === 1 ? '男' : '女'
                    }
                },
                {
                    title: '状态',
                    key: 'status',
                    dataIndex: 'status',
                    render(val) {
                        let config = {
                            '1': 'React-Native',
                            '2': 'Weex',
                            '3': 'Flutter',
                            '4': '微信小程序',
                            '5': '快应用'
                        }
                        return config[val]
                    }
                },
                {
                    title: '兴趣爱好',
                    key: 'interest',
                    dataIndex: 'interest',
                    render(val) {
                        let config = {
                            '1': 'Photograph',
                            '2': 'Maximal Exercise',
                            '3': 'Mountaineering',
                            '4': 'Archery',
                            '5': 'Coding',
                            '6': 'Dancing',
                            '7': 'Music',
                            '8': 'Traveling'
                        }
                        return config[val]
                    }
                },
                {
                    title: '生日',
                    key: 'birthday',
                    dataIndex: 'birthday'
                },
                {
                    title: '地址',
                    key: 'address',
                    dataIndex: 'address'
                },
                {
                    title: '早起时间',
                    key: 'time',
                    dataIndex: 'time'
                }
            ],
            dynamicDataResource: [],
            params: {
                pageNum: 1
            },
            pagination: {},
            rowSelection: {
                type: 'radio',
                selectedRowKeys: ''
            },
            rowCheckSelection: {
                type: 'checkbox',
                selectedRowKeys: '',
                onChange:(selectedRowKeys,selectedRows) => {
                    let rowCheckSelection = {...this.state.rowCheckSelection, selectedRowKeys }
                    this.setState({ rowCheckSelection })
                }
            }
        }
    }
    componentDidMount() {
        this.getTableList()
    }
    getTableList() {
        fetchData.ajax({
            url: '/table/list',
            data: {
                params: {
                    pageNum: this.state.params.pageNum
                }
            }
        }).then( res => {
            if(res.code === 0) {
                res.result.list.forEach((item,idx) => item.key = idx)
                this.setState({ 
                    dynamicDataResource: res.result.list,
                    pagination: utils.pagination(res.result,currentPage=> {
                        let params = {...this.state.params,pageNum: currentPage}
                        this.setState({ params })
                        this.getTableList()
                    })
                })
            }
        })
    }
    onRowClick(rowData, idx) {
       let rowSelection = {...this.state.rowSelection,selectedRowKeys:[idx]}
       //let obj = Object.assign({},this.state.rowSelection,{selectedRowKeys:[idx]})
       this.setState({ rowSelection })
    }
    render() {
        const { dynamicColumns,dynamicDataResource, rowSelection, rowCheckSelection, pagination, ...tableData } = this.state
        return (
            <div>
                <Card title='基础表格'>
                    <Table bordered  {...tableData} />
                </Card>
                <Card title='动态表格数据'>
                    <Table bordered panination={null} columns={dynamicColumns} dataSource={dynamicDataResource}  />
                </Card>
                <Card title='table-radio'>
                    <Table 
                        bordered 
                        panination={null} 
                        columns={dynamicColumns} 
                        dataSource={dynamicDataResource} 
                        rowSelection={rowSelection}
                        onRow={(rowData,idx) => {
                            return {
                                onClick:() =>{
                                    this.onRowClick(rowData,idx)
                                }
                            }
                        }}
                     />
                </Card>
                <Card title='table-checkbox'>
                    <Table 
                        bordered 
                        panination={null} 
                        columns={dynamicColumns} 
                        dataSource={dynamicDataResource} 
                        rowSelection={rowCheckSelection}
                     />
                </Card>
                <Card title='table-pagination'>
                    <Table 
                        pagination={pagination} 
                        columns={dynamicColumns} 
                        dataSource={dynamicDataResource} 
                     />
                </Card>
            </div>
        )
    }
}