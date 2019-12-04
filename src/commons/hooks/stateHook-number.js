import React, { useState } from 'react'
import { Button } from 'antd'
import './index.less'

export default props => {
    const [ num, increaseNum ] = useState(10)
    return <div className='stateCount'>
                <p>{num}</p>
                <div><Button type="primary" onClick={() => increaseNum(num + 1)}>点击增加</Button></div>
           </div>
}