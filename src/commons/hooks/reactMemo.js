import React, { memo, useMemo } from 'react'
import { Button } from 'antd'
import './index.less'
// 利用react.memo与useMemo实现shouldComponentUpdate的作用
const Parent = React.memo(({a, b}) => {
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
})
export default Parent