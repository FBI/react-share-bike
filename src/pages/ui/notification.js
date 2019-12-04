import React from 'react'
import { Card, Button, Notification } from 'antd'
import './ui.less'

export default class Notifications extends React.Component {
    handleNotice(type, placement) {
        placement && Notification.config({ placement })
        Notification[type]({
            message: 'Design beautiful apps',
            description: 'Quickly ship features with a focus on native end-user experiences.'
        })
    }
    render() {
        return (
            <div>
                <Card className='card-wrap'>
                    <Button type='primary' onClick={() => this.handleNotice('success','topLeft')}>Success</Button>
                    <Button type='primary' onClick={() => this.handleNotice('info','topRight')}>Info</Button>
                    <Button type='primary' onClick={() => this.handleNotice('warning','bottomLeft')}>Warning</Button>
                    <Button type='primary' onClick={() => this.handleNotice('error','bottomRight')}>Error</Button>
                </Card>
            </div>
        )
    }
}