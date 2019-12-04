import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default class Main extends React.Component {
    render() {
        return (
            <Fragment>
                <ul>
                    <li>
                        <Link to='/about/10'>About</Link>
                    </li>
                    <li>
                        <Link to='/detail'>detail</Link>  
                    </li>
                    <li>
                        <Link to='/info'>info</Link>
                    </li>
                    <li>
                        <Link to='/wang'>no match</Link>
                    </li>
                </ul>
                { this.props.children }
            </Fragment>
        )
    }
}