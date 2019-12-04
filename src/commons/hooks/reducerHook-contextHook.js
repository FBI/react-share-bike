import React, { useReducer, useContext, createContext } from 'react'
import { Button } from 'antd'
import './index.less'
import useWindowWidth from './customizeHook'
const DispathContext = createContext(null)
const StateContext = createContext(null)

export default () => {
    const [state, dispatch] = useReducer(todosReducer, initialState)
    return (
        <DispathContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <DeepChild />
            </StateContext.Provider>
        </DispathContext.Provider>
    )
}
let initialState = {
    title: '玩转各种Hooks',
    content: 'React高级特性之Hooks'
}
function todosReducer(state = initialState, action) {
    const { type, title, content } = action
    switch(type) {
        case 'add':
            return { ...state, ...{ title }};
        case 'clear':
            return { ...state, ...{ content }};
        default:
            throw new Error('啊哦，出借了')
    }
}
function DeepChild() {
    let todoDispatch = useContext(DispathContext)
    let todoState = useContext(StateContext)
    let windowWidth = useWindowWidth()
    let addFunc = () => {
        todoDispatch({
            type: 'add',
            title: 'useReducer结合useContex模拟redux'
        })
    }
    let clearFunc = () => {
        todoDispatch({
            type: 'clear',
            content: 'React新增高级特性之Hooks'
        })
    }
    return (
        <div className='reduxHook'>
            <h2>自定义Hook监听窗口变化：{windowWidth}</h2>
            <h2 className='title'>{todoState.title}</h2>
            <h2 className='content'>{todoState.content}</h2>
            <Button type="primary" onClick={() => addFunc()}>dispatchAdd</Button>
            <Button type="danger" onClick={() => clearFunc()}>dispatchClear</Button>
        </div>
    )
}