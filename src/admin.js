import React from 'react'
import { Row, Col } from 'antd'
import Header from './commons/Header'
import Footer from './commons/Footer'
import NavLeft from './commons/NavLeft'   
import './common.less'
//import Home from './pages/Home'
// https://reacttraining.com/react-router/web/example/basic
// axios二次封装 https://segmentfault.com/a/1190000016474460
export default class Admin extends React.Component {
	render() {
		return (
			<Row className="container">
				<Col span={3} className="navLeft">
					<NavLeft />
				</Col>
				<Col span={21} className="main">
					<Row><Header /></Row>
					<Row className="dynamic-content">
						{ this.props.children }
					</Row>
					<Row><Footer /></Row>
				</Col>
			</Row>
		)
	}
}