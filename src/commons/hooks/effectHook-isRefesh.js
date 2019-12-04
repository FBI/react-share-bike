import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import './index.less'

export default () => {
    // * useEffect 用来执行副作用和清理操作
    // * useEffect 同时具备componentDidMount、componentDidUpdate和componentWillUnmount三个生命周期函数的执行时机
    // * useEffect的第一个参数内可以return 另一个函数，该函数在下一次执行Effect时调用
    // * useEffect的第二个参数是一个数组，里面可以传入state或者props，当前state或者props发生变化时都会执行Effect
    // * useEffect的第二个参数如果是一个空数组，则Effect只会在组件挂载和卸载的时候才会执行，类似componentDidMount和ComponentWillUnmount
    // * useEffect 在DOM渲染完成之后执行，不会阻塞浏览器的绘制任务, 也就是异步执行
    const [ state, setState ] = useState(20)
    useEffect(() => {
       console.log('state发生变化的时候再会执行Effect')
    }, [state])
    return (
        <div className="effectHook">
            <p>{state}</p>
            <Button type="primary" onClick={() => setState(state + 1)}>使劲点我</Button>
        </div>
    )
}