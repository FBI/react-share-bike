import React, { useState, useRef, useEffect } from 'react'
import { Input, Button } from 'antd'
import './index.less'
// * useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）
// * 返回的 ref 对象在组件的整个生命周期内保持不变，可以很方便地保存任何可变值
// * 变更 .current 属性不会引发组件重新渲染
// * useRef() 创建的是一个普通的 Javascript 对象，并且每次渲染返回的都是同一个对象
// ! 在理解 useRef 之前，我们一定要清楚的是对于函数组件而言，每一次状态的改变都是会重新触发 render。也就是说，我们在组件状态变化的时候拿到的值已经是一个全新的数据，只是 react 帮我们记住了之前的数据
// ! 利用 ref 对象的这个特性，我们可以实现：
// * 只在更新时运行 effect
// * 获取上一轮的 props 或 state
// * 访问子组件变得很容易
export default () => {
    const [ state, setState ] = useState(0)
    const inpRef = useRef(0)
    useEffect(() => {
        //inpRef.current.focus()
        inpRef.current = state  
    })
    const prevState = inpRef.current
    return <div className='refHook'>
                <h2>current：{state}&nbsp;&nbsp;before: {prevState}</h2>
                <Input className='inp' ref={inpRef} type='text' value={state} /><br/>
                <Button type='danger' onClick={() => setState( state + 1 )}>疯狂点击</Button>
           </div>
}