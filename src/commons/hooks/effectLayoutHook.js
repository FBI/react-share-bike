import React, { useState, useLayoutEffect } from 'react'
import './index.less'

export default () => {
    // useLayoutEffect 作用与useEffect一致，区别在于执行时机
    // useLayoutEffect 具有componentDidMount和componentDidUpdate的执行时机
    // useLayoutEffect 会阻塞页面渲染，如果用来执行耗时任务，页面会卡顿
    // useLayoutEffect 适用于根据新的UI进行DOM操作的场景
    // useLayoutEffect 会在页面渲染完成之前执行，也就是说页面渲染出来的是最终的效果，而useEffect会执行多次出现页面抖动多次
    const [ state, setState ] = useState(0)
    return (
        <div className='effectLayoutHook'>
            <p>{state}</p>
        </div>
    )
}