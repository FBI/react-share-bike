import React from 'react'
import { Row, Col } from 'antd'
import './index.less'
import formatter from '../../utils/formatter'
import Axios from '../../utils/axios'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sysTime: '',
			dayPictureUrl: '',
			weather: '',
			wind: ''
		}
	}
	componentWillMount() {
		this.clearTimer = setInterval(() => {
			let sysTime = formatter.formateTime(new Date())
			this.setState(() => ({ sysTime }))
		}, 1000)
		this.getWeatherData()
	}
	getWeatherData() {
		let city = encodeURIComponent('北京')
		let url = 'http://api.map.baidu.com/telematics/v3/weather?location=' + city +'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
		Axios.handleJsonp({ url }).then( res => {
			const { dayPictureUrl, weather, wind } = res[0].weather_data[0]
			this.setState({
				dayPictureUrl,
				weather,
				wind
			})
		})
	}
	componentWillUnmount() {
		clearTimeout(this.clearTimer)
	}
	render() {
		const{ dayPictureUrl, weather, wind, sysTime } = this.state
		const { menuType } = this.props
		return <div className='header'>
					<Row className='header-top'>
					    {
							menuType ? <Col span={6} className='logo'>
											<img src="/assets/logo-ant.svg" alt=""/>
                                			<span>共享单车后台管理系统</span>
									   </Col>
									 : ''
						}
						<Col span={menuType ? 16 : 24}>
							<span>欢迎，wanghunag</span>
							<span style={{marginLeft: 10}}>退出</span>
						</Col>
					</Row>
					<Row className='breadcrumb'>
						{
							menuType ? ''
									 : <div>
											<Col span={4} className='breadcrumb-title'>首页</Col>
											<Col span={20} className='weather-date'>
													<span className='date'>{sysTime}</span>
													<img src={dayPictureUrl} alt='' />
													<span className='weather'>{weather}</span>
													<span>{wind}</span>
											</Col>
									    </div>
						}
					</Row>
		       </div>
	}
}