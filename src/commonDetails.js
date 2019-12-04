import React, { Fragment } from 'react'
import { Row } from 'antd'
import Header from './commons/Header'

export default class CommonDetails extends React.Component {
	render() {
		return (
			<Fragment>
				<Row className='simple-page'>
					<Header menuType='second' />
				</Row>
				<Row className='container'>
					{ this.props.children }
				</Row>
			</Fragment>
		)
	}
}

