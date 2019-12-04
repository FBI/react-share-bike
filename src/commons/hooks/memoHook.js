import React, { useMemo } from 'react'
import { Button } from 'antd'
import './index.less'
// useMemo缓存的是方法的返回值，同时避免子组件无意义的重复渲染
export default function Parent({a, b}) {
    // 当前a变化时，才会重新渲染childOne
    const childOne = useMemo(() => <Child1 a={a} />, [a])
    // 当前b变化时，才会重新渲染childTwo
    const childTwo = useMemo(() => <Child2 b={b} />, [b])
    return (
        <div>
            {childOne}
            {childTwo}
        </div>
    )
}