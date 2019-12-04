import React, { useState } from 'react'
import { Button } from 'antd'
import './index.less'

export default props => {
    const [state, setState] = useState(() => {
        return {
            title: 'React新特性之hooks',
            content: '学点新东西'
        }
    })
    const { title, content } = state
    return <div className='stateCount'>
                <p>{title}</p>
                <p>{content}</p>
                <div>
                    <Button 
                        type="primary" 
                        onClick={() => setState({...state, ...{title: 'React高级特性之Hooks', content: 'Learing Hooks'}})}
                    >
                        点击更新
                    </Button>
                </div>
           </div>
}