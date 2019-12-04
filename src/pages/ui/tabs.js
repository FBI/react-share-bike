import React from 'react'
import { Card, Message, Tabs, Icon } from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane

export default class TabSwitch extends React.Component {
    constructor(props) {
        super(props)
        this.newTabIndex = 0;
        const panes = [
          { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
          { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
          {
            title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false,
          },
        ];
        this.state = {
          activeKey: panes[0].key,
          panes,
        };
    }
    handleTabChange(key) {
        Message.success('hi,已选择页答' + key)
    }
    onChange(activeKey){
        this.setState({ activeKey });
    }
    
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    
    add() {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: '新增tab' + activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }
    
    remove(targetKey) {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
            lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
            } else {
            activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    }
    render() {
        return (
            <div>
                <Card title='tab页签' className='card-wrap'>
                    <Tabs defaultActiveKey='1' onChange={key => this.handleTabChange(key)}>
                        <TabPane tab='Vue' key='1'>今天学习Vue框架</TabPane>
                        <TabPane tab='React' key='2'>明天学习React框架</TabPane>
                        <TabPane tab='Angular' key='3'>后天学习Angular框架</TabPane>
                    </Tabs>
                </Card>
                <Card title='tab页签(带图片)' className='card-wrap'>
                    <Tabs defaultActiveKey='1' onChange={key => this.handleTabChange(key)}>
                        <TabPane tab={<span><Icon type="frown" />Flutter</span>} key='1'>今天学习Flutter框架</TabPane>
                        <TabPane tab={<span><Icon type="meh" />ReactNative</span>} key='2'>明天学习ReactNative框架</TabPane>
                        <TabPane tab={<span><Icon type="smile" />Weex</span>} key='3'>后天学习Weex框架</TabPane>
                    </Tabs>
                </Card>
                <Card title='tab页签(动态增减)' className='card-wrap'>
                    <Tabs 
                        type='editable-card'
                        onChange={key => this.onChange(key)}
                        activeKey={this.state.activeKey}
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map( item => <TabPane tab={item.title} key={item.key} closable={item.closable}>{item.content}</TabPane>)
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}