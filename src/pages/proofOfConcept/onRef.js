import React, { Component } from 'react';

export default class OnRef extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'desc': ''
        }
    }
    handleClick() {
        this.setState({ desc: `父组件中调用子组件${Math.random()}`})
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    render() {
        return (
        <div>{this.state.desc}</div>
        )
    }
}