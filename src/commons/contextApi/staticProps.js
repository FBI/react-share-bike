import React, { Component, Fragment, createContext } from 'react'
import { Button } from 'antd'
const themeContext = createContext('primary') // 指定初始context值
const { Provider, Consumer } = themeContext
export default class Parent extends Component {
    render() {
        return (
            <Fragment>
                {/* Provider的value属性提供新的值 */}
                <Provider value='danger'>
                    <SonComponent {...this.props} />
                </Provider>
            </Fragment>
        )
    }
}
function SonComponent(props) {
    return <div>
                <ThemeButtonClass />
                { ThemeButton() }
           </div>
}
// 通过静态属性订阅context变化
class ThemeButtonClass extends Component {
    static contextType = themeContext
    render() {
        return (
            <Button type={this.context}>class组件-context订阅</Button>
        )
    }
}
// 通过Consumer给函数组件订阅context
function ThemeButton() {
    return (
        <Consumer>
            { value => <Button type={value}>function组件-context订阅</Button>}
        </Consumer>
    )
}