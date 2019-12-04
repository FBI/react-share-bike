import React from 'react'
import { Button, Card, Radio } from 'antd'
import './ui.less'
export default class Buttons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            btnSize: 'default'
        }
    }
    closeLoading() {
        this.setState({ isLoading: false })
    }
    changeBtnSize(evt) {
        this.setState({
            btnSize: evt.target.value
        })
    }
    render() {
        return (
            <div>
                <Card title='基础组件' className='card-wrap'>
                    <Button type='primary'>React</Button>
                    <Button>Vue</Button>
                    <Button type='dashed'>Angular</Button>
                    <Button type='danger'>ReactNative</Button>
                    <Button type='disabled'>Flutter</Button>
                </Card>
                <Card title='图形按钮' className='card-wrap'>
                    <Button icon='plus'>创建</Button>
                    <Button icon='edit'>编辑</Button>
                    <Button type='delete'>删除</Button>
                    <Button shape='circle' icon='search'></Button>
                    <Button type='primary' icon='search'>搜索</Button>
                    <Button type='primary' icon='download'>下载</Button>
                </Card>
                <Card title='Loading按钮' className='card-wrap'>
                    <Button type="primary" loading={this.state.isLoading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.isLoading}></Button>
                    <Button loading={this.state.isLoading} >点击加载</Button>
                    <Button shape="circle" loading={this.state.isLoading}></Button>
                    <Button type="primary" onClick={() => this.closeLoading()}>关闭</Button>
                </Card>
                <Card title='按钮组'>
                    <Button.Group>
                        <Button type='primary' icon='left'>返回</Button>
                        <Button type='primary' icon='right'>前进</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={this.state.btnSize} onChange={evt => this.changeBtnSize(evt)}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group> 
                    <Button type="primary" size={this.state.btnSize}>Imooc</Button>
                    <Button size={this.state.btnSize}>Imooc</Button>
                    <Button type="dashed" size={this.state.btnSize}>Imooc</Button>
                    <Button type="danger" size={this.state.btnSize}>Imooc</Button>
                </Card>
            </div>
        )
    }
}