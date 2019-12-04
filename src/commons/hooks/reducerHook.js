import React, { useReducer } from 'react'
import { Button } from 'antd'

let initialState = {
    count: 10,
    name: 'Charis-W'
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'increasement':
            return { ...state, ...{count: state.count + 1} };
            break;
        case 'decreasement':
            return { ...state, ...{count: state.count - 1} };
            break;
        case 'reset':
            return { ...state, count: 10 }
        default:
            throw new Error('啥也没有啊');
    }
}
export default () => {
    const [state, dispatch] = useReducer(reducer, initialState )
    return (
        <div>
            <div>name：{state.name}&nbsp;&nbsp;count: {state.count}</div>
            <Button type='primary' onClick={() => dispatch({type: 'reset'})}>reset</Button>
            <Button type='danger' onClick={() => dispatch({type: 'increasement'})}>increase</Button>
            <Button type='dashed' onClick={() => dispatch({type: 'decreasement'})}>decrease</Button>
        </div>
    )
}