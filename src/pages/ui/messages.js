import React from 'react'
import { Card, Button, Message } from 'antd'
import './ui.less'

export default class Messages extends React.Component {
    showMessage(type) {
        Message[type]('快扶我起来，还可以继续学下去!')
    }
    render() {
        return (
            <div>
                <Card className='card-wrap'>
                    <Button type='primary' onClick={() => this.showMessage('success')}>Success</Button>
                    <Button type='primary' onClick={() => this.showMessage('info')}>InFO</Button>
                    <Button type='primary' onClick={() => this.showMessage('warning')}>Waring</Button>
                    <Button type='primary' onClick={() => this.showMessage('error')}>Error</Button>
                    <Button type='primary' onClick={() => this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        )
    }
}