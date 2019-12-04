import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class About extends React.Component {
    render() {
        return (
            <div style={{border: '1px solid cyan',height: '300px'}}>
                <div>about页面,路由参数id的值为{this.props.match.params.id}</div>
                <Link to="/about/aaa/helloReact">点击加载嵌套路由</Link>
                {this.props.children}
            </div>
        )
    }
}
export default withRouter(About)