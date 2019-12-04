import React from 'react'
import { Card, Spin, Icon, Alert } from 'antd'
import './ui.less'

export default class Loadings extends React.Component {
    render() {
        const SpinIcon = <Icon type='car' style={{fontSize: 24}} />
        return (
            <div>
                <Card title='各种spin菊花玩法' className='card-wrap'>
                    <Spin size='small' />
                    <Spin style={{margon: '0 10px'}} />
                    <Spin size='large' />
                    <Spin indicator={SpinIcon} style={{marginLeft: 10}} spinning={true} />
                </Card>
                <Card title='内容遮罩' className='card-wrap'>
                    <Alert
                        type='info'
                        message='Hello React'
                        description='A JavaScript library for building user interfaces'
                    />
                    <Alert
                        type='warning'
                        message='Hei React-Native'
                        description='Build native mobile apps using JavaScript and React'
                    />
                    <Spin tip='玩命加载中...'>
                        <Alert
                            type='error'
                            message='What is Weex'
                            description='Weex 是使用流行的 Web 开发体验来开发高性能原生应用的框架。'
                        />
                    </Spin>
                    
                </Card>
            </div>
        )
    }
}