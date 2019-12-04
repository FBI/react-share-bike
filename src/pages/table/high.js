import React from 'react'
import { Card, Table, Button } from 'antd'

export default class HightTable extends React.Component {
    render() {
        const columns1 = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: 150,
                align: 'center'
            }, 
            {
                title: 'Age',
                dataIndex: 'age',
                width: 200,
                align: 'center'
            }, 
            {
                title: 'Address',
                dataIndex: 'address',
                width: 150,
                align: 'center'
            }
        ]
        const dataSource1 = [];
        for (let i = 0; i < 100; i++) {
            dataSource1.push({
                key: i,
                name: `Edward King ${i}`,
                age: 32,
                address: `London, Park Lane no. ${i}`,
            })
        }
        const columns2 = [
            {
                title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
            },
            {
                title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left',
            },
            { title: 'Column 1', dataIndex: 'address', key: '1' },
            { title: 'Column 2', dataIndex: 'address', key: '2' },
            { title: 'Column 3', dataIndex: 'address', key: '3' },
            { title: 'Column 4', dataIndex: 'address', key: '4' },
            { title: 'Column 5', dataIndex: 'address', key: '5' },
            { title: 'Column 6', dataIndex: 'address', key: '6' },
            { title: 'Column 7', dataIndex: 'address', key: '7' },
            { title: 'Column 8', dataIndex: 'address', key: '8' },
            {
                title: 'Action',
                key: 'operation',
                width: 100,
                render: () => <Button type='primary'>action</Button>,
            },
        ];
        const dataSource2 = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York Park',
            }, 
            {
                key: '2',
                name: 'Jim Green',
                age: 40,
                address: 'London Park',
            }
        ];
          
        return (
            <div>
                <Card title='table-固定表头'>
                    <Table 
                        bordered
                        columns={columns1} 
                        dataSource={dataSource1} 
                        pagination={{ pageSize: 50 }} 
                        scroll={{ y: 240 }} 
                    />
                </Card>
                <Card title='table-左侧固定'>
                    <Table 
                        bordered
                        columns={columns2} 
                        dataSource={dataSource2} 
                        pagination={{ pageSize: 50 }} 
                        scroll={{ x: 1300 }}                        
                        />
                </Card>
            </div>
        )
    }
}