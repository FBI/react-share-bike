import React, { useState, useCallback } from 'react'
import { Button } from 'antd'
import './index.less'
// * useCallback在相关依赖不变的情况下会缓存相同方法的引用，避免子组件无意义的重复渲染渲染
export default () => {
    const [ state ] = useState(0)
    const memorizeHandleClick = useCallback(() => {
        console.log(`click happened with dependency: ${state}`)
    }, [state])
    return (
        <div className='callbackHook'>
            <h2>{state}</h2>
            <Button type="primary" onClick={memorizeHandleClick}>clicked times</Button>
        </div>
    )
}