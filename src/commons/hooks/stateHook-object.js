import React, { useState } from 'react'
import { Button } from 'antd'
import './index.less'

export default props => {
    let initialState = {name: 'wanghuang', age: 999, site: 'beijing'}
    const [ userInfo, refreshInfo ] = useState(initialState)
    const { name, age, site } = userInfo
    return <div className='stateCount'>
                <p>姓名：{name}</p>
                <p>年龄：{age}</p>
                <p>地点：{site}</p>
                <div>
                    <Button 
                        type="primary" 
                        onClick={() => refreshInfo(
                            prevState => ({
                                ...prevState,
                                ...{name: 'Charis-W', age: 18}
                            })
                        )}>
                            点击更新
                    </Button>
                </div>
           </div>
}