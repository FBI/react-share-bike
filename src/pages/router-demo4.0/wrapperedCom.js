import React from 'react'

export default class WrapperedCom extends React.Component {
    render() {
        return <div>wa,这是关于页面里的嵌套路由啊{this.props.match.params.val}</div>
    }
}