import React, { Fragment } from 'react'
import { Menu } from 'antd';
import './index.less';
import menuList from '../../config/menuConfig'
import { NavLink } from 'react-router-dom'
const SubMenu = Menu.SubMenu;

export default class NavLeft extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuTreeNode: []
        }
    }
    componentWillMount() {
        let menuTreeNode = this.handleMenuList(menuList)
        this.setState(() => ({ menuTreeNode }))
    }
    handleMenuList(list) {
        return list.map( item => {
            if(item.children) return <SubMenu key={item.key} title={item.title}>{this.handleMenuList(item.children)}</SubMenu>
            return <Menu.Item key={item.key}>
                     <NavLink to={item.key}>{item.title}</NavLink>
                   </Menu.Item>
        })
    }
    render() {
        return (
            <Fragment>
                <div className='logo'>
                    <img alt='' src='/assets/logo-ant.svg' />
                    <h1>bike-sharing</h1>
                </div>
                <Menu mode="vertical" theme='dark'>
                    { this.state.menuTreeNode }
                </Menu>
            </Fragment>
        )
    }
}