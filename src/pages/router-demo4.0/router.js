import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import About from './about'
import Detail from './detail'
import Info from './info'
import Main from './main'
import WrapperedCom from './wrapperedCom'
import NoMatch from './noMatch'

export default class RouterEntry extends React.Component {
    render() {
        return (
            <Router>
                <Main>
                    <Switch>
                        <Route path='/about/:id' 
                            render={() => (<About><Route path='/about/aaa/:val' component={WrapperedCom}></Route></About>)}>
                        </Route>
                        <Route path='/detail' component={Detail}></Route>
                        <Route path='/info' component={Info}></Route>
                        <Route component={NoMatch}></Route>
                    </Switch>
                </Main>
            </Router>
        )
    }
}